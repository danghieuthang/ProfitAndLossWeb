<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="Accounting Period">
                <a-select v-model="search['accounting-period-id']">
                  <a-select-option v-for="acc in accountingPeriods" :key="acc.id" :value="acc.id">
                    {{ acc.title }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="Category">
                <a-select v-model="search['transaction-category-id']">
                  <a-select-option :value="null">
                    All
                  </a-select-option>
                  <a-select-option v-for="cate in categories" :key="cate.id" :value="cate.id">
                    {{ cate.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="Code">
                  <a-input v-model="search.code" placeholder="Code"></a-input>
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
        <span slot="accounting-period" slot-scope="text">{{ text.title }}</span>
        <span slot="transactionCategory" slot-scope="text">{{ text.name }}</span>
        <template slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <a-descriptions title="">
            <a-descriptions-item label="Created Date">{{ record['created-date'] }}</a-descriptions-item>
            <a-descriptions-item label="Modifed Date">{{ record['modified-date'] }}</a-descriptions-item>
          </a-descriptions>
        </template>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')
const TransactionCategoryRepository = RepositoryFactory.get('transaction-categories')
const TransactionDetailRepository = RepositoryFactory.get('transaction-details')

const columns = [
     {
    title: '#',
    width: '5%',
    scopedSlots: { customRender: 'no' }
  },
    {
    title: 'Code',
    dataIndex: 'code'
  },
   {
    title: 'Store',
    dataIndex: 'store',
    width: '15%',
    scopedSlots: { customRender: 'store' }
  },
   {
    title: 'Accounting Period',
    dataIndex: 'accounting-period',
    width: '15%',
    scopedSlots: { customRender: 'accounting-period' }
  },
  {
    title: 'Category',
    dataIndex: 'transaction-category',
    width: '15%',
    scopedSlots: { customRender: 'transactionCategory' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%'
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    width: '15%'
  }
]
export default {
  data () {
    return {
      advanced: false,
      dateFormat: 'YYYY/MM/DD',
      categories: [],
      accountingPeriods: [],
      search: {
        'from-date': null,
        'to-date': null,
        'accounting-period-id': null,
        'transaction-category-id': null,
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
      TransactionDetailRepository.search(this.search).then((res) => {
        const rs = res.results
        rs.data.forEach((element) => {
          element['created-date'] = this.formatDateTime(element['created-date'])
          element['modified-date'] = this.formatDateTime(element['modified-date'])
          element.description = element.description === null ? 'N/A' : element.description
        })
        this.pagination.total = rs['total-count']
        this.loading = false
        rs.data.forEach((element) => (element.supplier = element.supplier != null ? element.supplier : { name: 'N/A' }))
        this.dataSource = rs.data
      })
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loadData()
    },
    loadTransactionCategory () {
      TransactionCategoryRepository.get().then((res) => {
        const rs = res.results
        this.categories = rs
      })
    },
    loadAccountingPeriod () {
      AccountingPeriodRepository.getAll().then((res) => {
        const rs = res.results
        const currentAccountingPeriod = rs.filter(x => new Date(x['start-date'].split('T')[0]) <= new Date() && new Date(x['close-date'].split('T')[0]) >= new Date())
        this.search['accounting-period-id'] = currentAccountingPeriod[0].id
        this.accountingPeriods = rs
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
      this.search['transaction-category-id'] = null
      this.search['accounting-period-id'] = null
      this.search['store-id'] = null
      this.search.code = null
    }
  },
  mounted () {
    this.loadData()
    this.loadTransactionCategory()
    this.loadAccountingPeriod()
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
