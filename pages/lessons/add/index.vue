<template>
	<v-btn to="/lessons" prepend-icon="mdi-arrow-left" size="small" color="primary" variant="tonal" class="mb-3">Назад</v-btn>
	
	<div class="form-wrap">
			
		<h1 class="form-title">Обучающие материалы</h1>
		<form @submit.prevent="submit">
			<v-row>
				<v-col>
					<FieldsBaseField v-model="title.value.value" label="Заголовок"
						:error-messages="title.errorMessage.value" />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<FieldsEditor v-model="content.value.value" placeholder="Содержание" />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<br><br>
					<label>Тестовый файл</label>
					<FieldsUploadFileField @onChange="testFile = $event" :accept="['.pdf']" />
					<br>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<FieldsEditor v-model="testAns.value.value" placeholder="Ответы к тесту" />
				</v-col>
			</v-row>
			<br><br><br>
			<v-btn class="submit-btn" type="submit" color="primary" variant="flat" :disabled="isLoading">Сохранить</v-btn>
		</form>

	</div>
</template>

<script setup>
const isLoading = ref(false);
const testFile = ref(null);


const { handleSubmit } = useForm({
	validationSchema: {
		title(value) {
			return value ? true : 'Обязательное поле';
		},
		content(value) {
			return value ? true : 'Обязательное поле';
		},
		testAns(value) {
			return true;
		},
	},
})
const title = useField('title')
const content = useField('content')
const testAns = useField('testAns')


const submit = handleSubmit(values => {
	const formDataToSend = {
		title: title.value.value,
		content: content.value.value,
		testAns: testAns.value.value
	};

	if (testFile.value) {
		// if (!testFile.value.isValid) {
		// 	return;
		// }

		formDataToSend['testFile'] = testFile.value.base64;
		formDataToSend['testFileName'] = testFile.value.name;
	}

	isLoading.value = true;
	fetch('/api/lessons', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formDataToSend),
	})
		.then(response => response.json())
		.then(data => {
			if (data) {
				// alert('Success!');
				navigateTo('/lessons');
			} else {
				alert('Error!');
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

.form-title {
	font-size: 24px;
	color: #222529;
	margin-bottom: 20px;
}

.form-wrap {
	padding: 30px;
	max-width: 700px;
	margin: 0 auto;
	background-color: #fff;

	[class^=v-col] {
		padding-top: 4px;
		padding-bottom: 0;
	}
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
}</style>