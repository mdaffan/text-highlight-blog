<template>
  <div>
    <slot />
    <span :class="classType" :style="{ color: color }">{{ label }}</span>
    <span>
      <c-tooltip v-if="info" :info="info" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Typography extends Vue {
  @Prop()
  weight!: string
  @Prop()
  size!: string
  @Prop()
  label!: string
  @Prop()
  color!: string
  @Prop()
  info!: string

  get classType() {
    if (this.size && this.weight) {
      return [this.size, this.weight]
    } else {
      return ['small', 'normal']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.small {
  height: 15px;
  font-size: 12px;
  color: #6e6e6e;
  @extend .common;
}
.xsmall {
  height: 13px;
  font-size: 10px;
  @extend .common;
}
.medium {
  height: 18px;
  font-size: 14px;
  @extend .common;
}
.lightdark {
  color: $color-gray;
}

.metaldark {
  color: $color-black;
}
.large {
  height: 19px;
  font-size: 16px;
  @extend .common;
}
.larger {
  height: 22px;
  font-size: 18px;
  @extend .common;
}
.xlarge {
  height: 29px;
  font-size: 24px;
  @extend .common;
}
.xlight {
  font-weight: 500 !important;
  color: #979797;
  @extend .common;
}
.light {
  font-weight: 500 !important;
  color: #646464;
  @extend .common;
}
.lighter {
  font-weight: 400 !important;
  color: #646464;
  @extend .common;
}
.normal {
  font-weight: 500 !important;
  color: rgba(0, 0, 0, 0.85);
  @extend .common;
}
.dark {
  font-weight: 600 !important;
  color: rgba(0, 0, 0, 0.85);
}
.semiDark {
  color: #6e6e6e;
  font-weight: 600 !important;
  @extend .common;
}

.common {
  // font-weight: 600;
  font-family: $font-family;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
}
</style>
