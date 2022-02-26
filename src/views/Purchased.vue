<template>
  <v-container>
    <v-row>
      <v-col class="mt-8 mx-auto" md="8" v-if="!checkout">
        <h2 class="text-center my-8">決済が完了しました</h2>
        <v-sheet>
          <v-card class="d-flex">
            <v-col md="4">
              <v-img :src="purchaseGift.menu_image"></v-img>
            </v-col>
            <v-col>
              <v-card-title class="pa-0 text-subtitle-2 font-weight-bold">{{ purchaseGift.owner_name }}</v-card-title>
              <v-card-title class="px-0">{{ purchaseGift.menu_name }}</v-card-title>
              <v-col class="pa-0">
                <v-card-text class="pa-0">¥ {{ purchaseGift.menu_price }} (税込)</v-card-text>
              </v-col>
            </v-col>
          </v-card>
        </v-sheet>
        <v-sheet class="mt-4" outlined>
          <v-col class="d-flex justify-space-between">
            <span>合計枚数:</span>
            <span class="mr-4">{{ purchaseGift.quantity }}</span>
          </v-col>
          <v-col class="d-flex justify-space-between">
            <span>決済合計:</span>
            <span class="mr-4">¥ {{ totalPrice | filterPrice }}</span>
          </v-col>
        </v-sheet>
        <v-col class="text-center">
          <router-link to="/">トップページへ</router-link>
        </v-col>
      </v-col>
      <v-col v-else class="mt-8 mx-auto" md="8">
        <h2 class="text-center">アクセスできませんでした</h2>
        <p class="text-center mt-12">受信メールより内容をご確認ください。</p>
        <v-col class="text-center">
          <router-link to="/">トップページへ</router-link>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Cookies from 'js-cookie'
import { GiftResponse } from '@/modules/gifts'

export default defineComponent({
  name: 'Purchased',
  data() {
    return {
      checkout: false as boolean,
    }
  },
  filters: {
    filterPrice(price: number) {
      return price.toLocaleString()
    }
  },
  methods: {
    async createPurchase() {
      const purchase_id = Cookies.get('purchase')
      if(purchase_id) {
        this.$store.dispatch('createPurchasedGift')
      } else {
        this.checkout = true
      }
    }
  },
  created() {
    this.createPurchase()
  },
  computed: {
    purchaseGift(): GiftResponse {
      return this.$store.state.purchaseGift
    },

    totalPrice():number {
      const quantity = this.purchaseGift.quantity as number
      const price = this.purchaseGift.menu_price as number
      return quantity * price
    }
  }
})
</script>


<style scoped>
  .circle-wrap {
    width: 100vw;
    height: 100vh;
  }
  .circle {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
</style>