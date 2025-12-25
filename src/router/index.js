import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/Login.vue'
import RegisterVue from '@/views/Register.vue'
import LayoutVue from '@/views/Layout.vue'
import DashboardVue from '@/views/Dashboard.vue'
import GoodsManagementVue from '@/views/GoodsManagement.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: LoginVue },
        { path: '/register', component: RegisterVue },
        {
            path: '/',
            component: LayoutVue,
            redirect: '/dashboard',
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: DashboardVue,
                    meta: { title: '仪表板', icon: 'dashboard' }
                },
                {
                    path: '/goods-management',
                    name: 'goodsManagement',
                    component: GoodsManagementVue,
                    meta: { title: '货物管理', icon: 'goods' }
                },
                {
                    path: '/inventory-management',
                    name: 'inventoryManagement',
                    component: () => import('@/views/InventoryManagement.vue'),
                    meta: { title: '库存管理', icon: 'inventory' }
                },
                {
                    path: '/order-management',
                    name: 'orderManagement',
                    component: () => import('@/views/OrderManagement.vue'),
                    meta: { title: '订单管理', icon: 'order' }
                },
                {
                    path: '/customer-management',
                    name: 'customerManagement',
                    component: () => import('@/views/CustomerManagement.vue'),
                    meta: { title: '客户管理', icon: 'customer' }
                },
                {
                    path: '/product-management',
                    name: 'productManagement',
                    component: () => import('@/views/ProductManagement.vue'),
                    meta: { title: '产品管理', icon: 'product' }
                },
                {
                    path: '/data-report',
                    name: 'dataReport',
                    component: () => import('@/views/DataReport.vue'),
                    meta: { title: '数据报表', icon: 'report' }
                }
            ]
        }
    ]
});

export default router