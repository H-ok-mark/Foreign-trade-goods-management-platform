<template>
    <el-container class="layout-container">
        <!-- 侧边栏 -->
        <el-aside
            :width="sidebarWidth"
            class="layout-aside"
            :class="{ collapsed: isSidebarCollapsed }"
        >
            <div class="aside-logo" @click="toggleSidebar">
                <el-icon class="logo-icon">
                    <Goods></Goods>
                </el-icon>
                <span v-if="!isSidebarCollapsed" class="logo-text"
                    >外贸货物管理平台</span
                >
            </div>
            <el-menu
                router
                :default-active="currentRoute"
                :collapse="isSidebarCollapsed"
                :collapse-transition="false"
                class="layout-menu"
                text-color="#606266"
                active-text-color="#409eff"
            >
                <el-menu-item index="/dashboard">
                    <el-icon><House /></el-icon>
                    <template #title>货物总览</template>
                </el-menu-item>
                <el-menu-item index="/goods-management">
                    <el-icon><Goods /></el-icon>
                    <template #title>货物管理</template>
                </el-menu-item>
                <el-menu-item index="/inventory-management">
                    <el-icon><Grid /></el-icon>
                    <template #title>库存管理</template>
                </el-menu-item>
                <el-menu-item index="/order-management">
                    <el-icon><Tickets /></el-icon>
                    <template #title>订单管理</template>
                </el-menu-item>
                <el-menu-item index="/customer-management">
                    <el-icon><User /></el-icon>
                    <template #title>客户管理</template>
                </el-menu-item>
                <el-menu-item index="/product-management">
                    <el-icon><Collection /></el-icon>
                    <template #title>产品管理</template>
                </el-menu-item>
                <el-menu-item index="/data-report">
                    <el-icon><Document /></el-icon>
                    <template #title>数据报表</template>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <!-- 主内容区域 -->
        <el-container class="layout-main-container">
            <!-- 顶部栏 -->
            <el-header class="layout-header">
                <div class="header-left">
                    <!-- 侧边栏折叠时显示导航菜单 -->
                    <el-menu
                        v-if="isSidebarCollapsed"
                        router
                        :default-active="currentRoute"
                        class="top-nav-menu"
                        mode="horizontal"
                        @select="handleNavSelect"
                    >
                        <el-menu-item index="/dashboard">
                            <template #title>
                                <el-icon><House /></el-icon>
                                <span>货物总览</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/goods-management">
                            <template #title>
                                <el-icon><Goods /></el-icon>
                                <span>货物管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/inventory-management">
                            <template #title>
                                <el-icon><Grid /></el-icon>
                                <span>库存管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/order-management">
                            <template #title>
                                <el-icon><Tickets /></el-icon>
                                <span>订单管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/customer-management">
                            <template #title>
                                <el-icon><User /></el-icon>
                                <span>客户管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/product-management">
                            <template #title>
                                <el-icon><Collection /></el-icon>
                                <span>产品管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/data-report">
                            <template #title>
                                <el-icon><Document /></el-icon>
                                <span>数据报表</span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                    <!-- 侧边栏展开时显示面包屑导航 -->
                    <el-breadcrumb v-else class="breadcrumb" separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }"
                            >首页</el-breadcrumb-item
                        >
                        <el-breadcrumb-item>{{
                            currentRouteName
                        }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="header-right">
                    <el-dropdown trigger="click">
                        <div class="user-info">
                            <el-avatar
                                :size="32"
                                :icon="UserFilled"
                            ></el-avatar>
                            <span class="username">{{
                                userInfo?.username || '未登录'
                            }}</span>
                            <el-icon class="arrow-down"><ArrowDown /></el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>修改密码</el-dropdown-item>
                                <el-dropdown-item divided @click="handleLogout"
                                    >退出登录</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>

            <!-- 内容区域 -->
            <el-main class="layout-content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus';
    import { useUserStore } from '@/stores/user';

    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();

    // 侧边栏状态
    const isSidebarCollapsed = ref(false);
    const sidebarWidth = computed(() => {
        return isSidebarCollapsed.value ? '64px' : '200px';
    });

    // 切换侧边栏
    const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    // 当前路由
    const currentRoute = computed(() => {
        return route.path;
    });

    // 路由名称映射
    const routeNames = {
        '/dashboard': '货物总览',
        '/goods-management': '货物管理',
        '/inventory-management': '库存管理',
        '/order-management': '订单管理',
        '/customer-management': '客户管理',
        '/product-management': '产品管理',
        '/data-report': '数据报表',
    };

    // 当前路由名称
    const currentRouteName = computed(() => {
        return routeNames[route.path] || '未知页面';
    });

    // 用户信息
    const userInfo = computed(() => {
        return userStore.userInfo;
    });

    // 导航菜单选择事件
    const handleNavSelect = index => {
        router.push(index);
    };

    // 退出登录
    const handleLogout = () => {
        userStore.logout();
        ElMessage.success('退出登录成功');
        router.push('/login');
    };

    // 页面加载时检查登录状态
    onMounted(() => {
        if (!userStore.isLoggedIn) {
            router.push('/login');
        }
    });
</script>

<style scoped>
    .layout-container {
        height: 100vh;
        background-color: #f5f7fa;
        border: none;
    }

    .layout-aside {
        background-color: #304156;
        border-right: none;
        /* transition: width; */
        border: none;
    }

    .aside-logo {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 60px;
        background-color: #263445;
        color: #fff;
        cursor: pointer;
        /* transition: all 0.3s; */
        border-bottom: none;
    }

    .aside-logo:hover {
        background-color: #1e2a38;
    }

    .logo-icon {
        font-size: 24px;
        margin-right: 12px;
        color: #409eff;
    }

    .logo-text {
        font-size: 15px;
        font-weight: 600;
    }

    .layout-menu {
        border-right: none;
        background-color: #304156;
        color: #bfcbd9;
        border: none;
    }

    .el-menu-item {
        color: #bfcbd9;
        margin: 5px 0;
        border-radius: 4px;
        margin: 0 15px;
    }

    .el-menu-item:hover {
        background-color: #263445;
        color: #fff;
    }

    .el-menu-item.is-active {
        background-color: #409eff;
        color: #fff;
    }

    .layout-main-container {
        display: flex;
        flex-direction: column;
        border: none;
    }

    .layout-header {
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 10;
        border-bottom: none;
    }

    .header-left {
        display: flex;
        align-items: center;
    }

    .toggle-sidebar {
        cursor: pointer;
        font-size: 20px;
        margin-right: 20px;
        color: #666;
        transition: color 0.3s;
    }

    .toggle-sidebar:hover {
        color: #409eff;
    }

    .breadcrumb {
        font-size: 14px;
    }

    .top-nav-menu {
        border-bottom: none;
        background-color: transparent;
        border: none;
    }

    .top-nav-menu .el-menu-item {
        color: #666;
        border-bottom: 2px solid transparent;
        margin: 0;
    }

    .top-nav-menu .el-menu-item:hover {
        background-color: #f5f7fa;
        color: #409eff;
    }

    .top-nav-menu .el-menu-item.is-active {
        background-color: transparent;
        color: #409eff;
        border-bottom-color: #409eff;
    }

    .header-right {
        display: flex;
        align-items: center;
    }

    .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    .user-info:hover {
        background-color: #f5f7fa;
    }

    .username {
        margin: 0 10px;
        font-size: 14px;
        color: #666;
    }

    .arrow-down {
        font-size: 12px;
        color: #999;
    }

    .layout-content {
        padding: 20px;
        flex: 1;
        /* 移除overflow-y: auto，避免内容区域出现滚动条 */
        border: none;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .layout-aside {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
        }

        .breadcrumb {
            display: none;
        }
    }
</style>