<template>
  <v-container>
    <v-row>
      <v-col v-if="!updated">
        <h2 class="text-center my-8">在庫管理</h2>
        <v-col class="d-flex justify-end my-8">
          <span class="py-4 mr-4">インストアコード: </span>
          <ProductCode @input="input" class="mr-4" ref="input" />
          <span class="py-4 mr-12 font-weight-bold">商品名: {{ setMenuName }}</span>
          <v-btn @click="stockMenu" small class="ml-12 mt-3" color="primary">set</v-btn>
        </v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center" width="20%">
                  インストアコード
                </th>
                <th class="text-center">
                  商品名
                </th>
                <th class="text-center" width="20%">
                  在庫数
                </th>
                <th class="text-center" width="10%">
                  入庫数
                </th>
                <th class="text-center" width="10%">
                  取り消し
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(item, i) in productName" :key="i" >
                <td>{{ item.product_code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.stockQuantity }}</td>
                <td>
                  <ProductRecievedQuantity :code="item.product_code" />
                </td>
                <td>
                  <v-btn icon color="error" @click="setMenuDelete(item)"><v-icon>mdi-delete</v-icon></v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-col class="text-right mt-8">
          <v-btn @click="recieved" color="primary" :loading="dialog">update</v-btn>
        </v-col>
      </v-col>

      <v-col v-else class="center">
        <h2 class="text-center">在庫登録完了しました</h2>
        <v-col class="text-center mt-10">
          <v-btn class="mx-auto" @click="close" color="primary">閉じる</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ProductCode from '@/components/Owner/ProductCode.vue'
import ProductRecievedQuantity from '@/components/Owner/ProductRecievedQuantity.vue'
import Stock from '@/modules/stocks'


export default defineComponent({
  name: 'OwnerProductsStock',
  components: { ProductCode, ProductRecievedQuantity },
  data() {
    return {
      setCode: '',
      setMenuName: '',
      setMenu: [],
      updated: false,
      dialog: false
    }
  },
  methods: {
    setItems(){
      if(this.$store.state.ownerMenus.length == 0) {
        this.$store.dispatch('ownerMenus', { owner_id: this.$route.params.id })
      }
    },
    input(value: string) {
      this.$store.state.ownerMenus.forEach((item: any) => {
        if(value == item.product_code) {
          this.setMenuName = item.name
          this.setMenu = item
        }
      })
    },
    stockMenu() {
      this.$store.commit('SET_STOCK', this.setMenu)
      this.refs().input.clear()
    },
    refs(): any {
      return this.$refs
    },
    setMenuDelete(data: any) {
      this.$store.commit('DELETE_SET_STOCK', data)
    },
    recieved() {
      this.dialog = true
      setTimeout(() => {
        this.$store.dispatch('updateQuantity')
        this.dialog = false
        this.updated = true
      }, 3000)
    },
    close() {
      this.updated = false
      this.$store.dispatch('ownerMenus', { owner_id: this.$route.params.id })
    }
  },
  created() {
    this.setItems()
    this.refs()
  },
  computed: {
    ownerMenus() {
      return this.$store.state.ownerMenus
    },
    productName(): Stock {
      return this.$store.state.stock
    }
  }
})
</script>

<style>
  .centered-input input {
    text-align: center
  }

</style>
