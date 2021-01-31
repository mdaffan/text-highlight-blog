<template>
  <v-container class="customContainer">
    <v-row>
      <v-col cols="10" class="ma-auto" v-if="blogContent">
        <v-sheet class="pa-9" color="white" elevation="2">
          <div class="d-flex mb-1">
            <v-btn
              outlined
              class="d-flex-inline"
              color=""
              @click="$router.push('/')"
              >Go Back</v-btn
            >
            <v-btn color="primary" @click="dialog = true" class="d-flex ml-auto"
              >Edit</v-btn
            >
          </div>
          <div :class="['text-h2', 'mb-0']">{{ blogContent.title }}</div>

          <v-img
            max-width="400"
            max-height="400"
            class="white--text ma-auto mt-5 mb-5"
            :src="
              blogContent.image
                ? `${blogContent.image}`
                : require('@/assets/noImage.png')
            "
          />

          <p>{{ blogContent.createdDate }}</p>
          <highlightable @share="onShare" @highlight="onHighlight">
            <p v-html="blogContent.content" id="editor"></p>
          </highlightable>
        </v-sheet>
      </v-col>
      <div v-else>No blog found with this ID</div>
    </v-row>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
      >
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark
              >Edit Blog
              <v-btn
                class="ml-auto"
                color="error"
                @click="dialog.value = false"
              >
                <v-icon>mdi-close</v-icon></v-btn
              ></v-toolbar
            >

            <v-card-text>
              <BlogFields
                @saveFields="updateBlogData"
                :data="blogContents"
                type="edit"
              />
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Highlightable from '@/components/Highlight.vue'
import BlogFields from '@/components/BlogFields.vue'
import { BlogModule } from '@/store/modules/blog'
import { v4 as uuidv4 } from 'uuid'
import sanitizeHtml from 'sanitize-html'
@Component({
  components: {
    Highlightable,
    BlogFields,
  },
})
export default class BlogView extends Vue {
  dialog = false
  get id() {
    return this.$route.params.id
  }
  sanitizeHtml = sanitizeHtml
  blogContent: any = {}
  // Idea is to highlight content based on all the offsets(complex relationship) I have handy.
  // replaceOffset(str: string, offsets: any[], tag = '') {
  //   tag = tag || 'span'
  //   if (str) {
  //     offsets.reverse().forEach(element => {
  //       str = str.replace(
  //         new RegExp(
  //           '(.{' + element[0] + '})(.{' + (element[1] - element[0]) + '})',
  //         ),
  //         '$1<' + tag + ' class="mark">$2</' + tag + '>',
  //       )
  //     })
  //     return str
  //   } else return str
  // }

  // getContent(content: string) {
  //   let highlights = BlogModule.highlights
  //   highlights = highlights.filter(item => item.blog.id === this.id)

  //   let offsets = highlights.map(item => [item.startOffset, item.endOffset])
  //   console.log(offsets)

  //   let string = this.replaceOffset(content, offsets)
  //   return string
  // }
  async created() {
    // window.onmouseup = this.dula
    if (BlogModule.allBlogs.length === 0) await BlogModule.getAllBlogs()
    await BlogModule.getBlogById(this.id)
    this.blogContent = this.blogContents
  }
  get blogContents() {
    return BlogModule.blog
  }
  async updateBlogData({ content, image, title }: any) {
    if (BlogModule.blog.content?.length !== content.length) {
      if (
        confirm(
          'This will remove all the Highlights from this blog, Are you sure?',
        )
      ) {
        await BlogModule.updateBlogContent({
          ...BlogModule.blog,
          content: this.sanitizeHtml(content, {
            allowedTags: [],
          }),
          image,
          title,
        })
        let highlights = BlogModule.highlights
        highlights = highlights.filter(item => item.blog.id !== this.id)
        await BlogModule.saveHighLights(highlights)
      }
    } else {
      await BlogModule.updateBlogContent({
        ...BlogModule.blog,
        content,
        image,
        title,
      })
    }

    this.dialog = false
    this.blogContent = this.blogContents
  }
  onShare(text: string, range: any) {
    console.log('share:', text)
  }

  onHighlight(text: string, startOffset: number, endOffset: number) {
    console.log(endOffset, startOffset)
    let userSelection: any = window.getSelection()
    const range1 = userSelection.getRangeAt(0)
    const containerEl = document.getElementById('editor')
    const node = this.textHiglight(range1)

    range1.deleteContents()
    range1.insertNode(node)

    // function highlightHTML(
    //   content: string,
    //   startoffset: number,
    //   endoffset: number,
    //   color: string,
    // ) {
    //   let className = 'mark'
    //   console.log(
    //     'Inside Function: ' + content.substring(startoffset, endoffset),
    //   )
    //   return content.replace(
    //     content.substring(startoffset, endoffset),
    //     '<span class="' + className + '">$&</span>',
    //   )
    // }

    // userSelection = rangy.getSelection()
    // console.log(range1)
    const state = [...BlogModule.allBlogs]
    const index = state.findIndex(item => item.id === this.id)
    const getSnippedText = (wholeText = '') => {
      if (startOffset <= 300) {
        return {
          snippedStartOffset: startOffset,
          snippedEndOffset: endOffset,
          snippedText: wholeText.substring(0, endOffset + 150),
        }
      } else {
        console.log(wholeText.substring(startOffset - 150, endOffset + 150))
        return {
          snippedStartOffset: 153,
          snippedEndOffset: 153 + (endOffset - startOffset),
          snippedText: `...${wholeText.substring(
            startOffset - 150,
            endOffset + 150,
          )}...`,
        }
      }
    }
    if (index !== -1) {
      const payload = {
        blog: this.blogContents,
        highlightId: uuidv4(),
        text,
        startOffset: startOffset,
        endOffset: endOffset,
        paragraph: containerEl?.innerText,
        snippedConfig: getSnippedText(containerEl?.innerText),
      }
      BlogModule.addHighLightToBlog(payload)
      //   // state[index] = { ...state[index], content: element.innerHTML }
      BlogModule.updateBlogContent({
        ...state[index],
        content: containerEl?.innerHTML!,
      })
    }
  }
  mounted() {
    console.log('Hurray')
  }
  get highLights() {
    return BlogModule.highlights
  }
  textHiglight(range: any) {
    //Function that highlights a selection and makes it clickable

    //Create the new Node
    const newNode = document.createElement('mark')

    // Make it highlight
    newNode.setAttribute('style', 'background-color: #3ebfbd;')

    //Add Text for replacement (for multiple nodes only)
    // newNode.innerHTML += range;
    newNode.appendChild(range.extractContents())

    //Apply Node around selection (used for individual nodes only)
    // range.surroundContents(newNode)

    return newNode
  }
  deletenode(node: any) {
    const contents = document.createTextNode(node.innerText)
    node.parentNode.replaceChild(contents, node)
  }
  @Watch('highLights')
  highlightText(data: any) {
    console.log(data)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
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
::v-deep .mark {
  background-color: #3ebfbd;
}
.customContainer {
  margin-top: 64px;
}
</style>
