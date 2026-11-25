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
      perpage: 2,
      offset: 0,
    }
  },

  computed: {
    flats() {
      return this.dataStore.flats
    },
    flats_total() {
      return this.dataStore.flats_total
    },
    loading() {
      return this.dataStore.loading
    },
  },

  methods: {
    async loadData() {
      await this.dataStore.get_flats(this.page, this.perpage)
      await this.dataStore.get_flats_total()
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
    <h1 class="text-2xl font-bold mb-4">Мои квартиры</h1>

    <DataTable
      :value="flats"
      :lazy="true"
      :loading="loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="flats_total"
      :first="offset"
      @page="onPageChange"
    >
      <Column field="id" header="ID" />
      <Column field="number" header="Номер квартиры" />
      <Column field="area" header="Площадь, м²" />
      <Column field="residents" header="Жильцов" />
      <Column field="house.name" header="Дом" />
    </DataTable>
  </div>
</template>