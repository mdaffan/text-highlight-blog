<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn
          @click="$router.push(link.route)"
          v-for="link in links"
          :key="link.route"
          text
        >
          {{ link.label }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>
    <div class="pt-0">
      <router-view> </router-view>
    </div>
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
export default class Home extends Vue {
  links = [
    { label: 'Home', route: '/' },
    { label: 'Highlighted Words', route: '/highlighted-words' },
  ]
}
</script>
<style lang="scss">
::v-deep .v-list-item__subtitle {
  white-space: normal;
}
</style>
