<template>
  <div>
    <v-col md="4" class="circle">
      <v-card tile flat>
        <v-tabs flat class="mb-1">
          <v-tab @click="currentComponent = 'UserLoginForm'">ユーザー</v-tab>
          <v-tab @click="currentComponent = 'OwnerLoginForm'">オーナー</v-tab>
          <v-tab @click="currentComponent = 'AdminLoginForm'">管理者</v-tab>
        </v-tabs>
        <component :is="currentComponent"></component>
      </v-card>
    </v-col>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import UserLoginForm from '@/components/LoginForm/UserLoginForm.vue'
import OwnerLoginForm, { LoginFormData } from '@/components/LoginForm/OwnerLoginForm.vue'
import AdminLoginForm from '@/components/LoginForm/AdminLoginForm.vue'


export default defineComponent({
  name: 'Login',
  components: {
    UserLoginForm,
    OwnerLoginForm,
    AdminLoginForm,
  },
  data() {
    return {
      currentComponent: UserLoginForm as LoginFormData | unknown
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
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
</style>

