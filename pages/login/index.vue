<template>
	<view>{{ linkList }}</view>
</template>

<script>
import { ref } from 'vue'
export default {
	setup() {
		const linkList = ref('safdsfdsfds')

		return {
			linkList,
		}
	},
}
</script>
