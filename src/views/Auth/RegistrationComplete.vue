<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="card text-center" flat>
          <h2 class="mb-8">登録が完了しました</h2>
          <p>登録したメールアドレス宛に確認メールを送信しました</p>
          <p>メールを確認後ログインしてください</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'RegistrationComplete'
})
</script>

<style scoped>
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
