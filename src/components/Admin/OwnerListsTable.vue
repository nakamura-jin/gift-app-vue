<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" width="6%">
            <span class="text-md-subtitle-1">id</span>
          </th>
          <th class="text-center">
            名前
          </th>
          <th class="text-center" v-show="$vuetify.breakpoint.mobile ? false : true">
            メールアドレス
          </th>
          <th class="text-center">
            麺集
          </th>
          <th class="text-center">
            削除
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in allOwners"
          :key="user.id"
          class="text-center"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td v-show="$vuetify.breakpoint.mobile ? false : true">{{ user.email }}</td>
          <td><v-btn text icon color="success"><v-icon>mdi-pencil</v-icon></v-btn></td>
          <td><v-btn text icon color="error"><v-icon>mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ListsResponse } from '@/apis/admin_lists'

export interface OwnerListsMethods {
  getAllOwner: void;
  getEmail: void
}

export default defineComponent({
  name: 'OwnerListsTable',
  props: {
    selectData: {
      type: String,
      required: true
    }
  },
  computed: {
    allOwners(): Array<ListsResponse> {
      let owner = []
      for(let i = 0; i < this.$store.state.allOwner.length; i++) {
        let select = this.$store.state.allOwner[i]
        if(select.email.indexOf(this.selectData) !== -1 || select.name.indexOf(this.selectData) !== -1) {
          owner.push(select)
        }
      }

      return owner
    }
  },
  methods: {
    getAllOwner() {
      this.$store.dispatch('getAllOwner')
    },
    getEmail(email: string) {
      console.log(email)
    }
  },
  created() {
    this.getAllOwner()
  }
})
</script>
