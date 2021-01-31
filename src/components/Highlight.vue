<template>
  <div>
    <div
      :style="{ left: `${x}px`, top: `${y}px` }"
      v-show="showMenu"
      class="menu"
      @mousedown.prevent=""
    >
      <v-icon v-if="notHighlightable" color="white darken-2">
        mdi-close-octagon-outline
      </v-icon>

      <!-- <span @mousedown.prevent="handleAction('share')" class="item">
        Share
      </span> -->
      <span
        v-if="!notHighlightable"
        @mousedown.prevent="handleAction('highlight')"
        class="item"
      >
        Highlight
      </span>
      <!-- You can add more buttons here -->
    </div>
    <!-- The insterted text should be displayed here -->
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class Highlight extends Vue {
  public x = 0
  public y = 0
  public showMenu = false
  selectedText = ''
  range!: Range
  $slots: any
  get highlightableEl() {
    return this.$slots.default[0].elm
  }
  mounted() {
    window.addEventListener('mouseup', this.onMouseup)
  }
  beforeDestroy() {
    window.removeEventListener('mouseup', this.onMouseup)
  }
  handleAction(action: string) {
    this.handleSelectionChange(action)
    this.showMenu = false
  }
  notHighlightable = false
  notHighlightableMenu = false
  onMouseup() {
    const selection: any = window.getSelection()
    const selectionRange = selection.getRangeAt(0)

    if (selection.toString().length) {
      const startNode = selectionRange.startContainer.parentNode // startNode is the element that the selection starts in

      const endNode = selectionRange.endContainer.parentNode // endNode is the element that the selection ends in
      // if the selected text is not part of the highlightableEl (i.e. <p>)
      // OR
      // if startNode !== endNode (i.e. the user selected multiple paragraphs)
      // Then    // Don't show the menu (this selection is invalid)

      if (
        !startNode.isSameNode(this.highlightableEl) ||
        !startNode.isSameNode(endNode)
      ) {
        this.showMenu = false // Don't show the menu (this selection is invalid)
        return
      }
      const { x, y, width } = selectionRange.getBoundingClientRect() // Get the x, y, and width of the selection
      if (!width) {
        // If width === 0 (i.e. no selection)    // Then, hide the menu
        this.showMenu = false
        return
      }
      this.x = x + width / 2 // Finally, if the selection is valid,  // set the position of the menu element,
      this.y = y + window.scrollY - 10
      // set selectedText to content of the selection    // then, show the menu
      this.selectedText = selection.toString()
      this.showMenu = true
      this.range = selection.getRangeAt(0)
    }
    this.notHighlightable = !selection.toString().match('^[A-Za-z0-9]+$')
    const { x, y, width } = selectionRange.getBoundingClientRect() // Get the x, y, and width of the selection

    if (!width) {
      // If width === 0 (i.e. no selection)    // Then, hide the menu
      this.showMenu = false
      return
    }
  }
  handleSelectionChange(action: string) {
    console.log(this.highlightableEl.id)
    if (this.isEditor(this.highlightableEl)) {
      console.log(this.highlightableEl.id)
      const textSelection = this.getTextSelection(this.highlightableEl)

      if (textSelection != null) {
        const text = this.highlightableEl.innerText
        const selection = text.slice(textSelection.start, textSelection.end)
        console.log(selection, textSelection.start, textSelection.end)
        this.$emit(action, selection, textSelection.start, textSelection.end)
      }
    }
  }
  isEditor(element: any) {
    return element != null && element.id === 'editor'
  }
  getNodeOffset(node: any): any {
    return node == null ? -1 : 1 + this.getNodeOffset(node.previousSibling)
  }
  getTextSelection(editor: any) {
    const selection = window.getSelection()

    if (selection != null && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)

      return {
        start: this.getTextLength(
          editor,
          range.startContainer,
          range.startOffset,
        ),
        end: this.getTextLength(editor, range.endContainer, range.endOffset),
      }
    } else return null
  }

  getTextLength(parent: any, node: any, offset: any) {
    let textLength = 0

    if (node.nodeName == '#text') textLength += offset
    else
      for (let i = 0; i < offset; i++)
        textLength += this.getNodeTextLength(node.childNodes[i])

    if (node != parent)
      textLength += this.getTextLength(
        parent,
        node.parentNode,
        this.getNodeOffset(node),
      )

    return textLength
  }

  getNodeTextLength(node: any) {
    let textLength = 0

    if (node.nodeName == 'BR') textLength = 1
    else if (node.nodeName == '#text') textLength = node.nodeValue.length
    else if (node.childNodes != null)
      for (let i = 0; i < node.childNodes.length; i++)
        textLength += this.getNodeTextLength(node.childNodes[i])

    return textLength
  }
}
</script>
<style scoped>
.menu {
  height: 30px;
  padding: 5px 10px;
  background: #333;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  transition: 0.2s all;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}
.item {
  color: #fff;
  cursor: pointer;
}
.item:hover {
  color: #1199ff;
}
.item + .item {
  margin-left: 10px;
}
</style>
