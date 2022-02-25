<template>
  <div>
    <div v-if="loginData.length == 0" >
      <v-btn text to="/login" data-test="login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
    </div>
    <div v-else>
      <v-btn text @click="logout">Logout</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Cookies from 'js-cookie'
import User from '@/modules/users'
import Owner from '@/modules/owners'
import Admin from '@/modules/admins'

export default defineComponent({
  name: 'HeaderNav',
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
      Cookies.remove('_myapp_token')
    }
  },
  computed: {
    loginData(): User[] | Owner[] | Admin[] {
      return this.$store.state.loginData
    }
  }
})
</script>
