<template>
  <view class="login">
    <image src="/static/images/logo.png" class="login_logo"></image>
    <view class="login_auth">
      <text>申请获取您的手机号及公开信息（昵称及头像等）</text>
      <button class="login_auth_btn uni-my-13" open-type="getUserInfo" @getphonenumber="getphoneNumber"
        @getuserinfo="getuserinfo">微信一键登录</button>
      <text>登录即表示同意 <text class="uni-warning">《丛动体育服务协议》</text></text>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'

  const getuserinfo = (val) => {
    console.log(val);
  }

  const getphoneNumber = (val) => {
    console.log(val);
  }
</script>

<style scoped lang="scss">
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('https://poppyapps.oss-cn-beijing.aliyuncs.com/main-bg.png') no-repeat;
    background-size: 100% 100%;
    // background-size: cover;
    /*关键*/
    background-attachment: fixed;
    background-position: center;

    &_logo {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      width: 284rpx;
      height: 289rpx;
    }

    &_auth {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translateX(-50%);
      font-size: $uni-font-size-sm;
      color: #fff;
      text-align: center;

      &_btn {
        width: 435rpx;
        height: 90rpx;
        background-color: $uni-color-warning;
        color: #fff;
        border-radius: 100px;

        &:active {
          background-color: $uni-active-color-warning;
          color: hsla(0, 0%, 100%, .6);
        }
      }
    }
  }
</style>
