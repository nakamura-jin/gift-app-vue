<template>
  <div>
    <v-text-field
      v-model="quantity"
      @input="inputValue()"
      hide-details
      solo
      flat
      class="px-auto centered-input"
      >
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ProductRecievedQuantity',
  props: {
    code: {
      type: Number
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    inputValue() {
      this.$store.commit('UPDATE_RECIEVED_QUANTITY', {code: this.code, recievedQuantity: this.quantity })
    }
  }

})
</script>


<style>
  .centered-input input {
    text-align: center
  }
</style>