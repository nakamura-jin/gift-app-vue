<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-center my-4">商品一覧</h2>
        <v-col class="text-right">
          <v-btn color="primary" @click="$router.push('/owner/menu/create')">create menu</v-btn>
        </v-col>
        <ProductTable :menus="ownerMenus" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ProductTable from '@/components/Owner/ProductTable.vue'
import { MenuResponse } from '@/modules/menus'

export default defineComponent({
  name: 'OwnerMenu',
  components: { ProductTable },
  computed: {
    ownerMenus(): MenuResponse {
      return this.$store.state.ownerMenus
    },
    id() {
      return this.$store.state.loginData.id
    }
  },
  methods: {
    getMyMenus() {
      this.$store.dispatch('ownerMenus', { owner_id: this.$route.params.id })
    }
  },
  created() {
    this.getMyMenus()
  },
})
</script>
