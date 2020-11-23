import { Component, Vue, Watch } from 'vue-property-decorator'
declare const window: Window & { WebViewJavascriptBridge: any, WVJBCallbacks: any, screenHeight: any };
@Component({
  name: 'ResizeMixin1'
})
export default class extends Vue {
  clientHeight:any = document.body.clientHeight;
  private timer = false;

  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.clientHeight = window.screenHeight
      })()
    }
  }
  @Watch('clientHeight')
  private WatchclientHeight(val: any) {
    // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    if (!this.timer) {
      // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
      this.clientHeight = val
      this.timer = true
      let that = this
      setTimeout(function () {
        // 打印screenWidth变化的值
        console.log(that.clientHeight)
        that.timer = false
      }, 400)
    }
  }
}
