<template>
    <ClientOnly>
      <QuillEditor theme="snow" :toolbar="toolbar" content-type="html" :placeholder="props.placeholder" v-model:content="editorHtml" />
    </ClientOnly>
</template>
<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const editorHtml = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})

const toolbar = [
          // [{ 'font': [] }, { 'size': [] }],
          [ 'bold', 'italic', /*'underline', 'strike',*/ 'blockquote', { 'list': 'ordered' }, { 'list': 'bullet'}, { 'align': [] }, 'link', 'image', 'video'],
          // [{ 'color': [] }, { 'background': [] }],
          // [{ 'script': 'super' }, { 'script': 'sub' }],
          // [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
          [/*, { 'indent': '-1' }, { 'indent': '+1' }*/],
        //   [ 'link', 'image', 'video' ],
          // [ 'clean' ]
    ];

</script>