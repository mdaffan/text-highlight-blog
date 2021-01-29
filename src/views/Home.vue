<template>
  <v-container>
    <div v-for="item in allBlogs" :key="item.id">
      <BlogCard
        @viewBlog="id => $router.push(`/blog/${id}`)"
        :blogData="item"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BlogCard from '@/components/BlogCard.vue' // @ is an alias to /src
import { getModule } from 'vuex-module-decorators'
import { BlogModule } from '@/store/modules/blog'

@Component({
  components: {
    BlogCard,
  },
})
export default class Home extends Vue {
  public allBlogs: any = []

  async created() {
    await BlogModule.getAllBlogs()
    this.allBlogs = BlogModule.allBlogs
  }
}
</script>
