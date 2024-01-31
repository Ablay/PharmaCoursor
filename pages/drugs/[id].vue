<template>
	<div>

		<div v-if="loading" class="text-center">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<v-btn to="/drugs" prepend-icon="mdi-arrow-left" size="small" color="primary" variant="tonal" class="mb-3">Назад</v-btn>
			<div v-if="!data">Запись не найдена</div>
			<v-card v-else class="mb-5">
				<div class="article-title pa-4 pb-0">{{ data.title }}</div>
				<div class="d-flex ga-2 px-4 article-date">
					<div class="text-indigo">{{ data.category }}</div>
					<!-- <div v-if="data.date" class="text-grey">{{ data.date }}</div> -->
				</div>
				<v-card-text>
					<v-img v-if="data.thumbnailFile"
					:src="`data:image/jpeg;base64,${data.thumbnailFile}`"></v-img>
					<div class="article-content" v-html="data.content"></div>
				</v-card-text>
			</v-card>
		</template>
	</div>
</template>
  
<script setup>
const route = useRoute();

const { data, pending: loading } = await useLazyFetch(`/api/drugs/${route.params.id}`);
</script>
  
<style scoped lang="scss">
.article-title {
	font-size: 20px;
	line-height: 26px;
}
.article-date {
	font-size: 14px;
}
.article-content:deep() {
	p + p {
		margin-top: 10px;
	}
	img {
		max-width: 100%;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	iframe {
		width: 100%;
		margin-top: 10px;
		margin-bottom: 10px;
		aspect-ratio: 16/9;
	}
}
.article-test-ans {
	border: 1px solid rgb(72, 169, 166);
	padding: 8px 10px;
	border-radius: 6px;
	margin-top: 14px;
}
</style>