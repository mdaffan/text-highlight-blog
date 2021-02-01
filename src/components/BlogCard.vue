<template>
  <v-container class="containerClass">
    <v-card
      min-height="70vh"
      class="cardContainer"
      max-height="70vh"
      max-width="30vw"
    >
      <v-btn
        small
        color="error"
        class=" deleteButton"
        @click="$emit('deleteBlog', blogData.id)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-img
        class="white--text align-end"
        height="200px"
        :src="
          blogData.image ? `${blogData.image}` : require('@/assets/noImage.png')
        "
      >
        <v-card-title>{{ blogData.title }}</v-card-title>
      </v-img>
      <div class="d-flex">
        <v-card-subtitle class="pb-0">
          {{ blogData.createdDate }}
        </v-card-subtitle>

        <v-card-subtitle class="pb-0">
          - by {{ blogData.author.name }}
        </v-card-subtitle>
      </div>
      <v-card-text class="text--primary textCard">
        <p>
          {{
            this.sanitizeHtml(blogData.content, {
              allowedTags: [],
            })
          }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="$emit('viewBlog', blogData.id)" text>
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

<style lang="scss" scoped>
.textCard {
  max-height: 30vh;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 30vw;
}
.containerClass {
  .cardContainer {
    position: relative;
    .deleteButton {
      opacity: 0;
      position: absolute;
      z-index: 3;
      right: 5px;
      top: 2px;
    }
  }
  :hover {
    .deleteButton {
      opacity: 1;
      transition: 0.5s ease;
    }
  }
}
</style>
