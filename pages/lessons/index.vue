<template>
	<div>
		<div class="text-h6 mb-4">Обучающие материалы</div>
		<v-btn to="/lessons/add" class="mb-3" color="green" flat>Добавить</v-btn>
		<v-text-field class="mb-5" v-model="searchTextModel" :disabled="loading" density="compact" variant="solo" flat
			label="Поиск" append-inner-icon="mdi-magnify" single-line hide-details clearable persistent-clear
			@click:append-inner="triggerSearch" @click:clear="clearAndTriggerSearch"></v-text-field>

		<div v-if="loading" class="text-center">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<div v-if="!data.length">Нет данных</div>
			<ArticleCard v-else v-for="item in data" :item="item" :openLink="`/lessons/${item.id}`"
				@onDelete="deleteArticle" />
		</template>
	</div>
</template>
  
<script setup>
const searchTextModel = ref(null);

const searchText = ref(null);

const { data, pending: loading, refresh } = await useLazyFetch(`/api/lessons`, {
	query: {
		search: searchText
	},
});

const triggerSearch = () => {
	searchText.value = searchTextModel.value;
};

const clearAndTriggerSearch = () => {
	searchTextModel.value = null;
	triggerSearch();
};

const deleteArticle = async (id) => {
	if (confirm(`Are you sure you want to delete this article`)) {
		const deleteResponse = await $fetch(`/api/lessons/delete/${id}`, {
			method: 'DELETE'
		});
		refresh();
	}
}
</script>
  
<style>
/* Add your styles here */
</style>