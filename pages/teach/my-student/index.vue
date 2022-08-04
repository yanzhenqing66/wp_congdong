<template>
	<view class="container">
		<teach-search></teach-search>
		<template v-for="i in 30" :key="i">
			<stu-list></stu-list>
		</template>
	</view>
</template>

<script setup>
import TeachSearch from './components/search'
import StuList from './components/stu-list'
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	min-height: 100vh;
	background-color: #f8f8f8;
	padding: 20rpx 0;
}
</style>
