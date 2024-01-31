<template>
	<div>

		<div v-if="loading" class="text-center">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<v-btn to="/lessons" prepend-icon="mdi-arrow-left" size="small" color="primary" variant="tonal" class="mb-3">Назад</v-btn>
			<div v-if="!data">Запись не найдена</div>
			<v-card v-else class="mb-5">
				<div class="article-title pa-4 pb-0">{{ data.title }}</div>
				<!-- <div v-if="data.date" class="article-date text-grey px-4">{{ data.date }}</div> -->
				<v-card-text>
					<div class="article-content" v-html="data.content"></div>
					<template v-if="data.testFile">
						<iframe :src="`data:application/pdf;base64,${data.testFile}`" style="width: 100%; height: 500px; border: none;">

						</iframe>
						<v-btn :href="`data:application/octet-stream;base64,${data.testFile}`" block color="primary" variant="tonal" class="mt-4" :download="data.testFileName">Скачать материал</v-btn>
					</template>

					<template v-if="data.testAns?.trim()">
						<v-btn class="mt-3" @click="showTestAns = !showTestAns" block color="secondary" variant="tonal">{{ showTestAns ? 'Скрыть ответы теста' : 'Показать ответы теста' }}</v-btn>

						<div v-if="showTestAns" class="article-test-ans" v-html="data.testAns"></div>
					</template>
				</v-card-text>
			</v-card>
		</template>
	</div>
</template>
  
<script setup>
const route = useRoute();

const showTestAns = ref(false);

const { data, pending: loading } = await useLazyFetch(`/api/lessons/${route.params.id}`);

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