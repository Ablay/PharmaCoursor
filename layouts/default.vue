<template>
	<v-app id="inspire">
		<v-app-bar color="primary">
				<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
				<v-avatar class="ml-2" color="white" size="32">
					<v-icon icon="mdi-flask-outline"></v-icon>
				</v-avatar>
				<v-app-bar-title>PharmaCursor</v-app-bar-title>

				<!-- <v-spacer></v-spacer> -->
				<!-- <v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn> -->
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" width="320">
			<template v-slot:prepend>
				<v-list-item lines="two"
					:title="userInfo?.fullname" :subtitle="roles[userInfo?.role]">
					<template #prepend>
						<v-avatar class="mr-1" color="primary" size="36">
					<v-icon icon="mdi-doctor"></v-icon>
				</v-avatar>
						
					</template>
				</v-list-item>
			</template>
			<v-divider></v-divider>
			<v-list>
				<v-list-item v-for="link in links" :prepend-icon="link.icon" :title="link.text" :to="link.url"></v-list-item>
			</v-list>

			<template v-slot:append>
				<v-list class="mb-4">
					<v-list-item prepend-icon="mdi-logout" title="Выйти" @click="logout()"></v-list-item>
				</v-list>
			</template>
		</v-navigation-drawer>
		<v-main class="bg-grey-lighten-3">
			<v-container>
				<slot />
			</v-container>
		</v-main>
	</v-app>
</template>
  
<script setup>
const drawer = ref(false);
const { userInfo } = useUser();

const roles = {
	"1": "Администратор",
	"2": "Студент",
	"3": "Фармацевт",
}

const links = [
	{
		url: '/',
		text: 'Главная страница',
		icon: 'mdi-rss'
	},
	{
		url: '/drugs',
		text: 'Лекарственные препараты',
		icon: 'mdi-pill-multiple'
	},
	{
		url: '/lessons',
		text: 'Обучающие материалы',
		icon: 'mdi-book-open-page-variant-outline'
	},
	{
		url: '/acts',
		text: 'Нормативно правовые акты',
		icon: 'mdi-file-document-multiple-outline'
	},
	{
		url: '/support',
		text: 'Обратная связь',
		icon: 'mdi-face-agent'
	}
];
if(+userInfo.value?.role == 1) {
	links.push({
		url: '/users',
		text: 'Пользователи',
		icon: 'mdi-account-group-outline'
	});
}

const logout = () => {
	userInfo.value = null;
	navigateTo('/login');
}
</script>