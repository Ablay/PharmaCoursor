<template>
	<v-card>
		<v-card-title class="d-flex">
			<slot name="title"></slot>
			<v-spacer></v-spacer>
			<v-btn density="comfortable" variant="text" icon="mdi-close" size="small" @click="emit('onClose')">
			</v-btn>
		</v-card-title>
		<v-card-text>
			<slot name="body"></slot>
		</v-card-text>
	</v-card>
</template>

<script setup>
const emit = defineEmits(['onClose']);

</script>