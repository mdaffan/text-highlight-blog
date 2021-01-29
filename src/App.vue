<template>
  <v-app>
    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomePage from '@/views/Home.vue'

@Component({
  components: {
    HomePage,
  },
})
export default class Home extends Vue {}
</script>
