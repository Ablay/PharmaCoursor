<template>
	<NuxtLayout name="custom">

		<v-app id="inspire">
			<v-main class="bg-grey-lighten-3">
				<v-container>
					<v-card class="px-4 mb-5" elevation="0">
						<v-card-text class="text-body-1">
							<div class="text-center">
								<img width="200px" src="/icon-256x256.png" />
							</div>
							<div class="text-body-1 mb-2 font-weight-medium">Добро пожаловать в PharmaCursor – Ваш надежный компаньон в профессиональном росте! </div>

							<div class="text-body-2 mb-5">
								<p>Наше приложение предназначено для обучения фармацевтов всем тонкостям лекарственных средств,
									стандартам GPP и обеспечивает доступ к актуальным нормативам, помогая вам оставаться в курсе
									изменений в законодательстве и нормативным актам. </p>

								<p>Стройте успешную карьеру, будьте в курсе последних трендов и делитесь знаниями с коллегами.</p>
							</div>
							<v-btn class="mb-3" block variant="flat" color="primary">
								Войти
								
								<v-dialog
									v-model="loginDialog"
									activator="parent"
									width="400"
								>
									<v-card class="pt-3 pb-3">
										<v-card-title class="pl-6">Вход</v-card-title>
										<v-card-text>
											<form @submit.prevent="submit">
												<FieldsBaseField class="mb-3" v-model="login.value.value" label="E-mail" type="email" :error-messages="login.errorMessage.value" />
												<FieldsBaseField v-model="password.value.value" label="Пароль" type="password" :error-messages="password.errorMessage.value" />
												<br>
												<v-btn block type="submit" color="primary" variant="flat" :disabled="isLoading">Войти</v-btn>
											</form>
										</v-card-text>
										<v-card-actions>
											<v-btn block @click="loginDialog = false">Закрыть</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-btn>
							<v-btn block variant="flat">Зарегистрироваться</v-btn>
						</v-card-text>
					</v-card>
				</v-container>
			</v-main>
		</v-app>
	</NuxtLayout>
</template>

<script setup>
definePageMeta({
	layout: false
})

const loginDialog = ref(false);

const { handleSubmit, handleReset } = useForm({
	validationSchema: {
		login(value) {
			return value ? true : 'Обязательное поле';
		},
		password(value) {
			return value ? true : 'Обязательное поле';
		}
	},
});

const login = useField('login')
const password = useField('password')

const submit = handleSubmit(values => {
	if(login.value.value == 'jenis99@list.ru' && password.value.value == '123456') {
		const userInfo = useCookie('userInfo');
		userInfo.value = {
			id: 1,
			name: 'Сейтжанов Женис',
			subtitle: 'фармацевт',
			role: 1
		};
		navigateTo('/');
	} else {
		alert('Неверный логин или пароль!');
	}
	// const formDataToSend = {
	// 	name: name.value.value,
	// 	contact: contact.value.value,
	// 	text: text.value.value
	// };

	// isLoading.value = true;

	// fetch('/api/support', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify(formDataToSend),
	// })
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		if(data) {
	// 			showDialog.value = true;
	// 			handleReset();
	// 		} else {
	// 			alert('Ошибка!');
	// 		}
			
	// 	})
	// 	.catch(error => {
	// 		console.error(error);
	// 	}).finally(() => {
	// 		isLoading.value = false;
	// 	});
})

</script>

<style scoped lang="scss"></style>