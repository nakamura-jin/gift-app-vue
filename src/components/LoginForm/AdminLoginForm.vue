<template>
  <div>
    <v-row height="100vh" width="100vw">
      <v-col class="circle pb-0">
        <v-card class="ma-0">
          <v-app-bar color="green" dark flat>
            <v-card-title>Login</v-card-title>
          </v-app-bar>
          <validation-observer ref="obs" v-slot="ObserverProps">
            <v-col class="pa-6">
              <validation-provider v-slot="ProviderProps" rules="required|email" name="メールアドレス">
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  dense
                  :error-messages="ProviderProps.errors[0]"
                  class="mt-3"
                ></v-text-field>
              </validation-provider>

              <validation-provider v-slot="ProviderProps" rules="required" name="パスワード">
                <v-text-field
                  label="Password"
                  v-model="form.password"
                  dense
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                  :error-messages="ProviderProps.errors[0]"
                  class="mt-3"
                ></v-text-field>
              </validation-provider>
            </v-col>

            <span class="pa-6 red--text font-weight-bold" v-if="error">{{ error }}</span>

            <v-col class="text-right">
              <v-btn
                class="mr-6"
                color="warning"
                @click="clear"
              >clear</v-btn>

              <v-btn
                color="green"
                class="white--text"
                @click="submit"
                :loading="dialog"
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
              >Login</v-btn>

            </v-col>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { LoginParams } from '@/apis/login_api'
import Cookies from 'js-cookie'


export interface LoginFormData {
  form: LoginParams;
  show3: boolean;
  error: string;
  dialog: boolean;
  submit: void;
  clear: void;
}

export default defineComponent({
  name: 'OwnerLoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
        type: 'admin',
      } as LoginParams,
      show3: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password,
        type: this.form.type
      })

      this.dialog = true
      setTimeout(() => {
        this.dialog = false
        if(Cookies.get('_myapp_token')) {
          this.$router.push('/admin')
        }
      }, 3000)

    },
    clear() {
      this.form.email = '',
      this.form.password = '',
      this.$store.commit('ERROR_CLEAR');
      (this.$refs.obs as HTMLFormElement).reset();
    }
  },
  computed: {
    error () {
      if(this.$store.state.error) {
        return 'ログインに失敗しました'
      }
    }
  }
})
</script>
