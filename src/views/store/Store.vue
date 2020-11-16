<template>
  <page-header-wrapper>
    <a-card
      :bordered="false"
      title="All Stores">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col
          :xl="12"
          :lg="12"
          :md="12"
          :sm="24"
          :xs="24"
          v-for="store in stores"
          :key="store.id">
          <a-button type="primary" @click="openStore(store.id)">
            {{ store.code }} - {{ store.name }}
          </a-button>
          <div style="margin-top: 14px">
            <h4>Code: {{ store.code }}</h4>
            <h4>Name: {{ store.name }}</h4>
            <h4>Created Date: {{ formatDateTime(store['created-date']) }}</h4>
            <h4>Modifed Date: {{ formatDateTime(store['modified-date']) }}</h4>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const StoreRepository = RepositoryFactory.get('stores')
export default {
  data () {
    return {
      stores: []
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
    loadStore () {
      StoreRepository.get().then((res) => {
        const rs = res.results
        this.stores = rs
      })
    },
    openStore (store) {
      console.log(store)
      this.$router.push({ path: `/stores/${store}` })
    }
  },
  mounted () {
    this.loadStore()
  }
}
</script>

<style>
</style>
