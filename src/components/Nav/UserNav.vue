<template>
  <v-card
    class="mx-auto"
    width="256"
    tile
  >
      <v-list>
        <v-list-item link>
          <v-list-item-content v-if="loginData">
            <v-list-item-title class="text-h6">
              {{loginData.name}} 様
            </v-list-item-title>
            <v-list-item-subtitle>{{loginData.email}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action v-if="loginData">
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
        dark
        color="primary"
      >

        <v-list-item to="/">

        <v-list-item-icon>
          <v-icon>mdi-web</v-icon>
        </v-list-item-icon>

        <v-list-item-title>サイト</v-list-item-title>

        </v-list-item>

    <v-list-group
        :value="true"
        prepend-icon="mdi-cog"
        color="white"
      >
        <template v-slot:activator>
          <v-list-item-title>設定</v-list-item-title>
        </template>

        <v-list-item
          v-for="(setting, i) in settings"
          :key="i"
          link
          :to="setting.link"
        >

        <v-list-item-icon class="mx-4">
          <v-icon v-text="setting.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-title v-text="setting.text"></v-list-item-title>

        </v-list-item>
    </v-list-group>

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
        // { text: 'メールアドレス変更', icon: 'mdi-email', link: '/change_email'},
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