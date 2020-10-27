<template>
  <page-header-wrapper>
    <a-button type="primary" class="add-receipt" @click="onCreate()"> Add new receipt </a-button>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange">
      <td slot="no" slot-scope="text, record, index"><a href="" v-on="viewDetail(record)">{{ index + 1 }}</a></td>
      <td slot="status" slot-scope="text">{{ toNormalString(text) }}</td>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm v-if="record.status == 1" title="Do you want to approval?" @confirm="() => onApproval(record.id)">
          <a-button type="primary"> Approval </a-button>
        </a-popconfirm>
        <a-popconfirm
          v-if="record.status == 1"
          title="Do you want to reject?"
          @confirm="() => onDelete(record.id)"
          class="delete-action"
        >
          <a-button type="danger"> Reject </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <template v-if="visible">
      <create-receipt-form
        ref="createModal"
        visible="true"
        @cancel="handleCancel"
        @create="handleCreate"
      />
    </template>
    <template>
      <create-evidence-form
        ref="createEvidence"
        :visible="created_receipt"
        @cancel="handleCancelEvidence"
        @addEvidence="addEvidence"
      />
    </template>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import CreateReceiptForm from './modules/CreateForm'
import CreateEvidenceForm from './modules/CreateEvidenceForm'
const ReceiptRepository = RepositoryFactory.get('receipts')
const EvidenceRepository = RepositoryFactory.get('evidences')

const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    scopedSlots: { customRender: 'no' }
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Price',
    dataIndex: 'price'
  },
  {
    title: 'Type',
    dataIndex: 'type'
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier'
  },
  {
    title: 'Store',
    dataIndex: 'store'
  },
  {
    title: 'Modified Date',
    dataIndex: 'modified_date'
  },
  {
    title: 'Created Date',
    dataIndex: 'created_date'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: 'Action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: { CreateReceiptForm, CreateEvidenceForm },
  data () {
    return {
      data: [],
      columns,
      pagination: { pageSize: 10, current: 1, total: 0 },
      loading: false,
      created_receipt_id: null,
      created_receipt: false,
      visible: false
    }
  },
  methods: {
    toNormalString (status) {
      switch (status) {
        case 1:
          return 'Processing'
        case 2:
          return 'Approval'
        default:
          return 'NA'
      }
    },
    onApproval (receiptId) {
      console.log(receiptId)
    },
    onCreate () {
      this.visible = true
    },
    handleCreate (result) {
      console.log(result)
      if (result.success) {
        const form = this.$refs.createModal.form
        this.visible = false
        form.resetFields()
        this.$message.success('Created receipt successfully!')
        this.loadData()
        this.created_receipt = true
        this.created_receipt_id = result.results.id
      } else {
        this.$message.error('Create receipt fail!')
      }
    },
    handleCancel () {
      this.visible = false
      const form = this.$refs.createModal.form
      form.resetFields()
    },
    handleCancelEvidence () {
      this.created_receipt = false
      const form = this.$refs.createEvidence.form
      form.resetFields()
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loadData()
    },
    loadData () {
      this.loading = true
      const params = {
        'from-date': null,
        'to-date': null,
        page: this.pagination.current,
        'page-size': this.pagination.pageSize
      }
      ReceiptRepository.get(params).then((res) => {
        const rs = res.data.results
        this.pagination.total = rs.totalCount
        rs.data.forEach((element) => {
          element.created_date = new Date(element.created_date).toDateString()
          element.modified_date = new Date(element.modified_date).toDateString()
        })
        this.loading = false
        this.data = rs.data
      })
    },
    addEvidence (data) {
      const formData = new FormData()
      formData.append('image', data.image)
      formData.append('receipt_id', this.created_receipt_id)
      formData.append('name', data.name)
      formData.append('description', data.description)
      EvidenceRepository.addEvidence(formData).then((res) => {
          const rs = res.data
          if (rs.success) {
            this.add_evidence = false
            this.$message.success('Add evidence successfully')
            const form = this.$refs.createEvidence.form
            form.resetFields()
          } else {
            this.$message.error('Add evidence was fail!')
          }
      })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
<style scoped>
.delete-action {
  margin-left: 10px;
}
.add-receipt {
  margin-bottom: 10px;
}
/* .ant-table-pagination.ant-pagination{
  visibility: hidden;
} */
</style>
