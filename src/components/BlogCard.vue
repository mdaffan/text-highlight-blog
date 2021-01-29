<template>
  <v-container>
    <v-card min-height="400px" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        :src="
          blogData.image ? `${blogData.image}` : require('@/assets/noImage.png')
        "
      >
        <v-card-title>{{ blogData.title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ blogData.createdDate }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <p>
          {{
            this.sanitizeHtml(blogData.content, {
              allowedTags: [],
            })
          }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" @click="$emit('viewBlog', blogData.id)" text>
          View
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import sanitizeHtml from 'sanitize-html'
@Component({})
export default class Home extends Vue {
  @Prop({ default: () => ({}) })
  blogData!: any
  sanitizeHtml = sanitizeHtml
}
</script>

<style></style>
