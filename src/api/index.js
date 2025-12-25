import { request } from './request'

// ============================ 用户相关 API ============================

/**
 * 用户登录
 * @param {Object} data 登录参数
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @param {String} data.captcha 验证码
 */
export const login = (data) => {
  return request.post('/user/login', data)
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request.get('/user/info')
}

/**
 * 用户登出
 */
export const logout = () => {
  return request.post('/user/logout')
}

// ============================ 货物管理相关 API ============================

/**
 * 获取货物列表
 * @param {Object} params 查询参数
 * @param {Number} params.page 页码
 * @param {Number} params.pageSize 每页条数
 * @param {String} params.goodsName 货物名称
 * @param {String} params.goodsType 货物类型
 * @param {String} params.status 状态
 */
export const getGoodsList = (params) => {
  return request.get('/goods/list', { params })
}

/**
 * 获取货物详情
 * @param {String} id 货物ID
 */
export const getGoodsDetail = (id) => {
  return request.get(`/goods/detail/${id}`)
}

/**
 * 添加货物
 * @param {Object} data 货物数据
 */
export const addGoods = (data) => {
  return request.post('/goods/add', data)
}

/**
 * 编辑货物
 * @param {String} id 货物ID
 * @param {Object} data 货物数据
 */
export const updateGoods = (id, data) => {
  return request.put(`/goods/update/${id}`, data)
}

/**
 * 删除货物
 * @param {String} id 货物ID
 */
export const deleteGoods = (id) => {
  return request.delete(`/goods/delete/${id}`)
}

/**
 * 批量删除货物
 * @param {Array} ids 货物ID数组
 */
export const batchDeleteGoods = (ids) => {
  return request.delete('/goods/batch/delete', { data: ids })
}

/**
 * 导出货物数据
 * @param {Object} params 查询参数
 */
export const exportGoodsData = (params) => {
  return request.get('/goods/export', { 
    params, 
    responseType: 'blob', 
    timeout: 30000 
  })
}

/**
 * 上传货物图片
 * @param {File} file 文件对象
 */
export const uploadGoodsImage = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/goods/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// ============================ 库存管理相关 API ============================

/**
 * 获取库存列表
 * @param {Object} params 查询参数
 */
export const getInventoryList = (params) => {
  return request.get('/inventory/list', { params })
}

/**
 * 获取库存详情
 * @param {String} id 库存ID
 */
export const getInventoryDetail = (id) => {
  return request.get(`/inventory/detail/${id}`)
}

/**
 * 更新库存
 * @param {String} id 库存ID
 * @param {Object} data 库存数据
 */
export const updateInventory = (id, data) => {
  return request.put(`/inventory/update/${id}`, data)
}

/**
 * 库存预警列表
 */
export const getInventoryAlerts = () => {
  return request.get('/inventory/alerts')
}

/**
 * 库存统计
 */
export const getInventoryStatistics = () => {
  return request.get('/inventory/statistics')
}

// ============================ 订单管理相关 API ============================

/**
 * 获取订单列表
 * @param {Object} params 查询参数
 */
export const getOrderList = (params) => {
  return request.get('/order/list', { params })
}

/**
 * 获取订单详情
 * @param {String} id 订单ID
 */
export const getOrderDetail = (id) => {
  return request.get(`/order/detail/${id}`)
}

/**
 * 添加订单
 * @param {Object} data 订单数据
 */
export const addOrder = (data) => {
  return request.post('/order/add', data)
}

/**
 * 编辑订单
 * @param {String} id 订单ID
 * @param {Object} data 订单数据
 */
export const updateOrder = (id, data) => {
  return request.put(`/order/update/${id}`, data)
}

/**
 * 删除订单
 * @param {String} id 订单ID
 */
export const deleteOrder = (id) => {
  return request.delete(`/order/delete/${id}`)
}

/**
 * 导出订单数据
 * @param {Object} params 查询参数
 */
export const exportOrderData = (params) => {
  return request.get('/order/export', { 
    params, 
    responseType: 'blob', 
    timeout: 30000 
  })
}

