<template>
  <v-container>
    <v-row>
      <v-col v-if="!createMenu" class="mx-auto mt-12" md="10">
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
                <td width="40%">商品名</td>
                <td class="py-2">
                  <validation-provider v-slot="ProviderProps" rules="required" name="商品名" class="ma-0 pa-0">
                    <v-text-field placeholder="商品名" dense solo flat outlined v-model="form.name" hide-details :error-messages="ProviderProps.errors[0]"></v-text-field>
                    <span v-if="ProviderProps.errors[0]" style="color: red">{{ ProviderProps.errors[0] }}</span>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <td width="40%">商品説明</td>
                  <td class="py-2">
                    <validation-provider v-slot="ProviderProps" rules="required" name="商品説明">
                      <v-textarea placeholder="商品説明" dense solo hide-details flat outlined v-model="form.description" :error-messages="ProviderProps.errors[0]"></v-textarea>
                      <span v-if="ProviderProps.errors[0]" style="color: red">{{ ProviderProps.errors[0] }}</span>
                    </validation-provider>
                  </td>
              </tr>
              <tr>
                <td width="40%">価格</td>
                <td class="py-2">
                  <validation-provider v-slot="ProviderProps" rules="required|numeric" name="価格">
                    <v-text-field placeholder="数値のみ入力" dense solo hide-details flat outlined v-model="form.price" :error-messages="ProviderProps.errors[0]"></v-text-field>
                    <span v-if="ProviderProps.errors[0]" style="color: red">{{ ProviderProps.errors[0] }}</span>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <td width="40%">画像</td>
                <td class="py-2">
                  <validation-provider v-slot="ProviderProps" rules="required" name="画像">
                    <v-file-input dense solo hide-details flat outlined v-model="form.image" show-size :error-messages="ProviderProps.errors[0]"></v-file-input>
                    <span v-if="ProviderProps.errors[0]" style="color: red">{{ ProviderProps.errors[0] }}</span>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <td width="40%">ジャンル</td>
                <td class="py-2">
                  <validation-provider v-slot="ProviderProps" rules="required" name="ジャンル">
                    <v-select dense solo hide-details flat outlined :items="genre_name" v-model="form.genre" :value="genre_name" :error-messages="ProviderProps.errors[0]"></v-select>
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
        <h2 class="text-center">メニューを作成しました</h2>
        <v-col class="text-center mt-10">
          <v-btn class="mx-auto" @click="close" color="primary">閉じる</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'
import { createMenu, createMenuParams } from '@/apis/menu_apis'

export default defineComponent({
  name: 'OwnerMenuCraete',
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        genre: '',
        image: [],
      } as createMenuParams,
      genre_name: [],
      setGenre: [],
      file: [],
      dialog: false,
      createMenu: false
    }
  },
  methods: {
    async getGenre() {
      await axios.get('/genre')
      .then(res => {
        this.genre_name = res.data.data
      })
    },
    async create() {
      try {
        const data = new FormData();
        data.append('name', this.form.name)
        data.append('description', this.form.description)
        data.append('price', this.form.price as any)
        data.append('genre', this.form.genre)
        data.append('image', this.form.image as any)
        data.append('owner_id', this.$store.state.loginData.id)

        this.dialog = true
        await createMenu( data ).then(() => {
          this.dialog = false
          this.createMenu = true
        })

      } catch (error) {
        return error
      }
    },
    clear() {
      this.form.name = '',
      this.form.description = '',
      this.form.price = null,
      this.form.genre = '',
      this.form.image = [],
      (this.$refs.obs as HTMLFormElement).reset();
    },
    close() {
      this.createMenu = false,
      this.form.name = '',
      this.form.description = '',
      this.form.price = null,
      this.form.genre = '',
      this.form.image = []
    },
  },
  created() {
    this.getGenre()
  }
})
</script>
