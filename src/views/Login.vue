<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-logo">
        <h1>外贸货物管理平台</h1>
        <p>Foreign Trade Goods Management Platform</p>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
            @keyup.enter="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            clearable
            show-password
            @keyup.enter="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            prefix-icon="Picture"
            clearable
            @keyup.enter="handleLogin"
          >
            <template #append>
              <div class="captcha-image" @click="refreshCaptcha">
                {{ captchaCode }}
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
  ]
}

// 生成验证码
const captchaCode = ref('')
const refreshCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaCode.value = code
}

// 初始化验证码
refreshCaptcha()

// 登录方法
const handleLogin = async () => {
  try {
    // 表单验证
    await loginFormRef.value.validate()

    // 验证验证码
    if (loginForm.captcha.toUpperCase() !== captchaCode.value.toUpperCase()) {
      ElMessage.error('验证码错误')
      refreshCaptcha()
      return
    }

    loading.value = true

    // 模拟登录请求
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    // 保存用户信息到 store
    userStore.setUserInfo({ username: loginForm.username })

    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form-wrapper {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.login-logo {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo h1 {
  color: #667eea;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.login-logo p {
  color: #999;
  font-size: 14px;
}

.login-form {
  width: 100%;
}

.captcha-image {
  width: 100px;
  height: 40px;
  background-color: #f5f7fa;
  border-left: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
  user-select: none;
  border-radius: 0 4px 4px 0;
}

.captcha-image:hover {
  background-color: #e4e7ed;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 500px) {
  .login-form-wrapper {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>