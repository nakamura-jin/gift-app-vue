<template>
  <v-container>
    <v-row>
      <v-col v-if="!sendedEmail">
        <h2 class="text-center my-4">メッセージ</h2>
        <v-col class="text-right">
          <v-btn icon large color="primary" @click="send" :loading="sending"><v-icon large>mdi-arrow-up-circle</v-icon></v-btn>
        </v-col>
        <v-col class="d-flex pb-0" style="border-bottom: 1px solid gray">
          <span class="pt-2">宛先: </span>
          <v-text-field
            dense
            solo
            flat
            hide-details
            clearable
          >
          <template v-slot:prepend-inner>
            <div v-if="user">
              <v-chip close @click:close="toClear">{{ user }}</v-chip>
            </div>
          </template>
          </v-text-field>
          <v-btn icon @click="dialog = !dialog"><v-icon>mdi-book-open-blank-variant</v-icon></v-btn>
        </v-col>

        <v-col class="d-flex pb-0" style="border-bottom: 1px solid gray">
          <span class="pt-2">件名: </span>
          <v-text-field
            dense
            solo
            flat
            v-model="title"
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col class="mt-6">
          <span>本文: </span>
          <v-textarea
            outlined
            v-model="text"
            height="400"
          ></v-textarea>
        </v-col>

        <v-dialog v-model="dialog">
          <MailingList @selectUser="selectUser"/>
        </v-dialog>
      </v-col>


      <v-col v-else class="center">
        <h2 class="text-center">メール送信しました</h2>
        <v-col class="text-center mt-10">
          <v-btn class="mx-auto" @click="close" color="primary">閉じる</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MailingList from '@/components/Admin/MailingList.vue'
import { ListsResponse } from '@/apis/admin_lists'
import axios from 'axios'


export default defineComponent({
  name: 'AdminSendEmail',
  components: {
    MailingList
  },
  data() {
    return {
      sendedEmail: false,
      dialog: false,
      sending: false,
      user: '',
      email: '',
      title: '',
      text: '',
      allUser: this.$store.state.allUser
    }
  },
  methods: {
    selectUser(value: ListsResponse) {
      this.dialog = false
      this.email = value.email
      this.user = value.name
    },
    getUser() {
      this.$store.dispatch('getAllUser')
    },
    toClear() {
      this.user = ''
      this.email = ''
    },
    async send() {
      this.sending = true
      await axios.post('/admin/send', {
        name: this.user,
        email: this.email,
        title: this.title,
        text: this.text
      })
      .then(() => {
        this.sending = false
        console.log('OK')
        this.user = ''
        this.email = ''
        this.title = ''
        this.text = ''
        this.sendedEmail = true
      })
    },
    close() {
      this.sendedEmail = false
    }
  },
  created() {
    this.getUser()
  },
})
</script>
