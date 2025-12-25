<template>
    <div class="dashboard-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2>货物总览</h2>
            <p>实时监控货物管理平台的关键数据和指标</p>
        </div>

        <!-- 统计卡片 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-content">
                        <div class="card-icon goods-icon">
                            <el-icon><Goods /></el-icon>
                        </div>
                        <div class="card-info">
                            <div class="card-value">{{ totalGoods }}</div>
                            <div class="card-label">总货物数量</div>
                        </div>
                        <!-- <el-icon class="card-arrow">
                            <ArrowUp
                                v-if="goodsTrend === 'up'"
                                class="text-success"
                            ></ArrowUp>
                            <ArrowDown
                                v-else-if="goodsTrend === 'down'"
                                class="text-danger"
                            ></ArrowDown>
                        </el-icon> -->
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-content">
                        <div class="card-icon inventory-icon">
                            <el-icon><Grid /></el-icon>
                        </div>
                        <div class="card-info">
                            <div class="card-value">{{ totalInventory }}</div>
                            <div class="card-label">总库存</div>
                        </div>
                        <el-icon class="card-arrow">
                            <!-- <ArrowUp v-if="inventoryTrend === 'up'" class="text-success"></ArrowUp> -->
                            <!-- <ArrowDown v-else-if="inventoryTrend === 'down'" class="text-danger"></ArrowDown> -->
                        </el-icon>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-content">
                        <div class="card-icon order-icon">
                            <el-icon><Tickets /></el-icon>
                        </div>
                        <div class="card-info">
                            <div class="card-value">{{ totalOrders }}</div>
                            <div class="card-label">总订单数</div>
                        </div>
                        <!-- <el-icon class="card-arrow">
                            <ArrowUp
                                v-if="orderTrend === 'up'"
                                class="text-success"
                            ></ArrowUp>
                            <ArrowDown
                                v-else-if="orderTrend === 'down'"
                                class="text-danger"
                            ></ArrowDown>
                        </el-icon> -->
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="stats-card" shadow="hover">
                    <div class="card-content">
                        <div class="card-icon customer-icon">
                            <el-icon><User /></el-icon>
                        </div>
                        <div class="card-info">
                            <div class="card-value">{{ totalCustomers }}</div>
                            <div class="card-label">总客户数</div>
                        </div>
                        <!-- <el-icon class="card-arrow">
                            <ArrowUp
                                v-if="customerTrend === 'up'"
                                class="text-success"
                            ></ArrowUp>
                            <ArrowDown
                                v-else-if="customerTrend === 'down'"
                                class="text-danger"
                            ></ArrowDown>
                        </el-icon> -->
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 图表区域 -->
        <el-row :gutter="20" class="chart-row">
            <!-- 货物类型分布 -->
            <el-col :span="12">
                <el-card class="chart-card">
                    <template #header>
                        <div class="card-header">
                            <span>货物类型分布</span>
                            <el-select
                                v-model="timeRange"
                                size="small"
                                style="width: 120px"
                            >
                                <el-option
                                    label="本周"
                                    value="week"
                                ></el-option>
                                <el-option
                                    label="本月"
                                    value="month"
                                ></el-option>
                                <el-option
                                    label="本年"
                                    value="year"
                                ></el-option>
                            </el-select>
                        </div>
                    </template>
                    <div ref="goodsTypeChartRef" class="chart-container"></div>
                </el-card>
            </el-col>

            <!-- 库存趋势 -->
            <el-col :span="12">
                <el-card class="chart-card">
                    <template #header>
                        <div class="card-header">
                            <span>库存趋势</span>
                            <el-select
                                v-model="timeRange"
                                size="small"
                                style="width: 120px"
                            >
                                <el-option
                                    label="本周"
                                    value="week"
                                ></el-option>
                                <el-option
                                    label="本月"
                                    value="month"
                                ></el-option>
                                <el-option
                                    label="本年"
                                    value="year"
                                ></el-option>
                            </el-select>
                        </div>
                    </template>
                    <div
                        ref="inventoryTrendChartRef"
                        class="chart-container"
                    ></div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 表格区域 -->
        <el-row :gutter="20" class="table-row">
            <!-- 最新订单 -->
            <el-col :span="12">
                <el-card class="table-card">
                    <template #header>
                        <div class="card-header">
                            <span>最新订单</span>
                            <el-button type="text" size="small"
                                >查看全部</el-button
                            >
                        </div>
                    </template>
                    <div class="table-container">
                        <el-table :data="latestOrders" style="width: 100%">
                            <el-table-column
                                prop="orderNumber"
                                label="订单号"
                                width="120"
                            ></el-table-column>
                            <el-table-column
                                prop="customerName"
                                label="客户名称"
                            ></el-table-column>
                            <el-table-column
                                prop="goodsName"
                                label="货物名称"
                                width="100"
                            ></el-table-column>
                            <el-table-column
                                prop="totalAmount"
                                label="总金额"
                                width="80"
                            >
                                <template #default="scope">
                                    <span class="text-success"
                                        >¥{{ scope.row.totalAmount }}</span
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="80"
                            >
                                <template #default="scope">
                                    <el-tag
                                        :type="getStatusType(scope.row.status)"
                                        >{{ scope.row.status }}</el-tag
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>

            <!-- 库存预警 -->
            <el-col :span="12">
                <el-card class="table-card">
                    <template #header>
                        <div class="card-header">
                            <span>库存预警</span>
                            <el-button type="text" size="small"
                                >查看全部</el-button
                            >
                        </div>
                    </template>
                    <div class="table-container">
                        <el-table :data="inventoryWarnings" style="width: 100%">
                            <el-table-column
                                prop="goodsName"
                                label="货物名称"
                            ></el-table-column>
                            <el-table-column
                                prop="inventoryNumber"
                                label="库存数量"
                                width="100"
                            ></el-table-column>
                            <el-table-column
                                prop="minInventory"
                                label="最低库存"
                                width="100"
                            ></el-table-column>
                            <el-table-column
                                prop="difference"
                                label="差值"
                                width="80"
                            >
                                <template #default="scope">
                                    <span class="text-danger">{{
                                        scope.row.difference
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80">
                                <template #default="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="handleReplenish(scope.row)"
                                    >
                                        补货
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue';
    import * as echarts from 'echarts';
    import {
        ArrowUp,
        ArrowDown,
        Goods,
        Grid,
        Tickets,
        User,
    } from '@element-plus/icons-vue';

    // 统计数据
    const totalGoods = ref(1250);
    const totalInventory = ref(890);
    const totalOrders = ref(234);
    const totalCustomers = ref(156);

    // 趋势数据
    const goodsTrend = ref('up');
    const inventoryTrend = ref('down');
    const orderTrend = ref('up');
    const customerTrend = ref('up');

    // 时间范围
    const timeRange = ref('week');

    // 最新订单数据
    const latestOrders = ref([
        {
            orderNumber: 'ORD2024001',
            customerName: 'ABC贸易公司',
            goodsName: '电子产品',
            totalAmount: 12500,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024002',
            customerName: 'XYZ进出口公司',
            goodsName: '服装',
            totalAmount: 8900,
            status: '待发货',
        },
        {
            orderNumber: 'ORD2024003',
            customerName: 'DEF贸易公司',
            goodsName: '食品',
            totalAmount: 5600,
            status: '已发货',
        },
        {
            orderNumber: 'ORD2024004',
            customerName: 'GHI进出口公司',
            goodsName: '电子产品',
            totalAmount: 15800,
            status: '待发货',
        },
        {
            orderNumber: 'ORD2024005',
            customerName: 'JKL贸易公司',
            goodsName: '家具',
            totalAmount: 23400,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024006',
            customerName: 'LMN贸易公司',
            goodsName: '其他',
            totalAmount: 3400,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024007',
            customerName: 'OPQ贸易公司',
            goodsName: '其他',
            totalAmount: 4500,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024008',
            customerName: 'RST贸易公司',
            goodsName: '其他',
            totalAmount: 5600,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024009',
            customerName: 'UVW贸易公司',
            goodsName: '其他',
            totalAmount: 6700,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024010',
            customerName: 'XYZ进出口公司',
            goodsName: '其他',
            totalAmount: 7800,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024011',
            customerName: 'WXY进出口公司',
            goodsName: '其他',
            totalAmount: 8900,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024012',
            customerName: 'UVW贸易公司',
            goodsName: '其他',
            totalAmount: 9000,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024013',
            customerName: 'XYZ进出口公司',
            goodsName: '其他',
            totalAmount: 10000,
            status: '已完成',
        },
        {
            orderNumber: 'ORD2024014',
            customerName: 'WXY进出口公司',
            goodsName: '其他',
            totalAmount: 11000,
            status: '已完成',
        },
    ]);

    // 库存预警数据
    const inventoryWarnings = ref([
        {
            goodsName: '电子产品A',
            inventoryNumber: 5,
            minInventory: 20,
            difference: -15,
        },
        {
            goodsName: '服装B',
            inventoryNumber: 10,
            minInventory: 30,
            difference: -20,
        },
        {
            goodsName: '食品C',
            inventoryNumber: 8,
            minInventory: 25,
            difference: -17,
        },
        {
            goodsName: '家具D',
            inventoryNumber: 3,
            minInventory: 15,
            difference: -12,
        },
        {
            goodsName: '电子产品E',
            inventoryNumber: 12,
            minInventory: 35,
            difference: -23,
        },
        {
            goodsName: '电子产品A',
            inventoryNumber: 5,
            minInventory: 20,
            difference: -15,
        },
        {
            goodsName: '服装B',
            inventoryNumber: 10,
            minInventory: 30,
            difference: -20,
        },
        {
            goodsName: '食品C',
            inventoryNumber: 8,
            minInventory: 25,
            difference: -17,
        },
        {
            goodsName: '家具D',
            inventoryNumber: 3,
            minInventory: 15,
            difference: -12,
        },
        {
            goodsName: '电子产品E',
            inventoryNumber: 12,
            minInventory: 35,
            difference: -23,
        },
    ]);

    // 图表引用
    const goodsTypeChartRef = ref(null);
    const inventoryTrendChartRef = ref(null);

    // 货物类型分布图表数据
    const goodsTypeData = {
        week: {
            categories: ['电子产品', '服装', '食品', '家具', '其他'],
            values: [280, 210, 180, 150, 80],
        },
        month: {
            categories: ['电子产品', '服装', '食品', '家具', '其他'],
            values: [1250, 980, 850, 720, 350],
        },
        year: {
            categories: ['电子产品', '服装', '食品', '家具', '其他'],
            values: [14800, 11200, 9800, 8500, 4200],
        },
    };

    // 库存趋势图表数据
    const inventoryTrendData = {
        week: {
            categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            values: [850, 860, 840, 870, 880, 890, 890],
        },
        month: {
            categories: ['1日', '7日', '14日', '21日', '28日'],
            values: [800, 820, 850, 870, 890],
        },
        year: {
            categories: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ],
            values: [750, 780, 800, 820, 840, 860, 850, 870, 880, 890, 885, 890],
        },
    };

    // 初始化货物类型分布图表
    const initGoodsTypeChart = () => {
        const chart = echarts.init(goodsTypeChartRef.value);
        const data = goodsTypeData[timeRange.value];
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            legend: {
                bottom: 10,
                left: 'center',
            },
            series: [
                {
                    name: '货物类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: data.categories.map((category, index) => {
                        return { value: data.values[index], name: category };
                    }),
                },
            ],
        };
        chart.setOption(option);
        return chart;
    };

    // 初始化库存趋势图表
    const initInventoryTrendChart = () => {
        const chart = echarts.init(inventoryTrendChartRef.value);
        const data = inventoryTrendData[timeRange.value];
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
                },
            },
            legend: {
                data: ['库存数量'],
                bottom: 10,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.categories,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '库存数量',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 2,
                    },
                    areaStyle: {
                        opacity: 0.3,
                    },
                    data: data.values,
                },
            ],
        };
        chart.setOption(option);
        return chart;
    };

    // 图表实例
    let goodsTypeChart = null;
    let inventoryTrendChart = null;

    // 初始化图表
    const initCharts = () => {
        nextTick(() => {
            goodsTypeChart = initGoodsTypeChart();
            inventoryTrendChart = initInventoryTrendChart();
        });
    };

    // 响应窗口大小变化
    const handleResize = () => {
        if (goodsTypeChart) {
            goodsTypeChart.resize();
        }
        if (inventoryTrendChart) {
            inventoryTrendChart.resize();
        }
    };

    // 更新图表数据
    const updateCharts = () => {
        if (goodsTypeChart) {
            goodsTypeChart.dispose();
        }
        if (inventoryTrendChart) {
            inventoryTrendChart.dispose();
        }
        initCharts();
    };

    // 监听时间范围变化
    watch(
        () => timeRange.value,
        () => {
            updateCharts();
        }
    );

    // 获取状态类型
    const getStatusType = status => {
        const typeMap = {
            待发货: 'warning',
            已发货: 'info',
            已完成: 'success',
            已取消: 'danger',
        };
        return typeMap[status] || 'default';
    };

    // 处理补货
    const handleReplenish = row => {
        console.log('补货:', row);
    };

    // 页面加载
    onMounted(() => {
        initCharts();
        window.addEventListener('resize', handleResize);
    });

    // 页面卸载
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        if (goodsTypeChart) {
            goodsTypeChart.dispose();
        }
        if (inventoryTrendChart) {
            inventoryTrendChart.dispose();
        }
    });
