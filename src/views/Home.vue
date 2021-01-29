<template>
  <v-container>
    <v-btn @click="dialog = true">Create</v-btn>
    <v-row justify="start">
      <v-col v-for="item in allBlogs" :key="item.id" md="4" lg="3">
        <BlogCard
          @viewBlog="id => $router.push(`/blog/${id}`)"
          :blogData="item"
        />
      </v-col>
    </v-row>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
      >
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
            <v-card-text>
              <BlogFields @saveFields="createBlog" type="create" />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BlogCard from '@/components/BlogCard.vue' // @ is an alias to /src
import BlogFields from '@/components/BlogFields.vue' // @ is an alias to /src
import { getModule } from 'vuex-module-decorators'
import { BlogModule } from '@/store/modules/blog'
import { v4 as uuidv4 } from 'uuid'
@Component({
  components: {
    BlogCard,
    BlogFields,
  },
})
export default class Home extends Vue {
  public allBlogs: any = []
  dialog = false
  async created() {
    if (BlogModule.allBlogs.length === 0) await BlogModule.getAllBlogs()
    this.allBlogs = BlogModule.allBlogs
  }
  createBlog({ content, image, title }: any) {
    const state = [...BlogModule.allBlogs]
    const date = new Date()
    state.push({
      content,
      image,
      title,
      createdDate: date.toDateString(),
      id: uuidv4(),
    })
    BlogModule.saveBlogs(state)
    this.dialog = false
  }
}
</script>
