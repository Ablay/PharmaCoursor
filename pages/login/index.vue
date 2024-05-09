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
									:persistent="isLoading"
								>
									<v-card class="pt-3 pb-3">
										<v-card-title class="pl-6">Вход</v-card-title>
										<v-card-text>
											
											<v-form ref="loginForm" @submit.prevent="loginFormSubmit">
												<FieldsBaseField class="mb-3" v-model="loginFields.email" label="E-mail" type="email" :rules="[(v) => !!v || 'Обязательное поле', (v) => /.+@.+\..+/.test(v) || 'Введите корректный Email']" />
												<FieldsBaseField  v-model="loginFields.password" label="Пароль" type="password" :rules="[(v) => !!v || 'Обязательное поле']" />
												<br>
												<v-btn block type="submit" color="primary" variant="flat" :disabled="isLoading">Войти</v-btn>
											</v-form>
										</v-card-text>
										<v-card-actions>
											<v-btn block @click="loginDialog = false" :disabled="isLoading">Закрыть</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-btn>
							<v-btn block variant="flat">
								Зарегистрироваться
								
								<v-dialog
									v-model="regDialog"
									activator="parent"
									width="400"
									:persistent="isLoading"
								>
									<v-card class="pt-3 pb-3">
										<v-card-title class="pl-6">Регистрация</v-card-title>
										<v-card-text>
											<v-form ref="regForm" @submit.prevent="regFormSubmit">
												<FieldsBaseField class="mb-3" v-model="regFields.fullname" label="Ф.И.О" type="text" :rules="[(v) => !!v || 'Обязательное поле']" />
												<FieldsBaseField class="mb-3" v-model="regFields.email" label="E-mail" type="email" :rules="[(v) => !!v || 'Обязательное поле', (v) => /.+@.+\..+/.test(v) || 'Введите корректный Email']" />
												<FieldsBaseField class="mb-3" v-model="regFields.phone" label="Номер телефона" type="phone" :rules="[(v) => !!v || 'Обязательное поле']" />
												<FieldsBaseField  v-model="regFields.password" label="Пароль" type="password" :rules="[(v) => !!v || 'Обязательное поле', (v) => v.length >= 5 || 'Минимум 5 символов']" />
													
												<FieldsSelectField class="mb-3" v-model="regFields.role" label="Зарегистрироваться как" :items="roles" item-title="value" item-value="id" :rules="[(v) => !!v || 'Обязательное поле']" />
												
												<template v-if="+regFields.role == 2">
													<label class="text-caption">Cправка об обучении</label>
													<FieldsUploadFileField @onChange="regFields.studentFile = $event" :accept="['.pdf']" />
												</template>
												<template v-else-if="+regFields.role == 3">
													<label class="text-caption">Диплом</label>
													<FieldsUploadFileField @onChange="regFields.pharmacistFile1 = $event" :accept="['.pdf']" />
													<br>
													<label class="text-caption">Сертификат специалиста</label>
													<FieldsUploadFileField @onChange="regFields.pharmacistFile2 = $event" :accept="['.pdf']" />
												</template>
												<br>
												<v-btn block type="submit" color="primary" variant="flat" :disabled="isLoading">Зарегистрироваться</v-btn>
											</v-form>
										</v-card-text>
										<v-card-actions>
											<v-btn block @click="regDialog = false" :disabled="isLoading">Закрыть</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-btn>
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

const isLoading = ref(false);

const loginDialog = ref(false);
const loginForm = ref();
const loginFields = ref({
	email: null,
	password: null,
});

const loginFormSubmit = async () => {
	const formValidate = await loginForm.value.validate();
	
	if (formValidate.valid) {
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginFields.value),
		})
		.then(response => response.json())
		.then(data => {
			if (data) {
				if(data.status == 1) {
					const userInfo = useCookie('userInfo');
					userInfo.value = data;
					
					setTimeout(() => {
						navigateTo('/');
					}, 1000);
				} else if(data.status == 2) {
					alert('Вам заблокирован доступ к системе.');
				} else if(data.status == 3) {
					alert('Вашу регистрацию отклонили.');
				} else if(data.status == 4) {
					alert('Ожидайте подтверждение администратора.');
				}
			} else {
				alert('Неверный логин или пароль!');
			}
		})
		.catch(error => {
			console.error(error);
		}).finally(() => {
			isLoading.value = false;
		});
	}
};


const regDialog = ref(false);
const regForm = ref();
const roles = [
	{ id: 2, value: 'Студент' },
	{ id: 3, value: 'Фармацевт' }
];
const regFields = ref({
	fullname: null,
	phone: null,
	role: null,
	email: null,
	password: '',
	studentFile: null,
	pharmacistFile1: null,
	pharmacistFile2: null
});

const regFormSubmit = async () => {
	const formValidate = await regForm.value.validate();
	
	if (formValidate.valid) {
		if(+regFields.value.role == 2) {
			delete regFields.value.pharmacistFile1;
			delete regFields.value.pharmacistFile2;
		} else {
			delete regFields.value.studentFile;
		}
		fetch('/api/registrate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(regFields.value),
		})
		.then(response => response.json())
		.then(data => {
			if (data) {
				regDialog.value = false;
				alert('Вы успешно зарегистрированы! Ожидайте подтверждение администратора.');
			} else {
				alert('Пользователь с таким email уже зарегистрирован.');
			}
		})
		.catch(error => {
			console.error(error);
		}).finally(() => {
			isLoading.value = false;
		});
	}
}

watch(loginDialog, newValue => {
	if(!newValue) {
		loginForm.value.reset();
		loginForm.value.resetValidation();
	}
});

watch(regDialog, newValue => {
	if(!newValue) {
		regForm.value.reset();
		regForm.value.resetValidation();
	}
});
</script>

<style scoped lang="scss"></style>