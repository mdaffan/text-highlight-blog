<template>
  <v-card max-width="400">
    <v-img class="white--text align-end" height="200px" :src="blogData.image">
      <v-card-title>{{ blogData.blogTitle }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ blogData.date }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <p>{{ blogData.blogContent }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Preview
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class Home extends Vue {
  @Prop({ default: {} })
  blogData!: string
}
</script>

<style></style>
