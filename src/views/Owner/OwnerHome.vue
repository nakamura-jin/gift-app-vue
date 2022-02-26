<template>
  <v-container>
    <v-row>
      <v-col>
        <v-col>
          <h1 class="text-center">{{ loginData.name }}</h1>
        </v-col>
          <v-col v-for="menu in ownerMenus" :key="menu.id" md="2" class="d-inline-flex">
            <MenuCard :menu="menu" />
          </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MenuCard from '@/components/MenuCard.vue'
import { MenuResponse } from '@/modules/menus'
// import { getOwnerMenus } from '@/apis/menu_apis'


export default defineComponent({
  name: 'OwnerHome',
  data() {
    return {
      id: this.$route.params.id
    }
  },
  components: { MenuCard },
  computed: {
    loginData() {
      return this.$store.state.loginData
    },
    ownerMenus(): MenuResponse {
      return this.$store.state.ownerMenus
    }
  },
  methods: {
    setOwnerMenus() {
      this.$store.dispatch('ownerMenus', { owner_id: this.id })
    },
  },
  created() {
    this.setOwnerMenus()
  }
})
</script>
