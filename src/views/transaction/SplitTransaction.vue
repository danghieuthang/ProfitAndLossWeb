<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div>
        <a-descriptions title="Transaction">
          <a-descriptions-item label="Code">{{ transaction.code }}</a-descriptions-item>
          <a-descriptions-item label="Total balance">{{ transaction['total-balance'] }}</a-descriptions-item>
          <a-descriptions-item label="Sub balance">{{ transaction['sub-total'] }}</a-descriptions-item>
          <a-descriptions-item label="Description">{{ transaction['note-message'] }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <a-button type="primary" class="editable-add-btn" @click="handleAdd"> Add Line </a-button>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="data"
        :pagination="{ total: data.length, pageSize: data.length, hideOnSinglePage: true }"
        size="default"
        bordered
      >
        <template
          v-for="col in ['store', 'accountingPeriod', 'category', 'description', 'balance']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-select
              style="margin: -5px 0"
              v-if="record.editable && col == 'store'"
              @change="(value) => handleChangeStore(value, record.key)"
              class="select-categories"
              :default-value="data[record.key]['store-id']"
            >
              <a-select-option v-for="store in stores" :key="store.id" :value="store.id">
                {{ store.code }}
              </a-select-option>
            </a-select>
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
              <a-select-option
                v-for="accountingPeriod in accountingPeriods"
                :key="accountingPeriod.id"
                :value="accountingPeriod.id"
              >
                {{ accountingPeriod.title }}
              </a-select-option>
            </a-select>
            <a-input
              v-if="record.editable && col === 'description'"
              style="margin: -5px 0"
              :value="text"
              @change="(e) => handleChange(e.target.value, record.key, col)"
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
            <span>
              <a class="text-delete" @click="() => onDelete(record.key)">
                <!-- <a-icon type="delete" style="color:red" /> -->
                Delete
              </a>
            </span>
          </div>
        </template>
      </a-table>
      <template v-if="showUpdateTable">
        <a-table
          style="margin-top: 20px"
          :loading="loading"
          :columns="columns"
          :data-source="dataUpdate"
          :pagination="{ total: dataUpdate.length, pageSize: dataUpdate.length, hideOnSinglePage: true }"
          size="default"
          bordered
        >
          <template v-for="col in ['store', 'accountingPeriod', , 'description']" :slot="col" slot-scope="text, record">
            <div :key="col">
              <a-select
                style="margin: -5px 0"
                v-if="record.editable && col == 'store'"
                @change="(value) => handleChangeStoreUpdate(value, record.key)"
                class="select-categories"
                :default-value="data[record.key]['store-id']"
              >
                <a-select-option v-for="store in stores" :key="store.id" :value="store.id">
                  {{ store.code }}
                </a-select-option>
              </a-select>
              <a-select
                style="margin: -5px 0"
                v-if="record.editable && col == 'accountingPeriod'"
                @change="(value) => handleChangeAccountingPeriodUpdate(value, record.key)"
                class="select-categories"
                :default-value="dataUpdate[record.key]['accounting-period-id']"
              >
                <a-select-option
                  v-for="accountingPeriod in accountingPeriods"
                  :key="accountingPeriod.id"
                  :value="accountingPeriod.id"
                >
                  {{ accountingPeriod.title }}
                </a-select-option>
              </a-select>
              <a-input
                v-if="record.editable && col === 'description'"
                style="margin: -5px 0"
                :value="text"
                @change="(e) => handleChangeUpdate(e.target.value, record.key, col)"
              />

              <template v-if="!record.editable">
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => saveUpdate(record.key)">Save</a>
              </span>
              <span v-else>
                <a :disabled="editingKey !== ''" @click="() => editUpdate(record.key)">Edit</a>
              </span>
            </div>
          </template>
        </a-table>
      </template>

      <div class="center">
        <a-button type="primary" @click="submitSplit"> Submit </a-button>
        <a-divider type="vertical" />
        <a-popconfirm title="Sure to cancel?" @confirm="() => this.$router.back()">
          <a-button type="primary">Cancel</a-button>
        </a-popconfirm>
      </div>

    </a-card>
  </page-header-wrapper>
</template>
<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const TransactionRepository = RepositoryFactory.get('transactions')
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')
const TransactionCategoryRepository = RepositoryFactory.get('transaction-categories')
const TransactionDetailRepository = RepositoryFactory.get('transaction-details')
const StoreRepository = RepositoryFactory.get('stores')
const columns = [
  {
    title: 'Store',
    dataIndex: 'storeName',
    width: '15%',
    scopedSlots: { customRender: 'store' }
  },
  {
    title: 'Accounting Period',
    dataIndex: 'accountingPeriodName',
    width: '15%',
    scopedSlots: { customRender: 'accountingPeriod' }
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    width: '15%',
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
  'store-id': '',
  storeName: '',
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
      showUpdateTable: false,
      data,
      dataUpdate: [],
      columns,
      count: 1,
      editingKey: '',
      editingKeyUpdate: '',
      categories: [],
      accountingPeriods: [],
      stores: [],
      loading: true
    }
  },
  props: {},
  methods: {
    handleChangeBalance (value, key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target.balance = value
        this.data = newData
      }
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleChangeUpdate (value, key, column) {
      const newData = [...this.dataUpdate]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataUpdate = newData
      }
    },
    handleChangeStore (value, key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['store-id'] = value
        target.storeName = this.stores.filter((x) => x.id === value)[0].name
        this.data = newData
      }
    },
    handleChangeStoreUpdate (value, key) {
      const newData = [...this.dataUpdate]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['store-id'] = value
        target.storeName = this.stores.filter((x) => x.id === value)[0].name
        this.dataUpdate = newData
      }
    },
    handleChangeCategory (value, key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['transaction-category-id'] = value
        target.categoryName = this.categories.filter((x) => x.id === value)[0].name
        this.data = newData
      }
    },
    handleChangeAccountingPeriod (value, key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['accounting-period-id'] = value
        target.accountingPeriodName = this.accountingPeriods.filter((x) => x.id === value)[0].title
        this.data = newData
      }
    },
    handleChangeAccountingPeriodUpdate (value, key) {
      const newData = [...this.dataUpdate]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target['accounting-period-id'] = value
        target.accountingPeriodName = this.accountingPeriods.filter((x) => x.id === value)[0].title
        this.dataUpdate = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    editUpdate (key) {
      const newData = [...this.dataUpdate]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKeyUpdate = key
      if (target) {
        target.editable = true
        this.dataUpdate = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
      }
      this.editingKey = ''
      if (this.getTotalBalance() > this.transaction['sub-total']) {
        this.$message.error('Balance out of range!')
      }
    },
    saveUpdate (key) {
      const newData = [...this.dataUpdate]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        delete target.editable
        this.dataUpdate = newData
      }
      this.editingKeyUpdate = ''
    },
    onDelete (key) {
      const dataSource = [...this.data]
      this.data = dataSource.filter((item) => item.key !== key)
    },
    getTotalBalance () {
      return this.data.reduce((a, b) => a + (b.balance || 0), 0)
    },
    getAvailableBalance () {
      const totalBalance = this.getTotalBalance()
      const rs = totalBalance === 'NaN' ? this.transaction['sub-total'] : this.transaction['sub-total'] - totalBalance
      return rs < 0 ? 0 : rs
    },
    handleAdd () {
      const { count, data } = this
      const balanceAvailable = this.getAvailableBalance()
      const newData = {
        key: count,
        'store-id': this.transaction.store.id,
        storeName: this.transaction.store.code,
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
      const id = this.$route.params.id
      TransactionRepository.searchById(id).then((res) => {
        const rs = res.results
        this.transaction = rs
        console.log(this.transaction['transaction-type'].code === 'SAL')
        this.showUpdateTable = this.transaction['transaction-type'].code === 'SAL'
        if (rs) {
          this.data[0]['transaction-id'] = rs.id
          this.data[0].balance = rs['sub-total']
          TransactionCategoryRepository.getByTypeId(rs['transaction-type'].id).then((res) => {
            const rs = res.results
            this.categories = rs
            this.data[0]['transaction-category-id'] = rs[0].id
            this.data[0].categoryName = rs[0].name
          })
          AccountingPeriodRepository.getStillOpen().then((res) => {
            const rs = res.results
            this.accountingPeriods = rs
            this.data[0]['accounting-period-id'] = rs[0].id
            this.data[0].accountingPeriodName = rs[0].title
          })
          StoreRepository.get().then((res) => {
            const rs = res.results
            this.stores = rs
            this.data[0]['store-id'] = this.transaction.store.id
            this.data[0].storeName = this.transaction.store.code
          })
          if (this.transaction['transaction-type'].code === 'SAL') {
            TransactionRepository.getTransactionDetailByTransactionId(rs.id).then((res) => {
              res.results.forEach((element, index) => {
                this.dataUpdate.push({
                  id: element.id,
                  key: index,
                  'store-id': element.store.id,
                  storeName: element.store.code,
                  'transaction-category-id': element['transaction-category'].id,
                  'accounting-period-id': element['accounting-period'].id,
                  categoryName: element['transaction-category'].name,
                  accountingPeriodName: element['accounting-period'].title,
                  description: element.description,
                  'transaction-id': this.transaction.id,
                  balance: element.balance
                })
              })
              this.categories = this.categories.filter(x => x.code !== 'SAL-DIS')
            })
          }

          this.loading = false
        } else {
          this.$message.error('Error in API')
        }
      })
    },
    submitSplit () {
      const totalBalance = this.data.reduce((a, b) => a + (b.balance || 0), 0)
      if (totalBalance !== this.transaction['sub-total']) {
        this.$message.error('Total balance not equal!')
      } else {
        TransactionDetailRepository.create(this.data).then((res) => {
          var result = res
          if (result.success) {
            TransactionDetailRepository.update(this.dataUpdate).then((res) => {
              if (res.success) {
                this.$message.success('Split transaction successfull')
                this.$router.push({
                  path: `${this.$route.path.split('/split')[0]}`
                })
              }
            })
          } else {
            this.$message.error(result.message)
          }
        })
      }
    },

    resetData () {
      this.transaction = {}
      this.data = []
      this.dataUpdate = []
      this.editingKeyUpdate = ''
      this.editingKey = ''
      this.loading = true
      this.showUpdateTable = false
    }
  },
  mounted () {
    this.loadData()
    // console.log(this.$route.query['id'])
  }
  // watch: {
  //   $route: {
  //     handler: 'resetData',
  //     immediate: true
  //   }
  // }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.select-categories {
  width: 100%;
}
.editable-add-btn {
  margin-bottom: 10px;
}
.center {
  text-align: center;
  margin: auto;
  padding: 10px;
}
</style>
