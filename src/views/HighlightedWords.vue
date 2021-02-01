<template>
  <v-main class="grey lighten-3">
    <v-row v-if="Object.keys(highlightedWords).length">
      <v-col class="ma-auto" lg="8" md="10" sm="12" xs="12">
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-sheet rounded="lg">
                <v-list color="transparent">
                  <v-list-item disabled color=" lighten-4">
                    <v-list-item-content>
                      <v-list-item-title>
                        Highlighted
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="my-2"></v-divider>
                  <v-list-item
                    :class="{ active: activeWord === key }"
                    v-for="(value, key) in highlightedWords"
                    :key="key"
                    link
                  >
                    <v-list-item-content @click="activeWord = key">
                      <v-list-item-title> {{ key }} </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col cols="9">
              <v-sheet min-height="70vh" rounded="lg">
                <!--  -->

                <v-list>
                  <v-list-item
                    @click="$router.push(`/blog/${data.blog.id}`)"
                    v-for="(data, key) in getBlogsOfHighlightedWords"
                    :key="key"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        data.blog.title
                      }}</v-list-item-title>

                      <v-list-item-subtitle
                        v-html="getHighlightedWords(data.snippedConfig)"
                        class="snippedText"
                      >
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <Empty
      v-else
      message="It's empty here, Please Highlight words and see them in action here"
    />
  </v-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { groupBy } from '@/utils/helperFunctions'
import { BlogModule } from '@/store/modules/blog'
@Component({})
export default class HighlightedWords extends Vue {
  activeWord = ''
  get highlightedWords() {
    return groupBy(BlogModule.highlights, 'text')
  }
  get getBlogsOfHighlightedWords() {
    return this.highlightedWords[this.activeWord]
  }
  getHighlightedWords(config: any) {
    function replaceOffset(str: string, start: number, end: number, tag = '') {
      tag = tag || 'span'

      str = str.replace(
        new RegExp('(.{' + start + '})(.{' + (end - start) + '})'),
        '$1<' + tag + ' class="mark">$2</' + tag + '>',
      )

      return str
    }
    return replaceOffset(
      config.snippedText,
      config.snippedStartOffset,
      config.snippedEndOffset,
    )
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
::v-deep .v-main__wrap {
  min-height: calc(100vh - 64px) !important;
}
.active {
  background-color: $color-primary;
}
.snippedText {
  white-space: normal !important;
}
::v-deep .mark {
  background-color: $color-primary;
}
</style>
