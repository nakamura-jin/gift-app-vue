<template>
  <!----- スマホ ----->
    <v-col v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="px-0">
      <v-card @click="menuDetail">
        <v-img :src="menu.image" />
        <v-card-title class="py-1">{{ menu.name | omittedText }}</v-card-title>
        <v-col class="py-0">
          <v-card-text class="pa-0 text-caption">{{ menu.genre_name }}</v-card-text>
        </v-col>
        <v-col>
          <span>¥ {{ menu.price }}</span>
        </v-col>
      </v-card>
    </v-col>

  <!----- PC ----->
    <v-col v-else>
      <v-card width="200" height="280" @click="menuDetail">
        <v-img :src="menu.image" height="140" />
        <v-card-title class="py-1">{{ menu.name }}</v-card-title>
        <v-col class="d-flex py-1">
          <v-card-text class="pa-0">{{ menu.genre_name }}</v-card-text>
        </v-col>
        <v-col>
          <span>¥ {{ menu.price }}</span>
        </v-col>
      </v-card>
    </v-col>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MenuResponse } from '@/modules/menus'


export default defineComponent({
  name: 'Menu',
  props: {
    menu: {
      type: Object as () => MenuResponse,
      required: true
    }
  },
  filters: {
    omittedText(text: string) {
     // 6文字目以降は"…"
      return text.length > 6 ? text.slice(0, 6) + "…" : text;
    },
  },
  methods: {
    menuDetail(): void {
      this.$router.push({ path: '/detail', query: { menu_id: String(this.menu.id)}})
    }
  }
})
</script>
