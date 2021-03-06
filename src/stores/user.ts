import { defineStore } from 'pinia'
import storage from 'store'
import router from '@/router'
import UaParser, { IResult as UaResult } from 'ua-parser-js'
import { UserInfo, UserInfoProxy, Result } from '@/models'
import {firebaseSetUserId} from '@/commons'

export interface UserState {
  userInfo: UserInfo
  ua: UaResult
}


const defaultUserInfo = {
  id: '',
  token: '',
  name: '',
  avatar: '',
  roles: [],
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: new UserInfoProxy(defaultUserInfo),
    ua: new UaParser().getResult(),
  }),
  actions: {
    setUserInfo(payload: UserInfo) {
      this.userInfo = payload
      firebaseSetUserId('123456')
      storage.set('USER_ID', payload.id)
      storage.set('ACCESS_TOKEN', payload.token)
    },
    resetUserInfo() {
      this.userInfo = { ...defaultUserInfo }
    },
    async getUserInfo() {
      const userID = storage.get('USER_ID')
      if (!userID) {
        // 异步调用查询用户信息接口
      }
    },
    async login(payload: UserInfo) {
      // 调用登陆接口
      this.setUserInfo(payload)
      router.push({ path: '/' })
    },
    async logout() {
      // 调用退出登陆接口
      storage.clearAll()
      this.resetUserInfo()
      router.replace({ name: 'login_page' })
    },
    async verification(token: string): Promise<Result<any>> {
      // 调用 token 验证接口
      return Promise.resolve({ code: 0 })
    },
  },
})
