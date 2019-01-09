<template>
  <div id="app">
    <code-mirror
      v-model="vueSource"
      title="Vue Component(editable)"
    />
    <code-mirror
      ref="consumeMirror"
      v-model="consumerSource"
      title="Generated content"
      :mode="consumerMode"
      theme="darcula"
      read-only
    >
      <button
        type="button"
        :class="{active: currentType === 0}"
        @click="handleSwitch(0)"
      >
        Raw Markdown
      </button>
      <button
        type="button"
        :class="{active: currentType === 1}"
        @click="handleSwitch(1)"
      >
        Parser Result
      </button>
      <button
        type="button"
        :class="{active: currentType === 2}"
        @click="handleSwitch(2)"
      >
        Render Result
      </button>
    </code-mirror>
  </div>
</template>

<script>
import vueSource from '@/utils/vueSource'
import { stringify } from '@/utils/tools'
import genMarkdown from '@/utils/genMarkdown'
import { parser, Render } from 'vuese'

export default {
  components: {
    CodeMirror: () => import('@/components/CodeMirror')
  },
  data() {
    return {
      vueSource,
      parserRes: null,
      renderRes: null,
      md: '',
      currentType: 0,
      consumerMode: 'markdown',
      consumerSource: ''
    }
  },
  watch: {
    vueSource: 'make'
  },
  mounted() {
    this.make()
  },
  methods: {
    make() {
      try {
        this.parserRes = parser(this.vueSource)
        const VR = new Render(this.parserRes)
        this.renderRes = VR.render()
        this.md = genMarkdown(this.parserRes, this.renderRes)

        this.consumerSource = this.md
      } catch (e) {
        this.consumerSource = e.toString()
      }
    },
    handleSwitch(type) {
      this.currentType = type
      switch (type) {
        // Raw markdown
        case 0:
          this.consumerSource = this.md
          this.consumerMode = 'markdown'
          break
        // Parser result
        case 1:
          this.consumerSource = stringify(this.parserRes)
          this.consumerMode = 'javascript'
          break
        // Render result
        case 2:
          this.consumerSource = stringify(this.renderRes)
          this.consumerMode = 'javascript'
          break
      }
    }
  }
}
</script>

<style lang="stylus">
html, body, #app
  height 100%
  margin 0
#app
  display flex
button[type=button]
  border none
  background #e4f5ef
  height 30px
  box-sizing border-box
  border-radius 3px
  padding 0 14px
  font-size 14px
  cursor pointer
  margin-right 4px
  outline 0
  &:first-child
    margin-left 20px
  &.active
    background-color #42b983
    color #fff
  &:hover
    box-shadow 0 0 2px #42b983
</style>
