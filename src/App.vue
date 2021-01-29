<template>
  <v-app>
    <v-main>
      <HomePage />
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
