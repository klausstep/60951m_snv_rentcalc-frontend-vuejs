import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    errorMessage: '',
  }),

  actions: {
    async login(credentials) {
      this.errorMessage = ''
      try {
        const response = await axios.post(`${API_URL}/login`, credentials)
        this.token = response.data.token
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem('token', response.data.token)
        return true
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Ошибка авторизации'
        } else if (error.request) {
          this.errorMessage = 'Сервер не отвечает. Проверьте подключение.'
        } else {
          this.errorMessage = 'Ошибка запроса'
        }
        console.error(error)
        return false
      }
    },

    async getUser() {
      this.errorMessage = ''
      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        this.errorMessage = 'Не удалось получить данные пользователя'
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})