<template>
	<v-btn to="/drugs" prepend-icon="mdi-arrow-left" size="small" color="primary" variant="tonal" class="mb-3">Назад</v-btn>
	
	<div class="form-wrap">
			
		<h1 class="form-title">Лекарственные препараты</h1>
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
					<br><br><br>
					<v-select v-model="category.value.value" :error-messages="category.errorMessage.value"
						class="text-field" label="Категория" :items="categories" density="comfortable"
						variant="solo-filled" validate-on="blur"></v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					
					<label>Обложка</label>
					<FieldsUploadFileField @onChange="thumbnailFile = $event" :accept="['.jpeg', '.jpg']" />
					<br>
				</v-col>
			</v-row>
			<br><br><br>
			<v-btn class="submit-btn" type="submit" color="primary" variant="flat" :disabled="isLoading">Сохранить</v-btn>
		</form>

	</div>
</template>

<script setup>
const categories = getCategories();

const isLoading = ref(false);
const thumbnailFile = ref(null);


const { handleSubmit } = useForm({
	validationSchema: {
		title(value) {
			return value ? true : 'Обязательное поле';
		},
		content(value) {
			return value ? true : 'Обязательное поле';
		},
		category(value) {
			return value ? true : 'Обязательное поле';
		},
	},
})
const title = useField('title')
const content = useField('content')
const category = useField('category')


const submit = handleSubmit(values => {
	const formDataToSend = {
		title: title.value.value,
		content: content.value.value,
		category: category.value.value
	};

	if (thumbnailFile.value) {
		if (!thumbnailFile.value.isValid) {
			return;
		}

		formDataToSend['thumbnailFile'] = thumbnailFile.value.base64;
	}

	isLoading.value = true;
	fetch('/api/drugs', {
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
				navigateTo('/drugs');
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