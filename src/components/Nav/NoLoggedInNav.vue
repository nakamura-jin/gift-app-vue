<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-list>
        <v-list-item link>
          <v-list-item-content v-if="loginData">
            <v-list-item-title class="text-center">
              メニュー
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
        dark
        color="primary"
      >

<!-------------------- お店 -------------------->

        <v-list-item to="/register">

        <v-list-item-icon class="mx-0">
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-title class="text-center">新規登録</v-list-item-title>

        </v-list-item>


        <v-list-item to="/login">

        <v-list-item-icon class="mx-0">
          <v-icon>mdi-login-variant</v-icon>
        </v-list-item-icon>

        <v-list-item-title class="text-center">ログイン</v-list-item-title>

        </v-list-item>


    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'AdminNav',
  data() {
    return {
      selectedItem: 0,
      settings: [
        { text: 'パスワード変更', icon: 'mdi-lock', link: '/change_password'},
        { text: 'メールアドレス変更', icon: 'mdi-email', link: '/change_email'},
      ]
    }
  },
  computed: {
    loginData() {
      return this.$store.state.loginData
    }
  },
})
</script>