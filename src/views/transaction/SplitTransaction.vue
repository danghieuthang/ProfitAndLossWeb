<template>
  <page-header-wrapper>
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
      :columns="columns"
      :data-source="data"
      :pagination="{total: data.length,
                    pageSize: data.length,
                    hideOnSinglePage: true}"
      size="default"
      bordered>
      <template
        v-for="col in ['category', 'description', 'balance']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-select
            style="margin: -5px 0"
            v-if="record.editable && col == 'category'"
            @change="(value) => handleChangeCategory(value, record.key)"
            class="select-categories"
            :default-value="categories[0].id"
          >
            <a-select-option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-if="record.editable && col !== 'category'"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
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
            <a @click="() => onDelete(record.key)">
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
const TransactionCategoryRepository = RepositoryFactory.get('transaction-categories')

const columns = [
  {
    title: 'Category',
    dataIndex: 'categoryName',
    width: '25%',
    scopedSlots: { customRender: 'category' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '45%',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    width: '15%',
    scopedSlots: { customRender: 'balance' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const data = []

  data.push({
      key: 0,
      category: '',
      categoryName: '',
      description: '',
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
      categories: []
    }
  },
  methods: {
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
        target.category = value
        target.categoryName = this.categories.filter(x => x.id === value)[0].name
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
    },
    onDelete (key) {
      const dataSource = [...this.data]
      this.data = dataSource.filter(item => item.key !== key)
    },
    handleAdd () {
      const { count, data } = this
      const totalBalance = this.data.reduce((a, b) => a + (b.balance || 0), 0)
      const balanceAvailable = this.transaction.balance - totalBalance
      console.log(this.data[0].balance)
      const newData = {
          key: count,
          'category-id': this.categories[0].id,
          categoryName: this.categories[0].name,
          description: '',
          balance: balanceAvailable
      }
      this.data = [...data, newData]
      this.count = count + 1
    },
    loadData () {
      const id = this.$route.query.id
       TransactionRepository.searchById(id).then((res) => {
        const rs = res.data.results
        this.transaction = rs
          TransactionCategoryRepository.getByTypeId(rs['transaction-type-id']).then((res) => {
          const rs = res.data.results
          this.categories = rs
          this.data[0].category = rs[0].id
          this.data[0].categoryName = rs[0].name
        })
      })
    },
    submitSplit () {
       const totalBalance = this.data.reduce((a, b) => a + (b.balance || 0), 0)
       if (totalBalance !== this.transaction.balance) {
         this.$message.error('Total balance not equal!')
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
.center{
  text-align: center;
  margin: auto;
  padding: 10px;
}
</style>
