/* eslint-disable vue/valid-v-for */
<template>
  <page-header-wrapper
  >
    <a-card :bordered="false" title="Receipt Info">
      <a-descriptions title="">
        <a-descriptions-item label="Code">{{ transaction.code }}</a-descriptions-item>
        <a-descriptions-item label="Total balance">{{ transaction['total-balance'] }}</a-descriptions-item>
        <a-descriptions-item label="Sub total">{{ transaction['sub-total'] }}</a-descriptions-item>
        <a-descriptions-item label="Store">{{ transaction.store.code }} - {{ transaction.store.name }}</a-descriptions-item>
        <a-descriptions-item label="Receipt Type">{{ transaction['receipt-type'].code }} - {{ transaction['receipt-type'].name }}</a-descriptions-item>
        <a-descriptions-item label="Supplier" v-if="transaction.supplier">{{ transaction.supplier.name }}</a-descriptions-item>
        <a-descriptions-item label="Created Date">{{ transaction['created-date'] }}</a-descriptions-item>
        <a-descriptions-item label="Open Date">{{ transaction['open-date'] }}</a-descriptions-item>
        <a-descriptions-item label="Close Date">{{ transaction['close-date'] }}</a-descriptions-item>
        <a-descriptions-item label="Create by ">{{ transaction.member['first-name'] }}</a-descriptions-item>
        <a-descriptions-item label="Description">{{ transaction['note-message'] }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card
      :bordered="false"
      style="margin-top: 24px"
      title="Transactions"
      v-if="transactionDetails.length!=0">
      <a-table
        bordered
        :data-source="transactionDetails"
        :row-key="(record) => record.id"
        :columns="columns"
        :pagination="{total: transactionDetails.length,
                      pageSize: transactionDetails.length,
                      hideOnSinglePage: true}"
        size="default">
        <span slot="store" slot-scope="text">{{ text.code }} - {{ text.name }}</span>
        <span slot="accounting-period" slot-scope="text">{{ text.title }}</span>
        <span slot="transactionCategory" slot-scope="text">{{ text.code }} - {{ text.name }}</span>
      </a-table>
    </a-card>
    <a-card
      :bordered="false"
      style="margin-top: 24px"
      title="Evidence Details">
      <a-descriptions title="">
        <!-- <a-descriptions-item label="Description">{{ receipt.description }}</a-descriptions-item> -->
      </a-descriptions>
      <a-row :gutter="48">
        <a-col :md="8" :sm="24" v-for="item in evidences" :key="item.id">
          <img :src="item['img-url']" :alt="item.name" class="zoom">
        </a-col>
      </a-row>
    </a-card>
    <div class="center">
      <template v-if="transaction.status == 1">
        <a-button
          type="primary"
          @click="onApproval(transaction.id)">
          Approval
        </a-button>
        <a-divider type="vertical" />
        <a-button
          type="primary"
          @click="onReject(transaction.id)">
          Reject
        </a-button>
        <a-divider type="vertical" />
      </template>
      <template v-if="transaction.status == 2">
        <a-button
          type="primary"
          @click="onSplit">
          Split
        </a-button>
        <a-divider type="vertical" />
      </template>
      <a-button type="primary" @click="close">
        Close
      </a-button>
    </div>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const TransactionRepository = RepositoryFactory.get('transactions')
const columns = [
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
      transaction: {},
      transactionDetails: [],
      evidences: [],
      columns
    }
  },
  props: {
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
      const id = this.$route.params.id
      TransactionRepository.searchById(id).then((res) => {
        const rs = res.results
        rs['created-date'] = this.formatDateTime(rs['created-date'])
        rs['modified-date'] = this.formatDateTime(rs['modified-date'])
        rs['open-date'] = this.formatDateTime(rs['open-date'])
        rs['close-date'] = this.formatDateTime(rs['close-date'])
        this.transaction = rs
      })
      TransactionRepository.getEvidenceByTransactionId(id).then((res) => {
          this.evidences = res.results
        })
       TransactionRepository.getTransactionDetailByTransactionId(id).then((res) => {
            const rs = res.results
            this.transactionDetails = rs
            if (rs) {
            } else {
                this.$message.error('Error in API')
            }
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
    onSplit () {
      this.$router.push({ path: `${this.$route.path}/split` })
    },
    close () {
      var path = this.$route.path.split('/receipts')[0]
      console.log(path)
      this.$router.push({ path: path })
    }
  },
  mounted () {
     this.loadData()
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.select-categories{
  width: 100%;
}
.editable-add-btn{
  margin-bottom: 10px;
}
.center{
  text-align: center;
  margin: auto;
  padding: 10px;
}
.zoom {
  padding: 50px;
  transition: transform .2s;
  max-width: 90%;
  max-height: 600px;
  margin: 0 auto;
}

.zoom:hover {
  -ms-transform: scale(2.0); /* IE 9 */
  -webkit-transform: scale(2.0); /* Safari 3-8 */
  transform: scale(2.0);
}
</style>
