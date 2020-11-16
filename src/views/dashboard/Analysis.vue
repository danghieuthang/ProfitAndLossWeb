<template>
  <div>
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="Revenues and expense" :style="{ height: '100%' }">
        <div class="salesCard">
          <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
            <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
              <div class="table-page-search-wrapper">
                <a-form layout="inline">
                  <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-item label="Store">
                      <a-select v-model="searchRevenueExpense['store-id']" @change="loadRevenueExpense">
                        <a-select-option :value="null">
                          All
                        </a-select-option>
                        <a-select-option v-for="store in stores" :key="store.id" :value="store.id">
                          {{ store.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-item label="Accounting Period">
                      <a-select v-model="searchRevenueExpense['accounting-period-id']" @change="loadRevenueExpense">
                        <a-select-option v-for="accountingPeriod in accountingPeriods" :key="accountingPeriod.id" :value="accountingPeriod.id">
                          {{ accountingPeriod.title }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-form>
              </div>
            </a-col>
            <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
              <ve-histogram :data="dataSource" :settings="chartSetting"></ve-histogram>
            </a-col>
          </a-row>
        </div>
      </a-card>
      <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
        <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <div class="table-page-search-wrapper">
              <a-form layout="inline">
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                  <a-form-item label="Store">
                    <a-select v-model="search['store-id']" @change="loadPie">
                      <a-select-option :value="null">
                        All
                      </a-select-option>
                      <a-select-option v-for="store in stores" :key="store.id" :value="store.id">
                        {{ store.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                  <a-form-item label="Accounting Period">
                    <a-select v-model="search['accounting-period-id']" @change="loadPie">
                      <a-select-option v-for="accountingPeriod in accountingPeriods" :key="accountingPeriod.id" :value="accountingPeriod.id">
                        {{ accountingPeriod.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                  <a-button type="primary">Details</a-button>
                </a-col>
              </a-form>
            </div>
          </a-col>
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="Revenues" :style="{ height: '100%' }">
              <div>
                <ve-pie :data="revenuesDataSource" :settings="pieSetting"></ve-pie>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="Expenses" :style="{ height: '100%' }">
              <div>
                <ve-pie :data="expenseDataSource" :settings="pieSetting"></ve-pie>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import VePie from 'v-charts/lib/pie.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const DashboardRepository = RepositoryFactory.get('dashboards')
const AccountingPeriodRepository = RepositoryFactory.get('accounting-periods')
const StoreRepository = RepositoryFactory.get('stores')

export default {
  name: 'Analysis',
  components: {
    VePie,
    VeHistogram
  },
  data () {
    return {
      chartSetting: {
        metrics: ['revenue', 'expense'],
        dimension: ['date'],
        yAxisType: ['VND']
      },
      pieSetting: {
        dataType: function (v) {
          return v + ' VND'
        }
      },
      loading: true,
      accountingPeriods: [],
      stores: [],
      search: { 'store-id': null, 'accounting-period-id': null },
      searchRevenueExpense: { 'store-id': null, 'accounting-period-id': null },
      revenuesDataSource: { columns: ['name', 'balance'], rows: [] },
      expenseDataSource: { columns: ['name', 'balance'], rows: [] },
       dataSource: {
        columns: ['date', 'revenue', 'expense'],
        rows: []
      }
    }
  },
  methods: {
    loadData () {
      AccountingPeriodRepository.getAll().then((res) => {
            const rs = res.results
            this.accountingPeriods = rs
            this.searchRevenueExpense['accounting-period-id'] = rs[0].id
            this.search['accounting-period-id'] = rs[0].id
        })
      StoreRepository.get().then((res) => {
            const rs = res.results
            this.stores = rs
          })
    },
    loadRevenueExpense () {
          DashboardRepository.getRevenueExpense(this.searchRevenueExpense).then((res) => {
          this.dataSource.rows = res.results
      })
    },
    loadPie () {
      DashboardRepository.getExpensePie(this.search).then((res) => {
          this.expenseDataSource.rows = res.results
      })
      DashboardRepository.getRevenuesPie(this.search).then((res) => {
          this.revenuesDataSource.rows = res.results
      })
    }
  },
  mounted () {
    this.loadRevenueExpense()
    this.loadPie()
    this.loadData()
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
