<template>
  <div>
    <v-main class="grey lighten-3 ">
      <v-container>
        <v-btn
          color="primary"
          class="ml-auto d-flex  createButton"
          @click="dialog = true"
        >
          <v-icon>mdi-plus</v-icon>

          <Typography
            size="medium"
            color="white"
            weight="normal"
            label="Create Blog"
          />
        </v-btn>
        <div v-if="allBlogs.length">
          <v-row>
            <v-col v-for="item in allBlogs" :key="item.id" cols="4">
              <BlogCard
                @deleteBlog="onDeleteBlog"
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
                  <v-toolbar color="primary" class="text-center" dark>
                    <Typography
                      size="medium"
                      color="white"
                      weight="semiDark"
                      label="Create a new Blog"
                    />

                    <v-btn
                      class="ml-auto"
                      color="error"
                      @click="dialog.value = false"
                    >
                      <v-icon>mdi-close</v-icon></v-btn
                    ></v-toolbar
                  >

                  <v-card-text>
                    <BlogFields @saveFields="createBlog" type="create" />
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </div>
        <Empty
          v-else
          message="It's empty here, Start with creating BlogPosts"
        />
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BlogCard from '@/components/BlogCard.vue' // @ is an alias to /src
import BlogFields from '@/components/BlogFields.vue' // @ is an alias to /src
import { BlogModule } from '@/store/modules/blog'
import { v4 as uuidv4 } from 'uuid'
@Component({
  components: {
    BlogCard,
    BlogFields,
  },
})
export default class Home extends Vue {
  // public allBlogs: any = []

  dialog = false

  async created() {
    if (BlogModule.allBlogs.length === 0) await BlogModule.getAllBlogs()
    // this.allBlogs = BlogModule.allBlogs
  }
  get allBlogs() {
    if (BlogModule.filters) {
      return BlogModule.allBlogs.filter(item =>
        item.title?.includes(BlogModule.filters),
      )
    } else {
      return BlogModule.allBlogs
    }
  }
  onDeleteBlog(id: string) {
    const arrayClone = BlogModule.allBlogs
    const index = arrayClone.findIndex(item => item.id === id)
    if (index !== -1) {
      let highlights = BlogModule.highlights
      highlights = highlights.filter(item => item.blog.id !== id)
      arrayClone.splice(index, 1)
      BlogModule.saveHighLights(highlights)
      BlogModule.saveBlogs(arrayClone)
    }
  }

  createBlog({
    content,
    image,
    title,
  }: Record<'content' | 'image' | 'title', string>) {
    const state = [...BlogModule.allBlogs]
    const date = new Date()
    state.push({
      content,
      image,
      title,
      createdDate: date.toDateString(),
      author: BlogModule.author,
      id: uuidv4(),
    })
    BlogModule.saveBlogs(state)
    this.dialog = false
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/variables.scss';
::v-deep .v-main__wrap {
  min-height: calc(100vh - 64px) !important;
}
.createButton {
  min-width: 225px;
}
::v-deep .v-btn {
  text-transform: capitalize;
  font-family: $font-family;
  font-weight: 600;
  color: $color-white !important;
  font-size: 12px;
  //min-width: 225px !important;
  // padding-left: 0px !important;
  padding: 0px 10px !important;
}
</style>
