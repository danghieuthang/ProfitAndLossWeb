<template>
  <page-header-wrapper>
    <a-button class="editable-add-btn" @click="addTransaction"> Add </a-button>
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :row-key="(record) => record.id"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <td slot="no" slot-scope="text, record, index">{{ index + 1 }}</td>
      <td slot="store" slot-scope="text">{{ text.name }}</td>
      <td slot="member" slot-scope="text">{{ text.name }}</td>
      <td slot="type" slot-scope="text">{{ text.name }}</td>
      <td slot="supplier" slot-scope="text">{{ text.name }}</td>
      <td slot="status" slot-scope="text">{{ toNormalString(text) }}</td>
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
          <a-button type="primary" @click="onSplit(record.id)">Split</a-button>
        </template>
      </template>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">Note message: {{ record['note-message'] }}</p>
    </a-table>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
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
export default {
  components: {
    EditableCell
  },
  data () {
    return {
      dataSource: [
        // {
        //   id: '1',
        //   name: 'name 1',
        //   member: { id: 'M1', name: 'Member admin' },
        //   'transaction-type': { id: 'M1', name: 'Expense' },
        //   code: 'Code 1',
        //   balance: '120',
        //   'note-message': 'Messsage 1',
        //   store: { id: 'M1', name: 'Store 1' },
        //   supplier: { id: 'M1', name: 'Store 1' },
        //   status: '1'
        // },
        // {
        //   id: '2',
        //   name: 'name 1',
        //   member: { id: 'M1', name: 'Member admin' },
        //   'transaction-type': { id: 'M1', name: 'Expense' },
        //   code: 'Code 1',
        //   balance: '120',
        //   'note-message': 'Messsage 1',
        //   store: { id: 'M1', name: 'Store 1' },
        //   supplier: { id: 'M1', name: 'Store 1' },
        //   status: '2'
        // },
        // {
        //   id: '3',
        //   name: 'name 1',
        //   member: { id: 'M1', name: 'Member admin' },
        //   'transaction-type': { id: 'M1', name: 'Expense' },
        //   code: 'Code 1',
        //   balance: '120',
        //   'note-message': 'Messsage 1',
        //   store: { id: 'M1', name: 'Store 1' },
        //   supplier: { id: 'M1', name: 'Store 1' },
        //   status: '1'
        // }
      ],
      columns: [
        {
          title: 'No',
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
          dataIndex: 'transaction-type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: 'Balance',
          dataIndex: 'balance'
        },
        {
          title: 'Supplier',
          dataIndex: 'supplier',
          scopedSlots: { customRender: 'supplier' }
        },
        {
          title: 'Operation',
          width: '20%',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      pagination: { pageSize: 10, current: 1, total: 0 },
      loading: false
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
    handleAdd () {
      const { count, dataSource } = this
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
    loadData () {
      this.loading = true
      const params = {
        // 'from-date': null,
        // 'to-date': null,
        'page': this.pagination.current,
        'page-size': this.pagination.pageSize,
        'sort-by': 'asc'
      }
      TransactionRepository.search(params).then((res) => {
        const rs = res.data.results
        this.pagination.total = rs['total-count']
        this.loading = false
        this.dataSource = rs.data
      })
    },
    onApproval (id) {
      const formData = new FormData()
      formData.append('id', id)
      TransactionRepository.approval(formData).then((res) => {
        const rs = res.data
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
        const rs = res.data
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
    onSplit (id) {
      this.$router.push({ path: '/transaction/split', query: { id: id } })
    }
  },
  mounted () {
    this.loadData()
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
</style>
