<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" width="20%">
            インストアコード
          </th>
          <th class="text-center">
            商品名
          </th>
          <th class="text-center" v-show="$vuetify.breakpoint.mobile ? false : true">
            商品説明
          </th>
          <th class="text-center" width="10%">
            金額
          </th>
          <th class="text-center" width="10%">
            在庫数
          </th>
          <th class="text-center" width="6%">
            編集
          </th>
          <th class="text-center" width="6%">
            削除
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="menu in menus"
          :key="menu.id"
          class="text-center"
        >
          <td>{{ menu.product_code }}</td>
          <td>{{ menu.name }}</td>
          <td v-show="$vuetify.breakpoint.mobile ? false : true">{{ menu.description }}</td>
          <td>{{ menu.price }}</td>
          <td>{{ menu.quantity }}</td>
          <td><v-btn icon color="success"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
          <td><v-btn icon color="error"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MenuResponse } from '@/modules/menus'

export default defineComponent({
  name: 'ProductTable',
  props: {
    menus: {
      type: Array as () => MenuResponse[],
      required: true
    }
  }
})
</script>
