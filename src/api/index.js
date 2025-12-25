// 模拟数据模块，用于在无后端服务器时提供数据支持

// ============================ 用户相关 API ============================

/**
 * 用户登录
 * @param {Object} data 登录参数
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @param {String} data.captcha 验证码
 */
export const login = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock_token_' + Date.now(), username: data.username })
    }, 1000)
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        username: 'admin',
        name: '管理员',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        roles: ['admin'],
        permissions: ['*:*:*']
      })
    }, 800)
  })
}

/**
 * 用户登出
 */
export const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
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
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = Array.from({ length: params.pageSize || 10 }, (_, index) => ({
        id: index + 1 + (params.page - 1) * (params.pageSize || 10),
        goodsName: `货物名称${index + 1}`,
        goodsType: ['电子产品', '服装鞋帽', '食品饮料', '五金工具'][Math.floor(Math.random() * 4)],
        quantity: Math.floor(Math.random() * 1000) + 1,
        unit: '件',
        price: parseFloat((Math.random() * 1000).toFixed(2)),
        totalAmount: parseFloat((Math.random() * 10000).toFixed(2)),
        status: ['库存中', '已出库', '已发货', '已收货'][Math.floor(Math.random() * 4)],
        warehouse: `仓库${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}`,
        createTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        updateTime: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
      }))

      resolve({
        list: mockData,
        total: 50,
        page: params.page,
        pageSize: params.pageSize || 10
      })
    }, 800)
  })
}

/**
 * 获取货物详情
 * @param {String} id 货物ID
 */
export const getGoodsDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: parseInt(id),
        goodsName: `货物名称${id}`,
        goodsType: '电子产品',
        quantity: Math.floor(Math.random() * 1000) + 1,
        unit: '件',
        price: parseFloat((Math.random() * 1000).toFixed(2)),
        totalAmount: parseFloat((Math.random() * 10000).toFixed(2)),
        status: '库存中',
        warehouse: '仓库A',
        description: '这是一个详细的货物描述信息',
        specifications: '规格参数：100x200x300mm',
        images: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c725bc9.jpg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c725bc9.jpg'],
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      })
    }, 600)
  })
}

/**
 * 添加货物
 * @param {Object} data 货物数据
 */
export const addGoods = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...data })
    }, 1000)
  })
}

/**
 * 编辑货物
 * @param {String} id 货物ID
 * @param {Object} data 货物数据
 */
export const updateGoods = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: parseInt(id), ...data })
    }, 800)
  })
}

/**
 * 删除货物
 * @param {String} id 货物ID
 */
export const deleteGoods = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

/**
 * 批量删除货物
 * @param {Array} ids 货物ID数组
 */
export const batchDeleteGoods = (ids) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, deletedCount: ids.length })
    }, 800)
  })
}

/**
 * 导出货物数据
 * @param {Object} params 查询参数
 */
export const exportGoodsData = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blob = new Blob(['mock data content'], { type: 'application/vnd.ms-excel' })
      resolve(blob)
    }, 1500)
  })
}

/**
 * 上传货物图片
 * @param {File} file 文件对象
 */
export const uploadGoodsImage = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c725bc9.jpg' })
    }, 1000)
  })
}

// ============================ 库存管理相关 API ============================

/**
 * 获取库存列表
 * @param {Object} params 查询参数
 */
export const getInventoryList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = Array.from({ length: params.pageSize || 10 }, (_, index) => ({
        id: index + 1 + (params.page - 1) * (params.pageSize || 10),
        goodsName: `库存货物${index + 1}`,
        goodsType: ['电子产品', '服装鞋帽', '食品饮料', '五金工具'][Math.floor(Math.random() * 4)],
        currentQuantity: Math.floor(Math.random() * 1000) + 1,
        minQuantity: Math.floor(Math.random() * 100),
        maxQuantity: Math.floor(Math.random() * 2000) + 1000,
        warehouse: `仓库${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}`,
        location: `A${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100)}`,
        status: ['正常', '预警', '缺货'][Math.floor(Math.random() * 3)],
        lastUpdateTime: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
      }))

      resolve({
        list: mockData,
        total: 40,
        page: params.page,
        pageSize: params.pageSize || 10
      })
    }, 700)
  })
}

