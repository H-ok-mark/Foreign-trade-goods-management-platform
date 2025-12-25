<template>
    <div class="login-container">
        <div class="login-form-wrapper">
            <div class="login-logo">
                <h1>外贸货物管理平台</h1>
                <p>Foreign Trade Goods Management Platform</p>
            </div>
            <el-form
                ref="registerFormRef"
                :model="registerForm"
                :rules="registerRules"
                class="login-form"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="registerForm.username"
                        placeholder="请输入用户名"
                        prefix-icon="User"
                        clearable
                        @keyup.enter="handleRegister"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input
                        v-model="registerForm.email"
                        placeholder="请输入邮箱地址"
                        prefix-icon="Message"
                        clearable
                        @keyup.enter="handleRegister"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="registerForm.password"
                        type="password"
                        placeholder="请输入密码"
                        prefix-icon="Lock"
                        clearable
                        show-password
                        @keyup.enter="handleRegister"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input
                        v-model="registerForm.confirmPassword"
                        type="password"
                        placeholder="请再次输入密码"
                        prefix-icon="Lock"
                        clearable
                        show-password
                        @keyup.enter="handleRegister"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-input
                        v-model="registerForm.captcha"
                        placeholder="请输入验证码"
                        prefix-icon="Picture"
                        clearable
                        @keyup.enter="handleRegister"
                    >
                        <template #append>
                            <div class="captcha-image" @click="refreshCaptcha">
                                {{ captchaCode }}
                            </div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="registerForm.rememberMe">同意用户协议和隐私政策</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="login-button"
                        :loading="isLoading"
                        @click="handleRegister"
                        :disabled="!registerForm.rememberMe"
                    >
                        {{ isLoading ? '注册中...' : '立即注册' }}
                    </el-button>
                </el-form-item>
                <div class="login-footer">
                    <span>已有账户？</span>
                    <a href="#" @click.prevent="switchToLogin">立即登录</a>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Goods } from '@element-plus/icons-vue'

const router = useRouter()
const registerFormRef = ref()
const isLoading = ref(false)
const captchaCode = ref('')

// 表单数据
const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: '',
    rememberMe: false
})

// 表单验证规则
const registerRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符之间', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' },
        { pattern: /^(?=.*[a-zA-Z])(?=.*\d).*$/, message: '密码必须包含字母和数字', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== registerForm.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
    ]
})

// 生成验证码
const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

// 刷新验证码
const refreshCaptcha = () => {
    captchaCode.value = generateCaptcha()
}

// 初始化验证码
refreshCaptcha()

// 处理注册
const handleRegister = async () => {
    try {
        const valid = await registerFormRef.value.validate()
        if (!valid) return
        
        // 验证验证码
        if (registerForm.captcha.toUpperCase() !== captchaCode.value) {
            ElMessage.error('验证码错误')
            refreshCaptcha()
            return
        }
        
        isLoading.value = true
        
        // 模拟注册请求
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        ElMessage.success('注册成功！')
        
        // 模拟保存用户信息
        localStorage.setItem('username', registerForm.username)
        
        // 跳转登录页面
        setTimeout(() => {
            router.push('/login')
        }, 1000)
    } catch (error) {
        console.error('注册失败:', error)
        ElMessage.error('注册失败，请稍后重试')
    } finally {
        isLoading.value = false
    }
}

// 切换到登录页面
const switchToLogin = () => {
    router.push('/login')
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

    .login-footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #606266;
    }

    .login-footer a {
        color: #409eff;
        text-decoration: none;
        margin-left: 8px;
    }

    .login-footer a:hover {
        text-decoration: underline;
        color: #66b1ff;
    }

    /* 响应式设计 */
    @media (max-width: 500px) {
        .login-form-wrapper {
            width: 90%;
            padding: 30px 20px;
        }
    }
</style>