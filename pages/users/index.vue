<template>
	<div>
		<div class="text-h6 mb-4">Зарегистрированные пользователи</div>
		
		<div v-if="loading" class="text-center">
			<v-progress-circular indeterminate color="primary" size="30" :width="3"></v-progress-circular>
		</div>
		<template v-else>
			<div v-if="!data.length">Нет данных</div>
			
			
			<v-card class="mb-5" v-else v-for="(item, itemKey) in data" :key="itemKey">
				<v-card-text class="pb-0">
					<div>ФИО: {{ item.fullname }}</div>
					<div>Телефон: {{ item.phone }}</div>
					<div>Email: {{ item.email }}</div>
					<div>Телефон: {{ item.phone }}</div>
					<div>Роль: {{ roles[item.role] }}</div>
					<div v-if="item.studentFile">Cправка об обучении: <u @click="downloadFile(item.studentFile.base64, 'Cправка об обучении.pdf')">Скачать</u></div>
					<div v-if="item.pharmacistFile1">Диплом: <u @click="downloadFile(item.pharmacistFile1.base64, 'Диплом.pdf')">Скачать</u></div>
					<div v-if="item.pharmacistFile2">Сертификат специалиста: <u @click="downloadFile(item.pharmacistFile2.base64, 'Сертификат специалиста.pdf')">Скачать</u></div>
					
					<div>Статус: <b>{{ statuses[item.status] }}</b></div>
				</v-card-text>
				<v-card-actions class="px-4">
					<!-- <div v-if="item.date" class="text-grey">{{ item.date }}</div> -->
					<v-spacer></v-spacer>
					<v-btn v-if="+item.status == 1" color="red" @click="changeStatus(item, 2)">Заброликровать</v-btn>
					<v-btn v-if="+item.status == 2" color="green" @click="changeStatus(item, 1)">Разблокировать</v-btn>
					<v-btn v-if="+item.status == 3 || +item.status == 4" color="green" @click="changeStatus(item, 1)">Разрешить</v-btn>
					<v-btn v-if="+item.status == 4" color="red" @click="changeStatus(item, 3)">Отклонить</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</div>
</template>
  
<script setup>
const roles = {
	"1": "Администратор",
	"2": "Студент",
	"3": "Фармацевт",
};
const statuses = {
	"1": "Доступ разрешен",
	"2": "Доступ заблокирован",
	"3": "Доступ отклонен",
	"4": "Ожидает решения",
};

const { data, pending: loading, refresh } = await useLazyFetch(`/api/users`);


const changeStatus = async (user, status) => {
		const response = await $fetch(`/api/users/${user.email}`, {
			method: 'POST',
			body: {
				status
			}
		});
		refresh();
}

const downloadFile = (base64String, filename) => {
  const linkSource = `data:application/pdf;base64,${base64String}`;
  const downloadLink = document.createElement("a");

  downloadLink.href = linkSource;
  downloadLink.download = filename;
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
</script>
  
<style>
/* Add your styles here */
</style>