/**
 * 获取库存详情
 * @param {String} id 库存ID
 */
export const getInventoryDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: parseInt(id),
        goodsName: `库存货物${id}`,
        goodsType: '电子产品',
        currentQuantity: Math.floor(Math.random() * 1000) + 1,
        minQuantity: Math.floor(Math.random() * 100),
        maxQuantity: Math.floor(Math.random() * 2000) + 1000,
        warehouse: '仓库A',
        location: `A${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100)}`,
        status: '正常',
        description: '这是一个详细的库存描述信息',
        specifications: '规格参数：100x200x300mm',
        lastUpdateTime: new Date().toISOString()
      })
    }, 500)
  })
}

/**
 * 更新库存
 * @param {String} id 库存ID
 * @param {Object} data 库存数据
 */
export const updateInventory = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: parseInt(id), ...data })
    }, 800)
  })
}

/**
 * 库存预警列表
 */
export const getInventoryAlerts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        goodsName: `预警货物${index + 1}`,
        currentQuantity: Math.floor(Math.random() * 50),
        minQuantity: 100,
        warehouse: '仓库B',
        alertTime: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
      })))
    }, 600)
  })
}

/**
 * 库存统计
 */
export const getInventoryStatistics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalGoodsCount: 258,
        totalQuantity: 15890,
        alertCount: 12,
        outOfStockCount: 3,
        warehouseCount: 4,
        goodsTypeCount: 8
      })
    }, 500)
  })
}

// ============================ 订单管理相关 API ============================

/**
 * 获取订单列表
 * @param {Object} params 查询参数
 */
export const getOrderList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = Array.from({ length: params.pageSize || 10 }, (_, index) => ({
        id: `ORD${Date.now()}${index}`,
        orderNo: `ORD${Date.now()}${index}`,
        customerName: `客户${index + 1}`,
        goodsName: `货物${index + 1}`,
        quantity: Math.floor(Math.random() * 100) + 1,
        totalAmount: parseFloat((Math.random() * 10000).toFixed(2)),
        status: ['待支付', '已支付', '已发货', '已收货', '已完成'][Math.floor(Math.random() * 5)],
        createTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        updateTime: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
      }))

      resolve({
        list: mockData,
        total: 60,
        page: params.page,
        pageSize: params.pageSize || 10
      })
    }, 900)
  })
}

/**
 * 获取订单详情
 * @param {String} id 订单ID
 */
export const getOrderDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        orderNo: id,
        customerName: '客户名称',
        goodsName: '货物名称',
        quantity: Math.floor(Math.random() * 100) + 1,
        totalAmount: parseFloat((Math.random() * 10000).toFixed(2)),
        status: '已支付',
        paymentMethod: '支付宝',
        shippingAddress: '北京市朝阳区xxx街道xxx号',
        customerPhone: '13800138000',
        notes: '这是一个详细的订单描述信息',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      })
    }, 600)
  })
}

/**
 * 添加订单
 * @param {Object} data 订单数据
 */
export const addOrder = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: `ORD${Date.now()}`, ...data })
    }, 1000)
  })
}

/**
 * 编辑订单
 * @param {String} id 订单ID
 * @param {Object} data 订单数据
 */
export const updateOrder = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, ...data })
    }, 800)
  })
}

/**
 * 删除订单
 * @param {String} id 订单ID
 */
export const deleteOrder = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

/**
 * 导出订单数据
 * @param {Object} params 查询参数
 */
export const exportOrderData = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blob = new Blob(['mock data content'], { type: 'application/vnd.ms-excel' })
      resolve(blob)
    }, 1500)
  })
}

// ============================ 客户管理相关 API ============================