// ============================ 客户管理相关 API ============================

/**
 * 获取客户列表
 * @param {Object} params 查询参数
 */
export const getCustomerList = (params) => {
  return request.get('/customer/list', { params })
}

/**
 * 获取客户详情
 * @param {String} id 客户ID
 */
export const getCustomerDetail = (id) => {
  return request.get(`/customer/detail/${id}`)
}

/**
 * 添加客户
 * @param {Object} data 客户数据
 */
export const addCustomer = (data) => {
  return request.post('/customer/add', data)
}

/**
 * 编辑客户
 * @param {String} id 客户ID
 * @param {Object} data 客户数据
 */
export const updateCustomer = (id, data) => {
  return request.put(`/customer/update/${id}`, data)
}

/**
 * 删除客户
 * @param {String} id 客户ID
 */
export const deleteCustomer = (id) => {
  return request.delete(`/customer/delete/${id}`)
}

/**
 * 导出客户数据
 * @param {Object} params 查询参数
 */
export const exportCustomerData = (params) => {
  return request.get('/customer/export', { 
    params, 
    responseType: 'blob', 
    timeout: 30000 
  })
}

// ============================ 产品管理相关 API ============================

/**
 * 获取产品列表
 * @param {Object} params 查询参数
 */
export const getProductList = (params) => {
  return request.get('/product/list', { params })
}

/**
 * 获取产品详情
 * @param {String} id 产品ID
 */
export const getProductDetail = (id) => {
  return request.get(`/product/detail/${id}`)
}

/**
 * 添加产品
 * @param {Object} data 产品数据
 */
export const addProduct = (data) => {
  return request.post('/product/add', data)
}

/**
 * 编辑产品
 * @param {String} id 产品ID
 * @param {Object} data 产品数据
 */
export const updateProduct = (id, data) => {
  return request.put(`/product/update/${id}`, data)
}

/**
 * 删除产品
 * @param {String} id 产品ID
 */
export const deleteProduct = (id) => {
  return request.delete(`/product/delete/${id}`)
}

/**
 * 导出产品数据
 * @param {Object} params 查询参数
 */
export const exportProductData = (params) => {
  return request.get('/product/export', { 
    params, 
    responseType: 'blob', 
    timeout: 30000 
  })
}

// ============================ 仪表板相关 API ============================

/**
 * 获取仪表板数据
 */
export const getDashboardData = () => {
  return request.get('/dashboard/data')
}

/**
 * 获取货物类型分布
 */
export const getGoodsTypeDistribution = () => {
  return request.get('/dashboard/goodsTypeDistribution')
}

/**
 * 获取库存趋势
 */
export const getInventoryTrend = () => {
  return request.get('/dashboard/inventoryTrend')
}

/**
 * 获取最新订单
 */
export const getLatestOrders = () => {
  return request.get('/dashboard/latestOrders')
}

/**
 * 获取库存预警
 */
export const getDashboardAlerts = () => {
  return request.get('/dashboard/alerts')
}

// ============================ 数据报表相关 API ============================

/**
 * 获取货物统计报表
 * @param {Object} params 查询参数
 */
export const getGoodsReport = (params) => {
  return request.get('/report/goods', { params })
}

/**
 * 获取库存统计报表
 * @param {Object} params 查询参数
 */
export const getInventoryReport = (params) => {
  return request.get('/report/inventory', { params })
}

/**
 * 获取销售报表
 * @param {Object} params 查询参数
 */
export const getSalesReport = (params) => {
  return request.get('/report/sales', { params })
}

/**
 * 获取客户报表
 * @param {Object} params 查询参数
 */
export const getCustomerReport = (params) => {
  return request.get('/report/customer', { params })
}

/**
 * 导出报表数据
 * @param {String} type 报表类型
 * @param {Object} params 查询参数
 */
export const exportReportData = (type, params) => {
  return request.get(`/report/export/${type}`, { 
    params, 
    responseType: 'blob', 
    timeout: 30000 
  })
}