<template>
  <v-container>
    <v-row>
      <v-col v-if="!createNews" md="8" class="center">
      <validation-observer ref="obs" v-slot="ObserverProps">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="blue white--text">
                <th class="text-left text-subtitle-1 font-weight-bold">
                  <span class="white--text">
                    登録項目
                  </span>
                </th>
                <th class="text-center">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="40%">件名</td>
                <td class="py-2">
                  <validation-provider v-slot="ProviderProps" rules="required" name="件名" class="ma-0 pa-0">
                    <v-text-field dense solo flat outlined v-model="form.title" hide-details :error-messages="ProviderProps.errors[0]"></v-text-field>
                    <span v-if="ProviderProps.errors[0]" style="color: red">{{ ProviderProps.errors[0] }}</span>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <td width="40%">内容</td>
                  <td class="py-2">
                    <validation-provider v-slot="ProviderProps" rules="required" name="内容">
                      <v-textarea dense solo hide-details flat outlined v-model="form.text" :error-messages="ProviderProps.errors[0]"></v-textarea>
                      <span v-if="ProviderProps.errors[0]" style="color: red">{{ ProviderProps.errors[0] }}</span>
                    </validation-provider>
                  </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-col class="text-right my-6">
          <v-btn @click="clear" color="warning" class="mr-6">clear</v-btn>
          <v-btn color="primary" @click="create" :disabled="ObserverProps.invalid || !ObserverProps.validated" :loading="dialog">登録</v-btn>
        </v-col>
      </validation-observer>
      </v-col>

      <v-col v-else class="center">
        <h2 class="text-center">お知らせを作成しました</h2>
        <v-col class="text-center mt-10">
          <v-btn class="mx-auto" @click="close" color="primary">閉じる</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { createNews } from '@/apis/admin_lists'

export default defineComponent({
  name: 'OwnerMenuCraete',
  data() {
    return {
      form: {
        title: '',
        text: '',
      },
      createNews: false,
      dialog: false
    }
  },
  methods: {
    async create() {
      this.dialog = true
      await createNews({
        title: this.form.title,
        text: this.form.text
      })
      setTimeout(() => {
        this.dialog = false
        this.createNews = true
        this.form.title = ''
        this.form.text = ''
      }, 3000)
    },
    close() {
      this.createNews = false
    },
    clear() {
      this.form.title = '',
      this.form.text = '',
      (this.$refs.obs as HTMLFormElement).reset();
    }
  }
})
</script>
