<template>
  <v-form ref="form" class="mt-3" v-model="valid" lazy-validation>
    <v-text-field v-model="title" :rules="nameRules" label="Title" required />
    <v-text-field
      v-model="image"
      label="Paste Image Url(Pick one from Unsplash,etc :) )"
    />

    <v-textarea
      @input="e => contentEdit(e)"
      :value="this.sanitizeHtml(content, { allowedTags: [] })"
      :rules="nameRules"
      label="Content"
      required
    />

    <!-- <p contenteditable v-html="content" @blur="onEdit"></p> -->

    <v-btn outlined color="primary" @click="save">
      {{ type === 'edit' ? 'Save Changes' : 'Create Blog' }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import sanitizeHtml from 'sanitize-html'
import Highlightable from '@/components/Highlight.vue'
@Component({
  components: {
    Highlightable,
  },
})
export default class BlogFields extends Vue {
  @Prop({ default: () => ({}) })
  data!: any
  get id() {
    return this.$route.params.id
  }
  title = ''
  image = ''
  valid = false
  content = ''
  nameRules = [(v: any) => !!v || 'Field is required']
  type = this.id ? 'edit' : 'create'
  $refs: any
  sanitizeHtml = sanitizeHtml
  save() {
    this.valid = this.$refs.form.validate()
    if (this.valid) {
      const payload = {
        content: this.content,
        image: this.image,
        title: this.title,
      }
      this.$emit('saveFields', payload)
    }
  }
  onEdit(e: any) {
    this.content = e.target.innerHTML
  }
  contentEdit(e: any) {
    console.log(e)
    this.content = e
  }
  fields = ['title', 'image', 'content', 'createdDate']
  @Watch('data', { immediate: true, deep: true })
  prefillFields(data: any) {
    console.log(data)

    if (data && this.type === 'edit') {
      this.fields.map(item => {
        if (Object.prototype.hasOwnProperty.call(data, item)) {
          Object.assign(this, { [item]: data[item] })
        }
      })
    }
  }
}
</script>

<style></style>
