<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="card text-center" flat>
          <h2 class="mb-8">登録が完了しました</h2>
          <p>オーナー様へ忘れずご連絡してください。</p>
          <router-link to="/admin">トップページへ</router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'RegistrationCompleteOwner',
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
