<template>
	<v-card class="mb-5">
		<!-- <nuxt-link class="nuxt-link" :to="openLink"> -->
		<v-card-text class="pb-0">
			<div class="title">{{ item.title }}</div>
			<div v-if="item.category" class="subtitle text-indigo">{{ item.category }}</div>

			<div class="d-flex ga-3">
				<v-img v-if="item.thumbnailFile" :width="120" aspect-ratio="1" cover
					:src="`data:image/jpeg;base64,${item.thumbnailFile}`"></v-img>
				<div v-if="item.content">{{ item.content }}...</div>
			</div>
		</v-card-text>
		<!-- </nuxt-link> -->
		<v-card-actions class="px-4">
			<div class="text-grey">{{ item.date }}</div>
			<v-spacer></v-spacer>
			<v-btn color="red" icon="mdi-delete-outline" @click="emit('onDelete', item.id)"></v-btn>
			<v-btn color="primary" variant="tonal" :to="openLink">Открыть</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup>
defineProps({
	item: Object,
	openLink: String
})
const emit = defineEmits(['onDelete']);
</script>

<style scoped>
.nuxt-link {
	text-decoration: none;
	color: unset;
}

.title {
	font-size: 20px;
	margin-bottom: 14px;
}

.subtitle {
	font-size: 15px;
	margin-bottom: 14px;
	margin-top: -8px;
}
</style>