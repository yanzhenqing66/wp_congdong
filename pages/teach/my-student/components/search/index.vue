<template>
	<view class="search">
		<view>
			<image
				src="/static/images/teach/calendar.png"
				class="search_calendar"
			></image>
			<text class="search_date">5月25日 星期三</text>
			<uni-tag text="今天" size="small" type="primary" circle></uni-tag>
		</view>
		<view class="search_bar">
			<uni-easyinput
				v-model="searchVal"
				placeholder="搜索学员"
				class="search_bar_input"
				:clearable="false"
			></uni-easyinput>
			<button class="search_bar_btn" size="mini" @click="searchClick">
				<uni-icons type="search" size="19" color="#fff"></uni-icons>
			</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
const searchVal = ref('')

const searchClick = () => {
	console.log(searchVal.value)
}
</script>

<style scoped lang="scss">
.search {
	width: 670rpx;
	height: 100rpx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	padding: 0 10rpx;
	font-size: 24rpx;

	&_calendar {
		width: 24rpx;
		height: 24rpx;
	}

	&_date {
		margin: 0 10rpx;
		color: #727171;
	}

	&_bar {
		width: 304rpx;
		display: flex;
		align-items: center;

		&_input {
			flex: 1;
		}

		&_btn {
			margin-left: -10rpx;
			width: 37px;
			height: 37px;
			background-color: $uni-color-primary;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 0 4rpx 4rpx 0;
		}
	}
}
</style>
