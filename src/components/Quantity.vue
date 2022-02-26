<template>
  <v-col>
    <span>数量: </span>
    <v-btn icon @click="subtract" :disabled="counter <= 1">
      <v-icon>mdi-arrow-left-drop-circle</v-icon>
    </v-btn>
    <span class="px-8">{{ counter }}</span>
    <v-btn icon @click="add">
      <v-icon>mdi-arrow-right-drop-circle</v-icon>
    </v-btn>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Quantity',
  data() {
    return {
      counter: 1 as number
    }
  },
  methods: {
    setQuantity() {
      this.$store.commit('SET_QUANTITY', this.counter)
    },
    add() {
      this.counter += 1
      this.$store.commit('SET_QUANTITY', this.counter)
    },
    subtract() {
      this.counter -= 1
      this.$store.commit('SET_QUANTITY', this.counter)
    }
  },
  created() {
    this.setQuantity()
  }

})
</script>
