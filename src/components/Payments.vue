<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useDataStore } from '@/stores/dataStore'

export default {
  components: { DataTable, Column },

  data() {
    return {
      dataStore: useDataStore(),
      page: 0,
      perpage: 5,
      offset: 0,
    }
  },

  computed: {
    payments() {
      return this.dataStore.payments
    },
    payments_total() {
      return this.dataStore.payments_total
    },
    loading() {
      return this.dataStore.loading
    },
  },

  methods: {
    async loadData() {
      await this.dataStore.get_payments(this.page, this.perpage)
      await this.dataStore.get_payments_total()
    },

    onPageChange(event) {
      this.page = event.page
      this.perpage = event.rows
      this.offset = event.first
      this.loadData()
    },
  },

  mounted() {
    this.loadData()
  },
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">История платежей</h1>

    <DataTable
      :value="payments"
      :lazy="true"
      :loading="loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[5, 10, 20]"
      :totalRecords="payments_total"
      :first="offset"
      @page="onPageChange"
    >
      <Column field="id" header="ID" />
      <Column field="flat.number" header="Квартира" />
      <Column field="period.name" header="Период" />
      <Column field="sum" header="Сумма, руб." />
      <Column field="created_at" header="Дата создания" />
    </DataTable>
  </div>
</template>