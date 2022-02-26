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



<!------- リスト ------->
    <v-list
      nav
      dense
    >

    <v-list-item
      v-for="(item, i) in lists"
      :key="i"
      :to="item.link"
    >

    <v-list-item-icon class="mx-4">
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-title v-text="item.text"></v-list-item-title>

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
      lists: [
        { text: 'ホーム', icon: 'mdi-web', link: '/admin' },
        { text: 'リスト', icon: 'mdi-clipboard-list-outline', link: '/admin/all_lists'},
        { text: 'コンタクト', icon: 'mdi-email', link: '/contact' },
        { text: 'お知らせ', icon: 'mdi-folder-account', link: '/create/news'},
        { text: 'オーナー追加', icon: 'mdi-account', link: '/admin/owner/register'},
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