/**
 * 获取客户列表
 * @param {Object} params 查询参数
 */
export const getCustomerList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = Array.from({ length: params.pageSize || 10 }, (_, index) => ({
        id: index + 1 + (params.page - 1) * (params.pageSize || 10),
        customerName: `客户名称${index + 1}`,
        contactPerson: `联系人${index + 1}`,
        contactPhone: '13800138000',
        email: `customer${index + 1}@example.com`,
        address: '北京市朝阳区xxx街道xxx号',
        customerType: ['国内客户', '国外客户'][Math.floor(Math.random() * 2)],
        status: ['正常', '冻结'][Math.floor(Math.random() * 2)],
        createTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        updateTime: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
      }))

      resolve({
        list: mockData,
        total: 35,
        page: params.page,
        pageSize: params.pageSize || 10
      })
    }, 700)
  })
}

/**
 * 获取客户详情
 * @param {String} id 客户ID
 */
export const getCustomerDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: parseInt(id),
        customerName: `客户名称${id}`,
        contactPerson: `联系人${id}`,
        contactPhone: '13800138000',
        email: `customer${id}@example.com`,
        address: '北京市朝阳区xxx街道xxx号',
        customerType: '国内客户',
        status: '正常',
        description: '这是一个详细的客户描述信息',
        remarks: '客户备注信息',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      })
    }, 500)
  })
}

/**
 * 添加客户
 * @param {Object} data 客户数据
 */
export const addCustomer = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...data })
    }, 1000)
  })
}

/**
 * 编辑客户
 * @param {String} id 客户ID
 * @param {Object} data 客户数据
 */
export const updateCustomer = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: parseInt(id), ...data })
    }, 800)
  })
}

/**
 * 删除客户
 * @param {String} id 客户ID
 */
export const deleteCustomer = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

/**
 * 导出客户数据
 * @param {Object} params 查询参数
 */
export const exportCustomerData = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blob = new Blob(['mock data content'], { type: 'application/vnd.ms-excel' })
      resolve(blob)
    }, 1500)
  })
}

// ============================ 产品管理相关 API ============================

/**
 * 获取产品列表
 * @param {Object} params 查询参数
 */
export const getProductList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = Array.from({ length: params.pageSize || 10 }, (_, index) => ({
        id: index + 1 + (params.page - 1) * (params.pageSize || 10),
        productName: `产品名称${index + 1}`,
        productCode: `P${Date.now()}${index}`,
        productType: ['电子产品', '服装鞋帽', '食品饮料', '五金工具'][Math.floor(Math.random() * 4)],
        price: parseFloat((Math.random() * 1000).toFixed(2)),
        unit: '件',
        status: ['正常', '下架'][Math.floor(Math.random() * 2)],
        stockQuantity: Math.floor(Math.random() * 1000) + 1,
        createTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        updateTime: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
      }))

      resolve({
        list: mockData,
        total: 45,
        page: params.page,
        pageSize: params.pageSize || 10
      })
    }, 800)
  })
}

/**
 * 获取产品详情
 * @param {String} id 产品ID
 */
export const getProductDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: parseInt(id),
        productName: `产品名称${id}`,
        productCode: `P${Date.now()}${id}`,
        productType: '电子产品',
        price: parseFloat((Math.random() * 1000).toFixed(2)),
        unit: '件',
        status: '正常',
        stockQuantity: Math.floor(Math.random() * 1000) + 1,
        description: '这是一个详细的产品描述信息',
        specifications: '规格参数：100x200x300mm',
        images: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c725bc9.jpg'],
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      })
    }, 600)
  })
}

/**
 * 添加产品
 * @param {Object} data 产品数据
 */
export const addProduct = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...data })
    }, 1000)
  })
}

/**
 * 编辑产品
 * @param {String} id 产品ID
 * @param {Object} data 产品数据
 */
export const updateProduct = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: parseInt(id), ...data })
    }, 800)
  })
}

/**
 * 删除产品
 * @param {String} id 产品ID
 */
