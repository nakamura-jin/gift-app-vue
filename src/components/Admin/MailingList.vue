<template>
  <v-container>
    <v-row>
      <v-col>
        <v-col class="ma-0 pa-0 d-flex">
          <v-tabs>
            <v-tab class="ma-1" @click="select = 'user'">ユーザー</v-tab>
            <v-tab class="ma-1" @click="select = 'owner'">オーナー</v-tab>
          </v-tabs>
          <v-col md="8" class="pb-0" style="background: white">
            <v-text-field
              append-icon="mdi-magnify"
              placeholder="search..."
              hide-details
              v-model="searchUser"
              class="ma-0 pa-0"
            >
            </v-text-field>
          </v-col>
        </v-col>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-center">
                  <span class="text-md-subtitle-1">id</span>
                </th>
                <th class="text-center">
                  名前
                </th>
                <th class="text-center" v-show="$vuetify.breakpoint.mobile ? false : true">
                  メールアドレス
                </th>
              </tr>
            </thead>
            <tbody v-if="select == 'user'">
              <tr v-for="user in userLists" :key="user.id" class="text-center" @click="dialog(user)">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td v-show="$vuetify.breakpoint.mobile ? false : true">{{ user.email }}</td>
              </tr>
            </tbody>

            <tbody v-if="select == 'owner'">
              <tr v-for="owner in ownerLists" :key="owner.id" class="text-center" @click="dialog(owner)">
                <td>{{ owner.id }}</td>
                <td>{{ owner.name }}</td>
                <td v-show="$vuetify.breakpoint.mobile ? false : true">{{ owner.email }}</td>
              </tr>
            </tbody>
          </template>
          </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ListsResponse } from '@/apis/admin_lists'

export default defineComponent({
  name: 'MailingList',
  data() {
    return {
      searchUser: '' as string,
      select: 'user'
    }
  },
  computed: {
    userLists() {
      let users = []
      for(let i = 0; i < this.$store.state.allUser.length; i++) {
        let user = this.$store.state.allUser[i]
        if(user.email.indexOf(this.searchUser) !== -1 || user.name.indexOf(this.searchUser) !== -1) {
          users.push(user)
        }
      }
      return users
    },

    ownerLists() {
      let owners = []
      for(let i = 0; i < this.$store.state.allOwner.length; i++) {
        let owner = this.$store.state.allOwner[i]
        if(owner.email.indexOf(this.searchUser) !== -1 || owner.name.indexOf(this.searchUser) !== -1) {
          owners.push(owner)
        }
      }
      return owners
    }
  },
  methods: {
    getUserList() {
        this.$store.dispatch('getAllUser')
        this.$store.dispatch('getAllOwner')
    },
    getOwnerList() {
      this.select = 'owner'
    },
    dialog(user: Array<ListsResponse>) {
      this.$emit('selectUser', user)
    }
  },
  created() {
    this.getUserList()
  }
})
</script>
