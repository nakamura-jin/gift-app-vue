<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <!--  -->
      <!-- <AdminNav v-if="loginData.type_id == 1" />
      <OwnerNav v-if="loginData.type_id == 2" />
      <UserNav v-if="loginData.type_id == 3" />
      <NoLoggedInNav v-else /> -->
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <HeaderNav v-if="!$vuetify.breakpoint.mobile" />
    </v-app-bar>


    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Cookies from 'js-cookie'
import HeaderNav from '@/components/Nav/HeaderNav.vue'
import AdminNav from '@/components/Navbar/AdminNav.vue'
import OwnerNav from '@/components/Navbar/OwnerNav.vue'
import UserNav from '@/components/Navbar/UserNav.vue'
import NoLoggedInNav from '@/components/Navbar/NoLoggedInNav.vue'



export default defineComponent({
  name: 'App',
  // components: { HeaderNav, AdminNav, OwnerNav, UserNav, NoLoggedInNav },
  components: { HeaderNav },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    getLoginData() {
      if(Cookies.get('_myapp_token')) {
        this.$store.dispatch('getData')
      }
    },
  },
  created() {
    this.getLoginData()
    // this.refreshToken()
  },
  computed: {
    loginData: function () {
      return this.$store.state.loginData
    },

    gift() {
      return this.$store.state.gift
    }
  }
})
</script>
