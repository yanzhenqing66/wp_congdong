<template>
  <com-stu-layout headShow>
    <view class="login">
      <image src="/static/images/logo.png" class="login_logo"></image>
      <view class="login_auth">
        <text>获取您的公开信息（昵称及头像等）</text>
        <button class="login_auth_btn uni-my-13" @click="login">微信一键登录</button>
        <text>登录即表示同意 <text class="uni-warning">《丛动体育服务协议》</text></text>
      </view>
    </view>
  </com-stu-layout>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    userLogin,
    setUserInfo,
    getUserInfo
  } from '@/api/path/login.js'

  onMounted(() => {
    uni.showLoading({
      icon: 'loading'
    })
    const token = uni.getStorageSync('token')
    const user = uni.getStorageSync('user')

    if (token && user.id) {
      getUserInfo().then(res => {
        uni.setStorageSync('user', res.data)
        if (res.data.userType === 2) {
          uni.reLaunch({
            url: '/pages/teach/student/index'
          })
        } else if (res.data.userType === 3) {
          if (res.data.contractType) {
            uni.reLaunch({
              url: '/pages/student/home/index'
            })
          } else {
            uni.reLaunch({
              url: '/pages/login/questions'
            })
          }
        }
      })
    } else {
      uni.removeStorageSync('token')
      uni.removeStorageSync('user')
      uni.hideLoading()
    }
  })

  const login = () => {
    uni.showToast({
      icon: 'loading'
    })
    uni.login({
      provider: 'weixin',
    }).then(res => {
      goUser(res.code)
    })
  }

  const goUser = (code) => {
    userLogin(code).then(result => {
      uni.showToast({
        icon: 'success'
      })
      if (result.data) {
        uni.setStorageSync('token', result.data.maOpenid)
        uni.setStorageSync('user', result.data)
        if (result.data.userType === 2) {
          uni.reLaunch({
            url: '/pages/teach/student/index'
          })
        } else if (result.data.userType === 3) {
          if (result.data.contractType) {
            uni.reLaunch({
              url: '/pages/student/home/index'
            })
          } else {
            uni.reLaunch({
              url: '/pages/login/questions'
            })
          }
        }
      }
    })
  }

  // const getUserInfo = () => {
  // uni.getUserInfo().then(async res => {
  //   await setUserInfo({
  //     openId: result.data,
  //     avatar: res.userInfo.avatarUrl,
  //     nikeName: res.userInfo.nickName
  //   })
  // })
  // }
</script>

<style scoped lang="scss">
  .login {
    position: relative;
    width: 100%;
    height: 100%;

    &_logo {
      position: absolute;
      top: 20%;
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
      width: 460rpx;
      font-size: $uni-font-size-sm;
      color: #fff;
      text-align: center;

      &_btn {
        width: 100%;
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
