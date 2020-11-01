<template>
  <page-header-wrapper
  >
    <div>
      <a-descriptions title="Transaction">
        <a-descriptions-item label="Code">{{ transaction.code }}</a-descriptions-item>
        <a-descriptions-item label="Description">{{ transaction['note-message'] }}</a-descriptions-item>
        <a-descriptions-item label="Total balance">{{ transaction.balance }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <a-button type="primary" class="editable-add-btn" @click="handleAdd">
      Add Line
    </a-button>
    <a-table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :pagination="{total: data.length,
                    pageSize: data.length,
                    hideOnSinglePage: true}"
      size="default"
      bordered>
      <template
        v-for="col in ['accountingPeriod', 'category', 'description', 'balance']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-select
            style="margin: -5px 0"
            v-if="record.editable && col == 'category'"
            @change="(value) => handleChangeCategory(value, record.key)"
            class="select-categories"
            :default-value="data[record.key]['transaction-category-id']"
          >
            <a-select-option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </a-select-option>
          </a-select>
          <a-select
            style="margin: -5px 0"
            v-if="record.editable && col == 'accountingPeriod'"
            @change="(value) => handleChangeAccountingPeriod(value, record.key)"
            class="select-categories"
            :default-value="data[record.key]['accounting-period-id']"
          >
            <a-select-option v-for="accountingPeriod in accountingPeriods" :key="accountingPeriod.id" :value="accountingPeriod.id">
              {{ accountingPeriod.title }}
            </a-select-option>
          </a-select>
          <a-input
            v-if="record.editable && col === 'description'"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <a-input-number
            v-if="record.editable && col == 'balance'"
            style="margin: -5px 0"
            :value="text"
            :min="1"
            :max="transaction.balance"
            @change="(value) => handleChangeBalance(value, record.key)"
          />
          <template v-if="!record.editable">
            {{ text }}
          </template>
        </div>

      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
          </span>
          <span >
            <a class="text-delete" @click="() => onDelete(record.key)">
              <!-- <a-icon type="delete" style="color:red" /> -->
              Delete
            </a>
          </span>
        </div>
      </template>
    </a-table>
    <div class="center">
      <a-button type="primary" @click="submitSplit">
        Submit
      </a-button>
    </div>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const TransactionRepository = RepositoryFactory.get('transactions')
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')
const TransactionCategoryRepository = RepositoryFactory.get('transaction-categories')
const TransactionDetailRepository = RepositoryFactory.get('transaction-details')

const columns = [
   {
    title: 'Accounting Period',
    dataIndex: 'accountingPeriodName',
    width: '20%',
    scopedSlots: { customRender: 'accountingPeriod' }
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    width: '20%',
    scopedSlots: { customRender: 'category' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    width: '15%',
    scopedSlots: { customRender: 'balance' }
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const data = []

  data.push({
      key: 0,
      'transaction-category-id': '',
      categoryName: '',
      accountingPeriodName: '',
      'accounting-period-id': '',
      description: '',
      'transaction-id': '',
      balance: 0
  })

export default {
  data () {
    return {
      transaction: {},
      data,
      columns,
      count: 1,
      editingKey: '',
      categories: [],
      accountingPeriods: [],
      loading: true
    }
  },
  methods: {
    handleChangeBalance (value, key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.balance = value
        this.data = newData
      }
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleChangeCategory (value, key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['transaction-category-id'] = value
        target.categoryName = this.categories.filter(x => x.id === value)[0].name
        this.data = newData
      }
    },
    handleChangeAccountingPeriod (value, key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target['accounting-period-id'] = value
        target.accountingPeriodName = this.accountingPeriods.filter(x => x.id === value)[0].title
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
      }
      this.editingKey = ''
      if (this.getTotalBalance() > this.transaction.balance) {
        this.$message.error('Balance out of range!')
      }
    },
    onDelete (key) {
      const dataSource = [...this.data]
      this.data = dataSource.filter(item => item.key !== key)
    },
    getTotalBalance () {
      return this.data.reduce((a, b) => a + (b.balance || 0), 0)
    },
    getAvailableBalance () {
       const totalBalance = this.getTotalBalance()
       const rs = totalBalance === 'NaN' ? this.transaction.balance : this.transaction.balance - totalBalance
       return rs < 0 ? 0 : rs
    },
    handleAdd () {
      const { count, data } = this
      const balanceAvailable = this.getAvailableBalance()
      const newData = {
          key: count,
          'transaction-category-id': this.categories[0].id,
          'accounting-period-id': this.accountingPeriods[0].id,
          categoryName: this.categories[0].name,
          accountingPeriodName: this.accountingPeriods[0].title,
          description: '',
          'transaction-id': this.transaction.id,
          balance: balanceAvailable
      }
      this.data = [...data, newData]
      this.count = count + 1
    },
    loadData () {
      const id = this.$route.query.id
       TransactionRepository.searchById(id).then((res) => {
        const rs = res.results
        this.transaction = rs
        if (rs) {
          this.data[0]['transaction-id'] = rs.id
          this.data[0].balance = rs.balance
          TransactionCategoryRepository.getByTypeId(rs['transaction-type-id']).then((res) => {
            const rs = res.results
            this.categories = rs
            this.data[0]['transaction-category-id'] = rs[0].id
            this.data[0].categoryName = rs[0].name
         })
          AccountingPeriodRepository.getAll().then((res) => {
            const rs = res.results
            this.accountingPeriods = rs
            this.data[0]['accounting-period-id'] = rs[0].id
            this.data[0].accountingPeriodName = rs[0].title
        })
        this.loading = false
        } else {
            this.$message.error('Error in API')
        }
      })
    },
    submitSplit () {
       const totalBalance = this.data.reduce((a, b) => a + (b.balance || 0), 0)
       if (totalBalance !== this.transaction.balance) {
         this.$message.error('Total balance not equal!')
       } else {
         TransactionDetailRepository.create(this.data).then((res) => {
           var result = res
           if (result.success) {
             this.$message.success('Split transaction successfull')
           } else {
             this.$message.error('Split fail')
           }
         })
       }
    }
  },
  mounted () {
     this.loadData()
    // console.log(this.$route.query['id'])
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
</style>
