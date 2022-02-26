<template>
  <v-container>
    <v-row>
      <v-col md="6" class="center pa-4">
        <h2 class="text-center mb-8">パスワード変更</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
        <v-simple-table>
          <template>
            <tr>
              <th class="text-left">
                新パスワード
              </th>
              <td>
                <validation-provider v-slot="ProviderProps" rules="required" name="パスワード">
                  <v-text-field
                    v-model="password"
                    dense
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :error-messages="ProviderProps.errors[0]"
                  >
                  </v-text-field>
                </validation-provider>
              </td>
            </tr>
            <tr>
              <th class="text-left">
                新パスワード再入力
              </th>
              <td>
                <validation-provider v-slot="ProviderProps" rules="required|confirmed:パスワード" name="パスワード確認">
                <v-text-field
                  v-model="password_confirm"
                  dense
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :error-messages="ProviderProps.errors[0]"
                ></v-text-field>
                </validation-provider>
              </td>
            </tr>
          </template>
        </v-simple-table>
        <v-col class="text-right">
          <v-btn
            color="primary"
            class="white--text"
            :loading="dialog"
            @click="changePassword"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
          >登録</v-btn>
        </v-col>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'ChangePassword',
  data() {
    return {
      password: '',
      password_confirm: '',
      dialog: false,
      show1: false,
      show2: false,
    }
  },
  methods: {
    async changePassword() {
      this.dialog = true;
      try {
        await axios.post('change_password', {
          email: this.$store.state.loginData.email,
          password: this.password
        })
        this.dialog = false;
        this.$router.push('/registration_complete');
      } catch(err) {
        this.dialog = false;
        console.log(err)
      }
    }
  }
})
</script>

<style>
  .center {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
</style>

