<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="title"
      :rules="nameRules"
      label="Title"
      required
    ></v-text-field>
    <v-text-field
      v-model="image"
      label="Paste Image Url(Pick one from Unsplash,etc :) )"
    ></v-text-field>

    <v-textarea
      v-model="content"
      :rules="nameRules"
      label="Content"
      required
    ></v-textarea>

    <v-btn color="warning" @click="save">
      {{ type === 'edit' ? 'Save Changes' : 'Create Blog' }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class BlogFields extends Vue {
  get id() {
    return this.$route.params.id
  }
  title = ''
  image = ''
  content = ''
  nameRules = [(v: any) => !!v || 'Title is required']
  type = this.id ? 'edit' : 'create'
  save() {
    const payload = {
      content: this.content,
      image: this.image,
      title: this.title,
    }
    this.$emit('saveFields', payload)
  }
}
</script>

<style></style>
