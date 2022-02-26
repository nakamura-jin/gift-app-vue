<template>
  <v-container>
    <v-row class="mt-10">
      <v-col>
        <v-col class="d-flex">
          <v-tabs flat class="mb-1 mr-4" right>
            <v-tab @click="currentComponent = 'UserListsTable'">ユーザー</v-tab>
            <v-tab @click="currentComponent = 'OwnerListsTable'">オーナー</v-tab>
          </v-tabs>
          <v-col md="4" class="d-flex ml-auto ma-0">
            <v-text-field
              append-icon="mdi-magnify"
              placeholder="search..."
              hide-details
              v-model="search"
              class="ma-0 pa-0"
            >
            </v-text-field>
          </v-col>
        </v-col>
        <component :is="currentComponent" :selectData="search"></component>
        <v-col >
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UserListsTable, { UserListsMethods } from '@/components/Admin/UserListsTable.vue'
import OwnerListsTable, { OwnerListsMethods } from '@/components/Admin/OwnerListsTable.vue'


export default defineComponent({
  name: 'AllUserLists',
  components: {
    UserListsTable,
    OwnerListsTable
  },
  data() {
    return {
      currentComponent: UserListsTable as UserListsMethods | OwnerListsMethods | unknown,
      search: '',
    }
  }
})
</script>
