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
        color="primary"
        dark
      >

<!-------------------- トップページ -------------------->
        <v-list-item
          :to="`/owner/${ this.$store.state.loginData.id }`"
        >

        <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
        </v-list-item-icon>

        <v-list-item-title>トップページ</v-list-item-title>

        </v-list-item>



<!-------------------- レジ -------------------->
        <v-list-item
          :to="`/owner/${ this.$store.state.loginData.id }`"
        >

        <v-list-item-icon>
            <v-icon>mdi-cash-register</v-icon>
        </v-list-item-icon>

        <v-list-item-title>レジ</v-list-item-title>

        </v-list-item>


<!-------------------- 商品 -------------------->
    <v-list-group
        :value="true"
        prepend-icon="mdi-card-account-details"
        color="white"

      >
        <template v-slot:activator>
          <v-list-item-title>商品</v-list-item-title>
        </template>

        <v-list-item
          v-for="(product, i) in products"
          :key="i"
          link
          :to="product.link"
        >

        <v-list-item-icon  class="mx-4">
          <v-icon v-text="product.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-title v-text="product.text" class="ml-10"></v-list-item-title>

        </v-list-item>
    </v-list-group>

<!-------------------- ユーザー -------------------->
    <!-- <v-list-group
      :value="true"
      prepend-icon="mdi-account-circle"
    >
      <template v-slot:activator>
        <v-list-item-title>ユーザー</v-list-item-title>
      </template>

      <v-list-item
        v-for="(user, i) in users"
        :key="i"
        link
        :to="user.link"
      >

      <v-list-item-title v-text="user.text" class="text-center"></v-list-item-title>

      <v-list-item-icon>
        <v-icon v-text="user.icon"></v-icon>
      </v-list-item-icon>


      </v-list-item>

    </v-list-group> -->

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
      products: [
        // { text: '商品一覧', icon: 'mdi-clipboard-list-outline', link: `/owner/${this.$route.params.id}/menu` },
        { text: '商品一覧', icon: 'mdi-clipboard-list-outline', link: `/owner/${this.$store.state.loginData.id}/menu` },
        { text: '在庫管理', icon: 'mdi-clipboard-list-outline', link: `/owner/${this.$store.state.loginData.id}/products_stock` },
      ],
    }
  },
  computed: {
    loginData() {
      return this.$store.state.loginData
    }
  }
})
</script>