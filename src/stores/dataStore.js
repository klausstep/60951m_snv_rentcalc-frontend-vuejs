import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000/api'

export const useDataStore = defineStore('data', {
  state: () => ({
    flats: [],
    flats_total: 0,
    payments: [],
    payments_total: 0,
    loading: false,
  }),

  actions: {
    async get_flats(page = 0, perpage = 5) {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/flats`, {
          params: { page, perpage },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.flats = response.data
      } catch (error) {
        console.error('Ошибка загрузки квартир:', error)
      } finally {
        this.loading = false
      }
    },

    async get_flats_total() {
      try {
        const response = await axios.get(`${API_URL}/flats_total`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.flats_total = response.data.total
      } catch (error) {
        console.error('Ошибка получения количества квартир:', error)
      }
    },

    async get_payments(page = 0, perpage = 5) {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/payments`, {
          params: { page, perpage },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.payments = response.data
      } catch (error) {
        console.error('Ошибка загрузки платежей:', error)
      } finally {
        this.loading = false
      }
    },

    async get_payments_total() {
      try {
        const response = await axios.get(`${API_URL}/payments_total`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.payments_total = response.data.total
      } catch (error) {
        console.error('Ошибка получения количества платежей:', error)
      }
    },
  },
})