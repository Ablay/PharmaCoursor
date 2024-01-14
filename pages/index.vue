<template>
	<v-card class="mb-6">
		<v-card-title>Лекарственные препараты</v-card-title>
		<div v-if="drugsLoading" class="text-center pb-2">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<v-list class="mt-n2" lines="two">
				<template v-for="item in drugs">
					<ArticleCardMini :item="item" :openLink="`/drugs/${item.id}`"
					@onDelete="deleteArticle" />
					<v-divider></v-divider>
				</template>
			</v-list>
			<v-card-actions>
				<v-btn to="/drugs" block color="primary" variant="tonal">Показать все</v-btn>
			</v-card-actions>
		</template>
	</v-card>
	<v-card class="mb-6">
		<v-card-title>Обучающие материалы</v-card-title>
		<div v-if="lessonsLoading" class="text-center pb-2">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<v-list class="mt-n2" lines="two">
				<template v-for="item in lessons">
					<ArticleCardMini :item="item" :openLink="`/lessons/${item.id}`"
					@onDelete="deleteArticle" />
					<v-divider></v-divider>
				</template>
			</v-list>
			<v-card-actions>
				<v-btn to="/lessons" block color="primary" variant="tonal">Показать все</v-btn>
			</v-card-actions>
		</template>
	</v-card>
	<v-card class="mb-6">
		<v-card-title>Нормативно правовые акты</v-card-title>
		<div v-if="actsLoading" class="text-center pb-2">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<v-list class="mt-n2" lines="two">
				<template v-for="item in acts">
					<ArticleCardMini :item="item" :openLink="`/acts/${item.id}`"
					@onDelete="deleteArticle" />
					<v-divider></v-divider>
				</template>
			</v-list>
			<v-card-actions>
				<v-btn to="/acts" block color="primary" variant="tonal">Показать все</v-btn>
			</v-card-actions>
		</template>
	</v-card>
</template>

<script setup>
const { data: drugs, pending: drugsLoading } = await useLazyFetch(`/api/drugs`, {
	query: {
		limit: 3
	}
});

const { data: lessons, pending: lessonsLoading } = await useLazyFetch(`/api/lessons`, {
	query: {
		limit: 3
	}
});

const { data: acts, pending: actsLoading } = await useLazyFetch(`/api/acts`, {
	query: {
		limit: 3
	}
});
</script>

<style scoped land="scss"></style>