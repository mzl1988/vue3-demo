<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Tinymce Editor</a-breadcrumb-item>
  </a-breadcrumb>
  <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
    <a-form layout="vertical" ref="formRef" :model="formState" :rules="rules">
      <a-form-item label="Version" name="version">
        <a-input-number
          v-model:value="formState.version"
          :min="1"
          :max="9999"
          placeholder="please enter version"
        />
      </a-form-item>
      <a-form-item label="Title" name="title">
        <a-input v-model:value="formState.title" placeholder="please enter title" />
      </a-form-item>
      <a-form-item label="Content" name="content">
        <editor :api-key="editorApiKey" v-model="formState.content" :init="editorInit" />
      </a-form-item>
      <div class="mt-4"></div>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-layout-content>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs } from "vue"
import Editor from '@tinymce/tinymce-vue'

const formRef = ref();

const rules = {
  version: [{ required: true, message: 'Please enter version' }],
  title: [{ required: true, message: 'Please enter title' }],
  content: [{ required: true, message: 'Please enter content' }],
};

const onSubmit = async () => {
  formRef.value
    .validate()
    .then(() => {
      console.log(data.formState);
    })
    .catch((error: any) => {
      console.log('error', error);
    });

};

const data = reactive({
  editorApiKey: 'np-api-key',// '5beb78elvpfgmebhtdx7i96luf7v6cxdb63ryf0s5h83mi1o',
  editorInit: {
    language: 'en', // "zh_CN", //语言类型
    placeholder: "please enter content", //textarea中的提示信息
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
  formState: {
    version: 1,
    title: '',
    content: '',
  },
})

const { editorApiKey, editorInit, formState } = { ...toRefs(data) }
</script>

<style  lang="less" scoped>
.ant-form-item-has-error .ant-input,
.ant-form-item-has-error .ant-input-affix-wrapper,
.ant-form-item-has-error .ant-input:hover,
.ant-form-item-has-error .ant-input-affix-wrapper:hover {
  border-color: none;
}
</style>