export const deleteProduct = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

/**
 * 导出产品数据
 * @param {Object} params 查询参数
 */
export const exportProductData = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blob = new Blob(['mock data content'], { type: 'application/vnd.ms-excel' })
      resolve(blob)
    }, 1500)
  })
}

// ============================ 仪表板相关 API ============================

/**
 * 获取仪表板数据
 */
export const getDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalGoodsCount: 258,
        totalInventory: 15890,
        totalOrders: 1234,
        totalCustomers: 567,
        todayOrders: 23,
        todayRevenue: 89500,
        inventoryAlerts: 12,
        outOfStockCount: 3
      })
    }, 600)
  })
}

/**
 * 获取货物类型分布
 */
export const getGoodsTypeDistribution = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: '电子产品', value: 85 },
        { name: '服装鞋帽', value: 68 },
        { name: '食品饮料', value: 55 },
        { name: '五金工具', value: 50 }
      ])
    }, 500)
  })
}

/**
 * 获取库存趋势
 */
export const getInventoryTrend = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 12 }, (_, index) => ({
        month: `${index + 1}月`,
        quantity: Math.floor(Math.random() * 5000) + 10000
      })))
    }, 700)
  })
}

/**
 * 获取最新订单
 */
export const getLatestOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 5 }, (_, index) => ({
        id: `ORD${Date.now()}${index}`,
        orderNo: `ORD${Date.now()}${index}`,
        customerName: `客户${index + 1}`,
        totalAmount: parseFloat((Math.random() * 10000).toFixed(2)),
        status: ['待支付', '已支付', '已发货', '已收货'][Math.floor(Math.random() * 4)],
        createTime: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
      })))
    }, 500)
  })
}

/**
 * 获取库存预警
 */
export const getDashboardAlerts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 3 }, (_, index) => ({
        id: index + 1,
        goodsName: `预警货物${index + 1}`,
        currentQuantity: Math.floor(Math.random() * 50),
        minQuantity: 100,
        warehouse: '仓库B',
        alertTime: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
      })))
    }, 600)
  })
}

// ============================ 数据报表相关 API ============================

/**
 * 获取货物统计报表
 * @param {Object} params 查询参数
 */
export const getGoodsReport = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 6 }, (_, index) => ({
        date: `2023-${String(index + 7).padStart(2, '0')}-01`,
        count: Math.floor(Math.random() * 50) + 20,
        quantity: Math.floor(Math.random() * 500) + 100
      })))
    }, 700)
  })
}

/**
 * 获取库存统计报表
 * @param {Object} params 查询参数
 */
export const getInventoryReport = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 6 }, (_, index) => ({
        date: `2023-${String(index + 7).padStart(2, '0')}-01`,
        quantity: Math.floor(Math.random() * 1000) + 5000,
        value: parseFloat((Math.random() * 100000).toFixed(2))
      })))
    }, 700)
  })
}

/**
 * 获取销售报表
 * @param {Object} params 查询参数
 */
export const getSalesReport = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 6 }, (_, index) => ({
        date: `2023-${String(index + 7).padStart(2, '0')}-01`,
        orders: Math.floor(Math.random() * 50) + 20,
        revenue: parseFloat((Math.random() * 100000).toFixed(2))
      })))
    }, 700)
  })
}

/**
 * 获取客户报表
 * @param {Object} params 查询参数
 */
export const getCustomerReport = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 6 }, (_, index) => ({
        date: `2023-${String(index + 7).padStart(2, '0')}-01`,
        customers: Math.floor(Math.random() * 20) + 10,
        orders: Math.floor(Math.random() * 30) + 15
      })))
    }, 700)
  })
}

/**
 * 导出报表数据
 * @param {String} type 报表类型
 * @param {Object} params 查询参数
 */
export const exportReportData = (type, params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blob = new Blob(['mock report data content'], { type: 'application/vnd.ms-excel' })
      resolve(blob)
    }, 1500)
  })
}