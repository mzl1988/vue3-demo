<template>
  <div class="login-container">
    <a-form
      class="form"
      layout="vertical"
      ref="formRef"
      :model="formState"
      :rules="rules"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <div class="flex justify-center items-center mb-8">
        <img src="@/assets/images/logo.png" :style="{ width: '45px' }" />
        <span class="ml-3 text-4xl">VUE3</span>
      </div>
      <a-form-item name="userId">
        <a-input v-model:value="formState.userId" placeholder="Username" size="large">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.85)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="formState.password" placeholder="Password" size="large">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.85)" />
          </template>
        </a-input-password>
      </a-form-item>
      <div class="mt-8"></div>
      <a-form-item>
        <a-button block size="large" type="primary" html-type="submit">Log in</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref, toRefs } from 'vue'
import type { FormProps } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import { firebaseLogEvent } from '@/commons'

const userStore = useUserStore()

const formRef = ref();

const rules = {
  userId: [{ required: true, message: 'Please enter username' }],
  password: [{ required: true, message: 'Please enter password' }],
};

interface FormState {
  userId: string;
  password: string;
}

const handleFinish: FormProps['onFinish'] = values => {
  firebaseLogEvent('btn_login')
  userStore.login({
    id: formState.userId,
    token: '123456',
    name: '',
    avatar: '',
    roles: [],
  })
}

const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
  // console.log(errors);
}

const formState: FormState = reactive({
  userId: '',
  password: '',
})

const { userId, password } = { ...toRefs(formState) }
</script>
<style lang="less" scoped>
.login-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.form {
  padding: 24px 24px;
  width: 330px;
}
</style>