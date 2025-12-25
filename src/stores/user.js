import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref(null)
  const token = ref('')

  // 计算属性
  const isLoggedIn = computed(() => {
    return !!token.value
  })

  // 操作
  const setUserInfo = (userData) => {
    userInfo.value = userData
  }

  const setToken = (newToken) => {
    token.value = newToken
  }

  const login = (username, password) => {
    // 模拟登录接口调用
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockToken = 'mock-token-' + Date.now()
        setToken(mockToken)
        setUserInfo({ username })
        resolve(mockToken)
      }, 1000)
    })
  }

  const logout = () => {
    userInfo.value = null
    token.value = ''
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    setUserInfo,
    setToken,
    login,
    logout
  }
})