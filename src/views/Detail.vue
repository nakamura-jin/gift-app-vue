<template>
  <v-container>
    <v-row>
      <v-col>
        <!----- スマホ ----->
        <v-sheet v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
          <v-img :src="menuDetail.image" height="280" />
          <div class="d-flex">
            <v-col>
              <v-col class="d-flex">
                <span class="d-block text-h6 mb-4">{{ menuDetail.name }}</span>
                <v-spacer></v-spacer>
                <span class="d-block text-h6 mb-4">¥ {{ menuDetail.price }}</span>
              </v-col>
              <p>{{ menuDetail.description }}</p>
              <v-col class="text-center">
                <Quantity />
              </v-col>
              <div class="text-center">
                <stripe-checkout
                  ref="checkoutRef"
                  :pk="publishableKey"
                  :session-id="sessionId"
                />
                <v-btn @click="checkout" color="primary">Checkout!</v-btn>
              </div>
              <!-- <v-btn class="px-12">ギフトを贈る</v-btn> -->
            </v-col>
          </div>
        </v-sheet>


        <!----- PC ----->
        <v-sheet v-else class="center">
          <div class="d-flex">
            <v-img :src="menuDetail.image" height="300" max-width="50%" />
            <v-col class="px-8">
              <span class="d-block text-h6 mb-4">{{ menuDetail.name }}</span>
              <span class="d-block text-h6 mb-4">¥ {{ menuDetail.price }}</span>
              <p>{{ menuDetail.description }}</p>
              <v-col>
                <Quantity />
              </v-col>
              <div>
                <stripe-checkout
                  ref="checkoutRef"
                  :pk="publishableKey"
                  :session-id="sessionId"
                />
                <v-btn @click="checkout" color="primary">Checkout!</v-btn>
              </div>
              <!-- <v-btn class="px-12">ギフトを贈る</v-btn> -->
            </v-col>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Quantity from '@/components/Quantity.vue'
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { PaymentCheckOut } from '@/apis/checkout_apis'
// import { Purchase } from '@/apis/checkout_apis'
import Menu from '@/modules/menus'
import User from '@/modules/users'


export default defineComponent({
  name: 'Detail',
  components: { StripeCheckout, Quantity },
  data(){
    return {
      id: this.$route.query.menu_id,
      loading: false,
      sessionId: '', // session id from backend
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      error: '' as string | unknown
    }
  },
  methods: {
    getMenuDetail() {
      this.$store.dispatch('menuDetail', {id: this.id})
    },
    async checkout () {
      try {
        this.$store.dispatch('setPurchase', { user_id: this.loginData.id, menu_id: this.id, quantity: this.quantity })
         //send to stripe
        const response = await PaymentCheckOut({
          user_id: this.loginData.id,
          menu_id: this.id as string,
          quantity: this.quantity
        })
        this.sessionId = response;
        (this.$refs.checkoutRef as HTMLFormElement).redirectToCheckout();
      } catch (err) {
        this.error = err
      }

    },
  },
  created() {
    this.getMenuDetail()
  },
  computed: {
    menuDetail(): Menu {
      return this.$store.state.menuDetail
    },
    quantity(): number {
      return this.$store.state.quantity
    },
    loginData(): User {
      return this.$store.state.loginData
    }
  }
})
</script>
