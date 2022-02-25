<template>
  <div>
    <template v-if="!dialog" >
      <v-row height="100vh" width="100vw">
        <v-col md="4" class="circle">
          <v-card class="ma-0">
            <v-app-bar color="primary" dark flat>
              <v-card-title class="pa-0">Register</v-card-title>
            </v-app-bar>
            <validation-observer ref="obs" v-slot="ObserverProps">
              <v-col class="pa-6">
              <p v-if="error" style="color: red;">{{ error }}</p>
                <validation-provider v-slot="ProviderProps" rules="required" name="名前">
                  <v-text-field label="Name"
                    v-model="form.name"
                    dense
                    :error-messages="ProviderProps.errors[0]"
                  ></v-text-field>
                </validation-provider>

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
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :error-messages="ProviderProps.errors[0]"
                    class="mt-3"
                  ></v-text-field>
                </validation-provider>

                <validation-provider v-slot="ProviderProps" rules="required|confirmed:パスワード" name="パスワード確認">
                  <v-text-field
                    label="PasswordComfirm"
                    v-model="password_comfirm"
                    dense
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    :error-messages="ProviderProps.errors[0]"
                    class="mt-3"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            <v-col class="text-right">
              <v-btn
                class="mr-6"
                color="warning"
                @click="clear"
              >clear</v-btn>
              <v-btn
                color="primary"
                @click="register"
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
              >Register</v-btn>
            </v-col>
            </validation-observer>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-container height="100vh" width="100vw" class="circle-wrap">
        <div class="circle text-center">
          <v-progress-circular
            indeterminate
            value="40"
            size="50"
            rotate="-90"
            width="8"
            color="primary"
          >
          </v-progress-circular>
          <p class="text-center mt-4">Loading...</p>
        </div>
      </v-container>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { createUser } from '@/apis/login_api'
import { UserCreateParams } from '@/apis/login_api'

export default defineComponent({
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      } as UserCreateParams,
      password_comfirm: '',
      show1: false,
      show2: false,
      error: '' as string | unknown,
      dialog: false,
    }
  },
  methods: {
    async register() {
      try {
        this.dialog = true
        await createUser({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        })
        this.dialog = false
        this.$router.push('/registration_complete')
      } catch (err) {
        this.dialog = false
        this.error = err
      }
    },
    clear() {
      this.form.name = '',
      this.form.email = '',
      this.form.password = '',
      this.password_comfirm = '',
      (this.$refs.obs as HTMLFormElement).reset();
    }
  }
})
</script>

<style scoped>
  .circle-wrap {
    width: 100vw;
    height: 100vh;
  }
  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

</style>

