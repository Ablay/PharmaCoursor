<template>
	<v-list-item :to="openLink">
		<template v-if="item.thumbnailFile" #prepend>
			<v-img class="mr-4" :width="60" aspect-ratio="1" cover :src="`data:image/jpeg;base64,${item.thumbnailFile}`"></v-img>
		</template>
		<v-list-item-title>{{ item.title }}</v-list-item-title>

		<v-list-item-subtitle>
			<span v-if="item.category" class="text-indigo">{{ item.category }} • </span><template v-if="item.date">{{ item.date }}
				• </template><template v-if="item.content">{{ item.content }}</template>
		</v-list-item-subtitle>
	</v-list-item>
</template>

<script setup>
defineProps({
	item: Object,
	openLink: String
})
</script>

<style scoped>
/*  */
</style>