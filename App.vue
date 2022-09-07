<script>
  export default {
    onLaunch: function() {},
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  @import '@/class.scss';

  // tab图标
  .uni-tabbar .uni-tabbar__icon {
    width: 15px !important;
    height: 15px !important;
  }


  page {
    margin: 0;
    padding: 0;
    font-size: 28rpx;
    color: #333;
    height: 100%;
  }

  page,
  view,
  text {
    box-sizing: border-box;
  }

  button {
    margin: 0;
  }
</style>
