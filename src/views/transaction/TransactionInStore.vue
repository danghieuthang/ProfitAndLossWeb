<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="Code">
                <a-input v-model="search.code" placeholder="Code"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="Type">
                <a-select v-model="search['transaction-type-id']">
                  <a-select-option v-for="type in types" :key="type.id" :value="type.id">
                    {{ type.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="Status">
                  <a-select v-model="search.status">
                    <a-select-option v-for="st in transactionStatus" :key="st.id" :value="st.id">
                      {{ st.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="From">
                  <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    :format="dateFormat"
                    @change="selectDateStart"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="To">
                  <a-date-picker
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    :format="dateFormat"
                    @change="selectEndStart"
                  />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="(!advanced && 8) || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
              >
                <a-button type="primary" @click="loadData"> Search </a-button>
                <a-button
                  style="margin-left: 8px"
                  @click="resetFilter"
                >Clear</a-button
                >
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? 'Basic' : 'Advantage' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-button class="editable-add-btn" icon="plus" @click="addNewTransaction"> Add </a-button>
      <a-table
        bordered
        :data-source="dataSource"
        :columns="columns"
        :row-key="(record) => record.id"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        showPagination="auto"
      >
        <span slot="no" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="store" slot-scope="text">{{ text.name }}</span>
        <span slot="member" slot-scope="text">{{ text.name }}</span>
        <span slot="type" slot-scope="text">{{ text.name }}</span>
        <!-- <span slot="supplier" slot-scope="text, record">{{ record.supplier.name }}</span> -->
        <span slot="status" slot-scope="text">
          {{ getStatus(text) }}
        </span>
        <template slot="operation" slot-scope="text, record">
          <template v-if="text.status == 1">
            <a-popconfirm v-if="dataSource.length" title="Sure to Approval?" @confirm="() => onApproval(record.id)">
              <a-button type="primary">Approval</a-button>
            </a-popconfirm>
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to Reject?"
              @confirm="() => onReject(record.id)"
              class="reject-action"
            >
              <a-button type="danger">Reject</a-button>
            </a-popconfirm>
          </template>

          <template v-if="text.status == 2">
            <a-button
              type="primary"
              @click="onSplit(record.store.brand.code, record.store.code, record.id)"
            >Split</a-button
            >
          </template>
          <template v-if="text.status == 3">
            {{ getStatus(text.status) }}
          </template>
        </template>
        <template slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <a-descriptions title="">
            <a-descriptions-item label="Store">{{ record.store.code }} - {{ record.store.name }}</a-descriptions-item>
            <a-descriptions-item label="Supplier" v-if="record.supplier">{{ record.supplier.name }}</a-descriptions-item>
            <a-descriptions-item label="Created Date">{{ record['created-date'] }}</a-descriptions-item>
            <a-descriptions-item label="Modifed Date">{{ record['modified-date'] }}</a-descriptions-item>
            <a-descriptions-item label="Note-message">{{ record['note-message'] }}</a-descriptions-item>
          </a-descriptions>
          <a @click="viewDetail(record.store.brand.code, record.store.id, record.id)">Detail</a>
        </template>
      </a-table>
      <template v-if="addTransaction">
        <create-transaction
          ref="createtransaction"
          :visible="true"
          @cancel="handleCancel"
          @addTransaction="addedTransaction"
        />
      </template>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import CreateTransaction from './modules/CreateTransaction'
const TransactionTypeRepository = RepositoryFactory.get('transaction-types')
const TransactionRepository = RepositoryFactory.get('transactions')

const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
  props: {
    text: String
  },
  data () {
    return {
      value: this.text,
      editable: false
    }
  },
  methods: {
    handleChange (e) {
      const value = e.target.value
      this.value = value
    },
    check () {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit () {
      this.editable = true
    },
    toNormalString (status) {
      switch (status) {
        case 1:
          return 'Processing'
        case 2:
          return 'Approval'
        default:
          return 'NA'
      }
    }
  }
}

const columns = [
  {
    title: '#',
    width: '5%',
    scopedSlots: { customRender: 'no' }
  },
  {
    title: 'Code',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: 'Store',
    dataIndex: 'store',
    scopedSlots: { customRender: 'store' }
  },
  {
    title: 'Type',
    dataIndex: 'receipt-type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: 'Total-Balance',
    dataIndex: 'total-balance'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: 'Operation',
    width: '20%',
    scopedSlots: { customRender: 'operation' }
  }
]
const transactionStatus = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Processing' },
  { id: 2, name: 'Approval' },
  { id: 3, name: 'Reject' },
  { id: 5, name: 'Splited' }
]
export default {
  components: {
    EditableCell,
    CreateTransaction
  },
  data () {
    return {
      advanced: false,
      dateFormat: 'YYYY/MM/DD',
      addTransaction: false,
      types: [],
      transactionStatus,
      search: {
        'from-date': null,
        'to-date': null,
        'transaction-type-id': null,
        'store-id': null,
        status: 0,
        page: 1,
        code: '',
        'page-size': 10,
        'sort-by': 'desc'
      },
      dataSource: [],
      columns: columns,
      pagination: { pageSize: 10, current: 1, total: 0 },
      loading: false,
      startValue: null,
      endValue: null
    }
  },
  methods: {
    onCellChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find((item) => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter((item) => item.key !== key)
    },
    formatDateTime (date) {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = today.getFullYear()
      return mm + '/' + dd + '/' + yyyy
    },
    loadData () {
      this.search['store-id'] = this.$route.params.store
      this.loading = true
      this.search.page = this.pagination.current
      this.search['page-size'] = this.pagination.pageSize
      TransactionRepository.search(this.search).then((res) => {
        const rs = res.results
        rs.data.forEach((element) => {
          element['created-date'] = this.formatDateTime(element['created-date'])
          element['modified-date'] = this.formatDateTime(element['modified-date'])
        })
        this.pagination.total = rs['total-count']
        this.loading = false
        rs.data.forEach((element) => (element.supplier = element.supplier != null ? element.supplier : { name: 'N/A' }))
        this.dataSource = rs.data
      })
    },
    onApproval (id) {
      const formData = new FormData()
      formData.append('id', id)
      TransactionRepository.approval(formData).then((res) => {
        const rs = res
        if (rs.success) {
          this.$message.success(`Approval transaction - ${rs.results.code} successfully`)
          this.loadData()
        } else {
          this.$message.error(`Approval transaction - ${rs.results.code} fail!`)
        }
      })
    },
    onReject (id) {
      const formData = new FormData()
      formData.append('id', id)
      TransactionRepository.reject(formData).then((res) => {
        const rs = res
        if (rs.success) {
          this.$message.success(`Approval transaction - ${rs.results.code} successfully`)
          this.loadData()
        } else {
          this.$message.error(`Approval transaction - ${rs.results.code} fail!`)
        }
      })
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loadData()
    },
    onSplit (brandCode, storeCode, id) {
      this.$router.push({ path: `${this.$route.path}/${id}/split` })
    },
    viewDetail (brandCode, storeCode, id) {
      console.log(`${this.$route.path}/${id}`)
      this.$router.push({ path: `${this.$route.path}/${id}` })
    },
    addNewTransaction () {
      this.addTransaction = true
    },
    handleCancel () {
      this.addTransaction = false
    },
    addedTransaction (transaction) {
      this.addTransaction = false
      this.$message.success(`Create transaction ${transaction.code} successfull`)
      this.loadData()
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return 'Processing'
        case 2:
          return 'Approval'
        case 3:
          return 'Rejected'
        case 5:
          return 'Splited'
      }
    },
    loadTransactionType () {
      TransactionTypeRepository.get().then((res) => {
        const rs = res.results
        this.types = rs
      })
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    selectDateStart (data, dateString) {
      this.search['from-date'] = dateString
    },
    selectDateClose (data, dateString) {
      this.search['to-date'] = dateString
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetFilter () {
      this.search['from-date'] = null
      this.search['to-date'] = null
      this.search['transaction-type-id'] = null
      this.search['store-id'] = null
      this.search.code = null
      this.search.status = 0
    }
  },
  mounted () {
    this.loadData()
    this.loadTransactionType()
  }
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
.reject-action {
  margin-left: 10px;
}
.center {
  text-align: center;
}
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
.ant-advanced-search-form {
  margin: 10px;
  padding: 20px;
}
</style>
