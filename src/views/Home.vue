<template>
  <v-container>
    <BlogCard />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import BlogCard from '@/components/BlogCard.vue' // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    BlogCard,
  },
})
export default class Home extends Vue {}
</script>
