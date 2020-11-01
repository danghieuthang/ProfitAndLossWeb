<template>
  <page-header-wrapper>
    <a-button type="primary" class="editable-add-btn" @click="addAccountingPeriod"> Add </a-button>
    <div class="center">
      <a-form layout="inline" justify="center" class="form-search">
        <a-form-item label="Start Date">
          <a-date-picker :format="dateFormat" @change="selectDateStart"/>
        </a-form-item>
        <a-form-item label="Close Date">
          <a-date-picker :format="dateFormat" @change="selectDateClose"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="loadData">
            Search
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <br />
    <br />
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
      <template slot="operation" slot-scope="text, record">
        <template>
          <a-button type="primary" @click="()=> onUpdate(record.id)">Update</a-button>
        </template>
        <template>
          <a-popconfirm v-if="dataSource.length" title="Sure to Delete?" @confirm="() => onDelete(record.id)">
            <a-button type="danger" class="btn-delete">Delete</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <template v-if="addNew">
      <create-form
        ref="createAccoungtingPeriod"
        :visible="true"
        @cancel="handleCancelCreate"
        @create="handleAddCreate"
      />
    </template>
    <template v-if="selectId != null">
      <update-form
        :selectId="selectId"
        ref="updateAccoungtingPeriod"
        :visible="true"
        @cancel="handleCancelUpdate"
        @update="handleAddUpdate"
      />
    </template>
  </page-header-wrapper>
</template>
<script>
import moment from 'moment'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import CreateForm from './modules/CreateForm'
import UpdateForm from './modules/UpdateForm'
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')

export default {
  components: {
      CreateForm, UpdateForm
  },
  data () {
    return {
      dateFormat: 'YYYY/MM/DD',
      dataSource: [
      ],
      columns: [
        {
          title: 'No',
          width: '5%',
          scopedSlots: { customRender: 'no' }
        },
        {
          title: 'Title',
          dataIndex: 'title'
        },
        {
          title: 'Description',
          dataIndex: 'description'
        },
        {
          title: 'Start Date',
          dataIndex: 'start-date'
        },
        {
          title: 'Close Date',
          dataIndex: 'close-date'
        },
        {
          title: 'Operation',
          width: '20%',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dates: {
          'start-date': null,
          'close-date': null
      },
      pagination: { pageSize: 10, current: 1, total: 0 },
      loading: false,
      addNew: false,
      selectId: null
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
    handleCancelCreate () {
      this.addNew = false
      const form = this.$refs.createAccoungtingPeriod.form
      form.resetFields()
    },
    handleAddCreate (result) {
        if (result.success) {
            this.$message.success('Add accounting period successfull!')
            this.loadData()
        } else {
            this.$message.error(result.message)
        }
    },
    handleCancelUpdate () {
    this.selectId = null
      const form = this.$refs.updateAccoungtingPeriod.form
      form.resetFields()
    },
    handleAddUpdate (result) {
        if (result.success) {
            this.$message.success('Update accounting period successfull!')
            this.loadData()
        } else {
            this.$message.error(result.message)
        }
    },
    addAccountingPeriod () {
      this.addNew = true
    },
    loadData () {
      this.loading = true
      const params = {
        'from-date': this.dates['start-date'],
        'to-date': this.dates['close-date'],
        'page': this.pagination.current,
        'page-size': this.pagination.pageSize
      }
      AccountingPeriodRepository.search(params).then((res) => {
        const rs = res.results
        rs.data.forEach(element => {
            element['start-date'] = new Date(element['start-date']).toDateString()
            element['close-date'] = new Date(element['close-date']).toDateString()
            })
        this.pagination.total = rs['total-count']
        this.loading = false
        this.dataSource = rs.data
      })
    },
     handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.loadData()
    },
    moment,
    selectDateStart (data, dateString) {
        this.dates['start-date'] = dateString
    },
    selectDateClose (data, dateString) {
        this.dates['close-date'] = dateString
    },
    onUpdate (id) {
        this.selectId = id
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
<style scoped>
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
.form-search {
    display: inline-block;
}
.btn-delete{
    margin-left: 10px;
}
</style>
