<template>
	<v-card class="px-4 pt-4 mb-5">
		<v-card-title class="form-title font-weight-bold mb-2">Контакты</v-card-title>
		<v-card-text>
			<p class="mb-2"><b>Разработчик:</b> Сейтжанов Жеңіс Болатұлы</p>
			<p class="mb-2"><b>Телефона:</b> 87766637112</p>
			<p class="mb-2"><b>E-mail:</b> jenis99@list.ru</p>
		</v-card-text>
	</v-card>
	<div class="form-wrap">
		<h1 class="form-title">Форма обратной связи</h1>
		<p class="form-description">
			Мы всегда готовы ответить на любой вопрос, а также услышать ваши отзывы и предложения по
			работе нашего сервиса
		</p>

		<form @submit.prevent="submit">
			<v-row>
				<v-col>
					<FieldsBaseField v-model="name.value.value" label="ФИО" :error-messages="name.errorMessage.value" />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<FieldsBaseField v-model="contact.value.value" label="Контактные данные"
					hint="Email или телефон (whatsapp, telegram)" persistent-hint
						:error-messages="contact.errorMessage.value" />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-textarea v-model="text.value.value" :error-messages="text.errorMessage.value" class="text-field"
						label="Опишите ваш вопрос" density="comfortable" variant="solo-filled" rows="4"
						validate-on="blur"></v-textarea>
				</v-col>
			</v-row>

			<v-btn class="submit-btn" type="submit" color="primary" variant="flat" :disabled="isLoading">Отправить</v-btn>
		</form>

		<v-dialog v-model="showDialog" width="400px">
			<ModalInfo @onClose="showDialog = false">
				<template #title>Спасибо за ваш вопрос</template>
				<template #body>
					Мы обязательно откликнемся на ваш вопрос в ближайшее время
				</template>
			</ModalInfo>
		</v-dialog>
	</div>
</template>

<script setup>
const isLoading = ref(false);
const showDialog = ref(false);


const { handleSubmit, handleReset } = useForm({
	validationSchema: {
		name(value) {
			return value ? true : 'Обязательное поле';
		},
		contact(value) {
			return value ? true : 'Обязательное поле';
		},
		text(value) {
			return value ? true : 'Обязательное поле';
		}
	},
})
const name = useField('name')
const contact = useField('contact')
const text = useField('text')


const submit = handleSubmit(values => {
	const formDataToSend = {
		name: name.value.value,
		contact: contact.value.value,
		text: text.value.value
	};

	isLoading.value = true;

	fetch('/api/support', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formDataToSend),
	})
		.then(response => response.json())
		.then(data => {
			if(data) {
				showDialog.value = true;
				handleReset();
			} else {
				alert('Ошибка!');
			}
			
		})
		.catch(error => {
			console.error(error);
		}).finally(() => {
			isLoading.value = false;
		});
})
</script>

<style scoped lang="scss">
$acsentColor: #1D76F9;

.form-wrap {
	padding: 30px;
	background-color: #fff;

	[class^=v-col] {
		padding-top: 8px;
		padding-bottom: 0;
	}

	a {
		color: $acsentColor;
	}
}

.form-title {
	font-size: 24px;
	color: #222529;
	margin-bottom: 2px;
}

.form-description {
	color: #5C5C5C;
	font-size: 14px;
	margin-bottom: 28px;
}

.text-field:deep() {
	.v-field {
		box-shadow: none;
		border: 1px solid #A6A6A6;

		&.v-field--active {
			border-color: $acsentColor;
		}

		.v-field__overlay {
			background-color: transparent;
		}
	}

	.v-input__details {
		padding-top: 4px;
		min-height: 18px;
	}
}



.submit-btn {
	display: block;
	width: 100%;
	height: 48px !important;
	max-width: 200px;
	text-decoration: none;
	margin: 0 auto;
	margin-top: 20px;
}
</style>