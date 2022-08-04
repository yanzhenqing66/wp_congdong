<template>
	<view class="container">
		<com-userhead></com-userhead>
		<view class="stu">
			<view class="stu_handle">
				<button
					class="comm_btn stu_handle_publish"
					size="mini"
					@click="handlePublish"
				>
					发布作业
				</button>
				<button type="primary" class="comm_btn stu_handle_check" size="mini">
					查看问卷
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
const handlePublish = () => {
	uni.navigateTo({
		url: '/pages/teach/publish-homework/index',
	})
}
</script>

<style scoped lang="scss">
.container {
	width: 670rpx;
	margin: 0 auto;
	margin-top: 40rpx;
}

.stu {
	position: relative;
	width: 100%;
	// height: 280rpx;
	background-color: #fff;
	padding: 0 30rpx;

	&_handle {
		padding: 27rpx 0 30rpx 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;

		&_publish {
			background-color: $uni-color-warning;
		}

		&_check {
			margin-left: 24rpx;
			background-color: $uni-color-primary;
		}

		.comm_btn {
			border-radius: 30px;
			color: #fff;
		}
	}
}
</style>