</script>

<style scoped>
    .dashboard-container {
        padding: 10px;
    }

    .page-header {
        margin-bottom: 20px;
    }

    .page-header h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #333;
    }

    .page-header p {
        margin: 5px 0 0;
        font-size: 14px;
        color: #999;
    }

    .stats-card {
        margin-bottom: 20px;
    }

    .card-content {
        display: flex;
        align-items: center;
    }

    .card-icon {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-right: 15px;
        color: #fff;
    }

    .goods-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .inventory-icon {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .order-icon {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .customer-icon {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    .card-info {
        flex: 1;
    }

    .card-value {
        font-size: 24px;
        font-weight: 700;
        color: #333;
    }

    .card-label {
        font-size: 14px;
        color: #999;
        margin-top: 5px;
    }

    .card-arrow {
        font-size: 18px;
    }

    .card-arrow .text-success {
        color: #67c23a;
    }

    .card-arrow .text-danger {
        color: #f56c6c;
    }

    .chart-row {
        margin-bottom: 20px;
    }

    .chart-card {
        height: auto;
        min-height: 300px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 50px;
    }

    .chart-container {
        width: 100%;
        height: calc(100% - 70px);
        min-height: 350px;
    }

    .table-row {
        margin-bottom: 20px;
    }

    .table-card {
        height: 500px;
    }

    .table-container {
        height: calc(100% - 70px);
        overflow-y: auto;
    }

    /* 响应式设计 */
    @media (max-width: 1200px) {
        .chart-card {
            height: auto;
            min-height: 350px;
        }

        .chart-container {
            height: calc(100% - 70px);
            min-height: 280px;
        }

        .table-card {
            height: 300px;
        }

        .table-container {
            height: calc(100% - 70px);
            overflow-y: auto;
        }
    }

    @media (max-width: 768px) {
        .dashboard-container {
            padding: 10px;
        }

        .chart-card {
            height: auto;
            min-height: 300px;
            margin-bottom: 20px;
        }

        .chart-container {
            height: calc(100% - 70px);
            min-height: 230px;
        }

        .table-card {
            height: auto;
            margin-bottom: 20px;
            min-height: 250px;
        }

        .table-container {
            height: calc(100% - 70px);
            overflow-y: auto;
            min-height: 180px;
        }
    }
</style>