<template>
  <div>
    <v-text-field
      @input="inputValue($event)"
      flat
      outlined
      solo
      dense
      hide-details
      class="my-2"
      ref="text"
    >
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MenuResponse } from '@/modules/menus'

export default defineComponent({
  name: 'ProductCode',
  props: {
    number: {
      type: Number
    }
  },
  mounted() {
    this.refs().text.focus()
  },
  methods: {
    inputValue(value: number) {
      this.$emit('input', value)
    },
    clear() {
      this.refs().text.reset()
    },
    refs(): any {
      return this.$refs
    }
  },
  created() {
    this.refs()
  }
})
</script>
