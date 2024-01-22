<template>
	<div class="drop-file" @drop.prevent="handleDrop" @dragenter.prevent @dragover.prevent @click="fileUploadClicked()">
		<span class="select">Выберите файл</span> или перетащите в поле
		<div class="allowed">{{ accept.join(', ').toUpperCase() }} до 30Мб</div>
		<div v-if="fileObj">{{ fileObj.name }}</div>
		<v-icon v-if="fileObj" class="clear-btn" size="large" @click="clearFile" icon="mdi-close-circle"></v-icon>
	</div>
	<input class="file-input" ref="fileInput" type="file" :accept="accept" @change="toBase64($event?.target?.files?.[0])" />
	<div v-if="fileObj && !fileObj.isValid" class="error-message">{{ fileObj.errorMsg }}</div>
</template>

<script setup>

const props = defineProps({
	accept: Array
});

const fileInput = ref();
const fileObj = ref(null);

const emit = defineEmits(['onChange']);

const fileUploadClicked = () => {
	fileInput.value.click();
};

const clearFile = (event) => {
	event.stopPropagation();
	fileObj.value = null;
};

const handleDrop = (event) => {
	event.preventDefault();
	const _file = event.dataTransfer.files[0];
	if (_file) {
		toBase64(_file);
	}
};

const toBase64 = (_file) => {
	if (_file) {
		const reader = new FileReader();
		reader.readAsDataURL(_file);
		reader.onload = () => {
			let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
			if (encoded.length % 4 > 0) {
				encoded += "=".repeat(4 - (encoded.length % 4));
			}
			
			fileObj.value = _file;
			fileObj.value['base64'] = encoded;

			
			const fileName = _file.name.toLowerCase();
			const isValidExtension = props.accept.some(extension => fileName.endsWith(extension));

			const isValidSize = _file.size <= 30 * 1024 * 1024;

			fileObj.value['isValid'] = isValidExtension && isValidSize;

			if (!isValidExtension) {
				fileObj.value['errorMsg'] = 'Недопустимый формат';
			}

			if (!isValidSize) {
				fileObj.value['errorMsg'] = 'Максимальный размер файла до 5Мб';
			}


			emit('onChange', fileObj.value);
		};
	} else {
		fileObj.value = null;
		emit('onChange', fileObj.value);
	}
}
</script>

<style scoped lang="scss">
.drop-file {
	border: 1px dashed #1D76F9;
	text-align: center;
	border-radius: 5px;
	color: #5C5C5C;
	font-size: 12px;
	padding: 10px;
	cursor: pointer;
	position: relative;

	&:hover {
		border-color: #000;
	}

	.select {
		color: #1D76F9;
	}

	.allowed {
		color: #A6A6A6;
	}
	.clear-btn {
		position: absolute;
		top: 30px;
    	right: 16px;
	}
}

.error-message {
	color: rgb(176,0,32);
	font-size: 12px;
	padding-top: 4px;
	padding-left: 16px;
}

.file-input {
	display: none;
}
</style>