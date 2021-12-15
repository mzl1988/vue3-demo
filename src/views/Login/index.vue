<template>
  <a-form
    layout="inline"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.userId" placeholder="Username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password v-model:value="formState.password" placeholder="Password">
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formState.userId === '' || formState.password === ''"
      >Log in</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs } from 'vue'
import type { FormProps } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
interface FormState {
  userId: string;
  password: string;
}

const handleFinish: FormProps['onFinish'] = values => {
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
