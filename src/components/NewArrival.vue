<template>
  <div v-show="select" class="mr-4">
    <v-chip small color="error">New</v-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  name: 'NewArrival',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    select() {
      let fromDate = moment(this.news.created_at);
      let toDate   = moment();
      let borderDate =  toDate.diff(fromDate, 'days');
      if(borderDate < 3) {
        return true
      }
      return false
    }
  }
})
</script>
