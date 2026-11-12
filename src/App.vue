<script>
import { useAuthStore } from '@/stores/authStore'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'

export default {
  components: { Button, Menubar, InputText },

  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
          route: '/',
        },
        {
          label: 'Квартиры',
          icon: 'pi pi-building',
          route: '/flats',
        },
        {
          label: 'Платежи',
          icon: 'pi pi-wallet',
          route: '/payments',
        },
      ],
    }
  },

  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    authError() {
      return this.authStore.errorMessage
    },
  },

  methods: {
    logout() {
      this.authStore.logout()
    },
    async login() {
      await this.authStore.login({
        email: this.email,
        password: this.password,
      })
    },
  },

  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  },
}
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <span class="font-bold ml-2">Rentcalc</span>
    </template>

    <template #item="{ item }">
      <router-link v-if="item.route" :to="item.route" class="flex items-center p-2 text-color no-underline">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </router-link>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-user mr-2" /> {{ user.name }}
          <Button label="Выйти" @click="logout" class="ml-3" />
        </div>

        <form v-else @submit.prevent="login" class="flex items-center gap-2">
          <InputText v-model="email" type="email" placeholder="Логин" required />
          <InputText v-model="password" type="password" placeholder="Пароль" required />
          <Button type="submit" label="Войти" />
        </form>
      </div>
    </template>
  </Menubar>

  <div v-if="authError" class="p-2">
    <small class="text-red-500">{{ authError }}</small>
  </div>

  <router-view></router-view>
</template>