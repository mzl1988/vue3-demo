<template>
  <h1>Tinymce Editor</h1>
  <a-button type="primary" @click="test">Log Html</a-button>
  <editor :api-key="editorApiKey" v-model="editorContent" :init="editorInit" />
</template>
<script lang="ts" setup>

import { onMounted, reactive, toRefs } from "vue"
import Editor from '@tinymce/tinymce-vue'

const test = () => {
  console.log(data.editorContent);

}
const data = reactive({
  editorApiKey: '5beb78elvpfgmebhtdx7i96luf7v6cxdb63ryf0s5h83mi1o',
  editorInit: {
    language: "zh_CN", //语言类型
    placeholder: "在这里输入文字", //textarea中的提示信息
    min_height: 500,
    resize: true,//编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    paste_data_images: true, //图片是否可粘贴
    branding: false, //tiny技术支持信息是否显示
    // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
    // elementpath: false, //元素路径是否显示
    plugins:
      "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons", //插件配置 axupimgs indent2em
    toolbar: [
      "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ",
      "styleselect formatselect fontselect fontsizeselect |  table image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print preview | indent2em lineheight formatpainter",
    ]
  },
  editorContent: '<p>Content of the editor.</p>',
})

const { editorApiKey, editorInit, editorContent } = { ...toRefs(data) }
</script>
