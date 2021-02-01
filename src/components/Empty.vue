<template>
  <v-container>
    <div class="center">
      <!-- <img :src="require('@/assets/emptybox.svg')" /> -->
      <Typography size="larger" weight="dark" :label="message" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class Empty extends Vue {
  @Prop({ default: '' })
  message!: string
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
