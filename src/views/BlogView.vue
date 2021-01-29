<template>
  <v-container>
    <v-row>
      <v-col v-if="blogContent">
        <div :class="['text-h2', 'mb-0']">{{ blogContent.title }}</div>

        <v-img
          class="white--text align-end"
          :src="
            blogContent.image
              ? `${blogContent.image}`
              : require('@/assets/noImage.png')
          "
        />
        <p>{{ blogContent.createdDate }}</p>
        <highlightable @share="onShare" @highlight="onHighlight">
          <p v-html="blogContent.content" class="bolas"></p>
        </highlightable>
      </v-col>
      <div v-else>No blog found with this ID</div>
    </v-row>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on"
            >From the bottom</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
            <v-card-text>
              <BlogFields type="edit" />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Highlightable from '@/components/Highlight.vue'
import BlogFields from '@/components/BlogFields.vue'
import { BlogModule } from '@/store/modules/blog'

@Component({
  components: {
    Highlightable,
    BlogFields,
  },
})
export default class BlogView extends Vue {
  blogContent: any = null
  dialog = false
  get id() {
    return this.$route.params.id
  }
  async created() {
    // window.onmouseup = this.dula
    if (BlogModule.allBlogs.length === 0) await BlogModule.getAllBlogs()
    if (this.id) {
      await BlogModule.getBlogById(this.id)
      this.blogContent = BlogModule.blog
    }
  }

  onShare(text: string, range: any) {
    console.log('share:', text)
  }
  onHighlight(text: string, range: any) {
    const userSelection: any = window.getSelection()
    console.log('highlight:', text)
    const node = this.dula2(range)
    const range1 = userSelection.getRangeAt(0)
    range1.deleteContents()
    range1.insertNode(node)
    const element = document.getElementsByClassName('bolas')[0]
    const state = [...BlogModule.allBlogs]
    const index = state.findIndex(item => item.id === this.id)
    if (index !== -1) {
      state[index] = { ...state[index], content: element.innerHTML }
      console.log(state)
      BlogModule.saveBlogs(state)
    }
  }
  dula2(range: any) {
    //Function that highlights a selection and makes it clickable

    //Create the new Node
    const newNode = document.createElement('span')

    // Make it highlight
    newNode.setAttribute('style', 'background-color: #3ebfbd;')

    // Make it "Clickable"
    newNode.onclick = () => {
      if (confirm('do you want to delete it?')) {
        this.deletenode(newNode)
      } else {
        alert(range)
      }
    }

    //Add Text for replacement (for multiple nodes only)
    // newNode.innerHTML += range;
    newNode.appendChild(range.cloneContents())

    //Apply Node around selection (used for individual nodes only)
    range.surroundContents(newNode)

    return newNode
  }
  deletenode(node: any) {
    const contents = document.createTextNode(node.innerText)
    node.parentNode.replaceChild(contents, node)
  }
}
</script>

<style scoped lang="scss">
#textSelectionTooltipContainer {
  will-change: transform;
  position: absolute;
  width: 100px;
  height: 40px;
  background: #f7d39d;
  top: 0px;
  left: 0px;
  display: flex;
  padding: 5px 10px;
  box-sizing: border-box;
  justify-content: center;
}

#textSelectionTooltipContainer button {
  font-size: 14px;
  border: 1px solid black;
  background: none;
  cursor: pointer;
  margin: 0 2px;
}
</style>
