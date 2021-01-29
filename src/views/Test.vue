<template>
  <div class="app">
    <highlightable @share="onShare" @highlight="onHighlight">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet at
        debitis deserunt, optio rem eaque obcaecati non possimus nisi assumenda
        architecto exercitationem dolore quo praesentium, deleniti reiciendis
        sed ab nihil!
      </p>
    </highlightable>
    <p>
      <strong>This paragraph can't be highlighted.</strong> Lorem ipsum dolor
      sit amet, consectetur adipisicing elit. Labore ipsam repellat, fugiat aut
      ex incidunt ut quisquam quasi consequatur ducimus quo in, cum soluta eos
      dolores tempore unde voluptate modi.
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Highlightable from '@/components/Highlight.vue'
@Component({
  components: {
    Highlightable,
  },
})
export default class Test extends Vue {
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
  }
  dula2(range: any) {
    //Function that highlights a selection and makes it clickable

    //Create the new Node
    const newNode = document.createElement('span')

    // Make it highlight
    newNode.setAttribute('style', 'background-color: yellow;')

    //Make it "Clickable"
    // newNode.onclick = () => {
    //   if (confirm('do you want to delete it?')) {
    //     this.deletenode(newNode)
    //   } else {
    //     alert(range)
    //   }
    // }

    //Add Text for replacement (for multiple nodes only)
    // newNode.innerHTML += range;
    newNode.appendChild(range.cloneContents())

    //Apply Node around selection (used for individual nodes only)
    range.surroundContents(newNode)

    return newNode
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 800px;
  margin: 40px auto;
  padding: 10px;
  font-family: Verdana;
  color: #333;
  width: 100%;
}

p {
  line-height: 1.5;
}
</style>
