import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 接口基础URL
  timeout: 15000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    // 如果有token，添加到请求头
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 判断响应状态码
    if (res.code === 200) {
      return res.data
    } else {
      // 显示错误信息
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 3 * 1000
      })
      
      // 处理特殊错误码
      if (res.code === 401) {
        // 未登录或token过期，清除用户信息并跳转到登录页
        const userStore = useUserStore()
        userStore.logout()
        ElMessageBox.alert('登录已过期，请重新登录', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            window.location.href = '/login'
          }
        })
      }
      
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    console.error('响应拦截器错误:', error)
    
    // 处理网络错误
    if (error.message.includes('Network Error')) {
      ElMessage({
        message: '网络错误，请检查网络连接',
        type: 'error',
        duration: 3 * 1000
      })
    } else if (error.response) {
      // 服务器返回的错误
      const status = error.response.status
      const data = error.response.data
      
      switch (status) {
        case 400:
          ElMessage({ message: data.message || '请求参数错误', type: 'error' })
          break
        case 401:
          ElMessage({ message: '未授权，请重新登录', type: 'error' })
          const userStore = useUserStore()
          userStore.logout()
          window.location.href = '/login'
          break
        case 403:
          ElMessage({ message: '无权限访问该资源', type: 'error' })
          break
        case 404:
          ElMessage({ message: '请求的资源不存在', type: 'error' })
          break
        case 500:
          ElMessage({ message: '服务器内部错误', type: 'error' })
          break
        default:
          ElMessage({ message: data.message || '请求失败', type: 'error' })
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      ElMessage({ message: '请求超时，请稍后重试', type: 'error' })
    }
    
    return Promise.reject(error)
  }
)

// 请求方法封装
export const request = {
  get: (url, params = {}, config = {}) => {
    return service.get(url, { params, ...config })
  },
  
  post: (url, data = {}, config = {}) => {
    return service.post(url, data, config)
  },
  
  put: (url, data = {}, config = {}) => {
    return service.put(url, data, config)
  },
  
  delete: (url, config = {}) => {
    return service.delete(url, config)
  },
  
  patch: (url, data = {}, config = {}) => {
    return service.patch(url, data, config)
  }
}

export default service