<template>
  <page-header-wrapper>
    <a-card
      :bordered="false"
      title="Profit and loss"
      class="antd-pro-pages-dashboard-analysis-salesCard"
      :style="{ height: '100%' }"
    >
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Store">
                  <a-select v-model="search['store-id']" @change="loadRevenueExpense">
                    <a-select-option :value="null"> All </a-select-option>
                    <a-select-option v-for="store in stores" :key="store.id" :value="store.id">
                      {{ store.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Accounting Period">
                  <a-select v-model="search['accounting-period-id']" @change="loadRevenueExpense">
                    <a-select-option
                      v-for="accountingPeriod in accountingPeriods"
                      :key="accountingPeriod.id"
                      :value="accountingPeriod.id"
                    >
                      {{ accountingPeriod.title }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" style="margin-top: 24px" title="Profit and loss statement">
      <a-button type="primary" @click="onExport" style="float: right;">Export</a-button>
      <a-card :bordered="false" style="margin-top: 35px">
        <a-row :gutter="24" type="flex" style="border: solid 2px">
          <a-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="12"
            :xs="12"
            style="border-right: solid 2px"><h1>Description</h1></a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6"
            style="border-right: solid 2px"><h1>Percent</h1></a-col>
          <a-col :xl="6" :lg="6" :md="6" :sm="6" :xs="6"><h1>Balance</h1></a-col>
        </a-row>
      </a-card>
      <a-card :bordered="false" style="margin-top: 24px">
        <a-row :gutter="24" type="flex">
          <a-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="12"
            :xs="12">
            <h1>1. Total Incomes: </h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>100%</h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ sumIncomes }} VND</h1>
          </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" style="margin-left: 30px" v-for="income in incomes" :key="income.name">
          <template>
            <a-col
              :xl="12"
              :lg="12"
              :md="12"
              :sm="12"
              :xs="12"
            ><h3>{{ income.name }}</h3></a-col>
            <a-col
              :xl="6"
              :lg="6"
              :md="6"
              :sm="6"
              :xs="6"
            ><h3>{{ getPercent(income.balance) }} %</h3></a-col>
            <a-col
              :xl="6"
              :lg="6"
              :md="6"
              :sm="6"
              :xs="6"
            ><h3>{{ income.balance }} VND</h3></a-col>
          </template>
        </a-row>
        <a-row :gutter="24" type="flex">
          <a-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="12"
            :xs="12">
            <h1>2. Cost of goods sold: </h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ getPercent(costOfGoodsSold) }} %</h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ costOfGoodsSold }} VND</h1>
          </a-col>
        </a-row>
        <a-row :gutter="24" type="flex">
          <a-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="12"
            :xs="12">
            <h1>2. Gross Profit: </h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ getPercent(grossProfit) }} %</h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ grossProfit }} VND</h1>
          </a-col>
        </a-row>
        <a-row :gutter="24" type="flex">
          <a-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="12"
            :xs="12">
            <h1>3. Total expenses: </h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ getPercent(sumExpenses) }} %</h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ sumExpenses }} VND</h1>
          </a-col>
        </a-row>
        <a-row :gutter="24" type="flex" style="margin-left: 30px" v-for="expense in expenses" :key="expense.name">
          <template>
            <a-col
              :xl="12"
              :lg="12"
              :md="12"
              :sm="12"
              :xs="12"
            ><h3>{{ expense.name }}</h3></a-col>
            <a-col
              :xl="6"
              :lg="6"
              :md="6"
              :sm="6"
              :xs="6"
            ><h3>{{ getPercent(expense.balance) }} %</h3></a-col>
            <a-col
              :xl="6"
              :lg="6"
              :md="6"
              :sm="6"
              :xs="6"
            ><h3>{{ expense.balance }} VND</h3></a-col>
          </template>
        </a-row>
        <a-row :gutter="24" type="flex">
          <a-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="12"
            :xs="12">
            <h1>4. Net Profit: </h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ getPercent(grossProfit-sumExpenses) }} %</h1>
          </a-col>
          <a-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="6"
            :xs="6">
            <h1>{{ grossProfit-sumExpenses }} VND</h1>
          </a-col>
        </a-row>
      </a-card>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')
const StoreRepository = RepositoryFactory.get('stores')
const DashboardRepository = RepositoryFactory.get('dashboards')
const FileDownload = require('js-file-download')
export default {
  data () {
    return {
      stores: [],
      accountingPeriods: [],
      search: { 'store-id': null, 'accounting-period-id': null },
      incomes: [],
      expenses: [],
      grossProfit: 0,
      costOfGoodsSold: 0,
      sumIncomes: 0,
      sumExpenses: 0
    }
  },
  methods: {
    loadData () {
      AccountingPeriodRepository.getAll().then((res) => {
        const rs = res.results
        this.accountingPeriods = rs
        const currentA = rs.filter(x => new Date(x['start-date'].split('T')[0]) <= new Date() && new Date(x['close-date'].split('T')[0]) >= new Date())
        this.search['accounting-period-id'] = currentA[0].id
      })
      StoreRepository.get().then((res) => {
        const rs = res.results
        this.stores = rs
      })
    },
    loadRevenueExpense () {
        DashboardRepository.getProfitAndLoss(this.search).then((res) => {
        const rs = res.results
        this.sumIncomes = 0
        this.sumExpenses = 0
        for (var i = 0; i < rs.incomes.length; i++) {
            this.sumIncomes += rs.incomes[i].balance
        }
        for (var j = 0; j < rs.expenses.length; j++) {
            this.sumExpenses += rs.expenses[j].balance
        }
        // this.sumIncomes = rs.incomes.reduce((a, b) => a.balance + b.balance, 0)
        // this.sumExpenses = rs.expenses.reduce((a, b) => a.balance + b.balance, 0)
        this.incomes = rs.incomes
        this.expenses = rs.expenses
        this.grossProfit = rs['gross-profit']
        this.costOfGoodsSold = rs['cost-of-goods-sold']
      })
    },
    getPercent (value) {
        return Math.round(value * 10000 / this.sumIncomes) / 100
    },
    onExport () {
         DashboardRepository.export(this.search).then((res) => {
            FileDownload(res.data, 'P&L.xlsx')
        })
    }
  },
  mounted () {
    this.loadData()
    this.loadRevenueExpense()
  }
}
</script>

<style>
</style>
