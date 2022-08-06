<template>
	<view class="container">
		<view class="publish">
			<com-userhead></com-userhead>
			<view class="publish_edit">编辑作业信息</view>
			<view class="publish_calendar">
				<uni-calendar :insert="true" range :showMonth="false" />
			</view>
			<view class="publish_select">
				<uni-data-select
					v-model="value"
					:localdata="range"
					@change="change"
					placeholder="训练目标"
				></uni-data-select>
				<view class="seat"></view>
				<uni-easyinput
					class="mt18"
					trim="all"
					v-model="value"
					placeholder="填写动作要点"
					@input="input"
				></uni-easyinput>
				<view class="seat"></view>
				<view class="publish_select_content">
					<view class="publish_select_content_title"> 体前变向运球 </view>
					<view class="publish_select_content_video"> 动作示范视频 </view>
					<view class="publish_select_content_amount">
						<uni-number-box :min="0" :max="100" />
						<text class="publish_select_content_amount_unit">组</text>
					</view>
				</view>
				<view class="publish_select_line"></view>
				<view class="publish_select_btn">
					<button class="publish_select_btn_reset" size="mini">重置内容</button>
					<button class="publish_select_btn_submit" size="mini">
						确认发布
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<!-- :start-date="'2019-3-2'"
				:end-date="'2019-5-20'" -->

<script setup></script>

<style lang="scss" scoped>
.container {
	width: 100%;
	min-height: 100vh;
	background-color: $uni-bg-color-grey;
	padding: 45rpx 0 20rpx 0;
}

.publish {
	width: 670rpx;
	margin: 0 auto;
	background-color: #fff;

	&_edit {
		margin-top: 24rpx;
		width: 100%;
		height: 49rpx;
		background-color: #ffa932;
		color: #fff;
		line-height: 49rpx;
		text-align: center;
	}

	&_calendar {
		width: 670rpx;

		::v-deep.uni-calendar-item__weeks-box-item {
			width: 70rpx;
			height: 80rpx;
			border-radius: 100px;
		}

		::v-deep.uni-calendar-item__weeks-lunar-text {
			display: none;
		}
	}

	&_select {
		padding: 29rpx 38rpx;

		&_line {
			width: 100%;
			border: 1px dashed $uni-text-color-grey;
			margin: 34rpx 0 28rpx 0;
		}

		&_btn {
			display: flex;
			justify-content: space-between;

			&_submit,
			&_reset {
				width: 235rpx;
				height: 67rpx;
				@extend %flexCenter;
				color: #fff;
			}

			&_reset {
				background-color: $uni-color-primary;
			}

			&_submit {
				background-color: $uni-color-warning;
			}
		}
	}
}

.publish_select_content {
	height: 26px;
	font-size: $uni-font-size-sm;
	display: flex;
	color: #fff;

	&_title {
		width: 173rpx;
		color: #fff;
		background-color: $uni-color-primary;
		@extend %flexCenter;
	}

	&_video {
		margin: 0 8rpx;
		width: 210rpx;
		flex: 1;
		color: #fff;
		background-color: $uni-color-warning;
		@extend %flexCenter;
	}

	&_amount {
		flex: 1;
		@extend %flexCenter;

		&_unit {
			width: 40rpx;
			height: 100%;
			background-color: $uni-color-primary;
			@extend %flexCenter;
		}
	}
}
.seat {
	height: 18rpx;
}
</style>
