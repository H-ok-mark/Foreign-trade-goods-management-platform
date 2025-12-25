<template>
    <div class="goods-management-container">
        <!-- 页面标题 -->
        <div class="page-header">
            <h2>货物管理</h2>
            <p>管理平台中的货物信息，包括添加、修改、删除和查询操作</p>
        </div>

        <!-- 搜索和筛选区域 -->
        <el-card class="search-card">
            <el-form :model="searchForm" inline>
                <el-form-item label="货物名称">
                    <el-input
                        v-model="searchForm.goodsName"
                        placeholder="请输入货物名称"
                        clearable
                        @keyup.enter="handleSearch"
                        style="width: 200px"
                    >
                        <template #prefix>
                            <el-icon><Search /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="货物类型">
                    <el-select
                        v-model="searchForm.goodsType"
                        placeholder="请选择货物类型"
                        clearable
                        style="width: 150px"
                    >
                        <el-option
                            label="电子产品"
                            value="electronics"
                        ></el-option>
                        <el-option label="服装" value="clothing"></el-option>
                        <el-option label="食品" value="food"></el-option>
                        <el-option label="家具" value="furniture"></el-option>
                        <el-option label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态">
                    <el-select
                        v-model="searchForm.status"
                        placeholder="请选择状态"
                        clearable
                        style="width: 120px"
                    >
                        <el-option label="正常" value="normal"></el-option>
                        <el-option label="缺货" value="outOfStock"></el-option>
                        <el-option label="下架" value="offShelve"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleSearch"
                        >搜索</el-button
                    >
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 操作按钮区域 -->
        <div class="action-bar">
            <el-button type="primary" size="default" @click="handleAdd">
                <el-icon><Plus /></el-icon> 新增货物
            </el-button>
            <el-button type="success" size="default" @click="handleBatchImport">
                <el-icon><Upload /></el-icon> 批量导入
            </el-button>
            <el-button type="info" size="default" @click="handleExport">
                <el-icon><Download /></el-icon> 导出数据
            </el-button>
            <el-button
                type="danger"
                size="default"
                @click="handleBatchDelete"
                :disabled="selectedGoods.length === 0"
            >
                <el-icon><Delete /></el-icon> 批量删除
            </el-button>
        </div>

        <!-- 货物列表表格 -->
        <el-card class="table-card">
            <el-table
                :data="goodsList"
                v-loading="loading"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    prop="goodsNumber"
                    label="货物编号"
                    width="120"
                    sortable
                ></el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="货物名称"
                    min-width="150"
                    sortable
                ></el-table-column>
                <el-table-column prop="goodsType" label="货物类型" width="120">
                    <template #default="scope">
                        <el-tag :type="getGoodsTypeTag(scope.row.goodsType)">{{
                            getGoodsTypeName(scope.row.goodsType)
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    width="80"
                ></el-table-column>
                <el-table-column prop="price" label="单价" width="100" sortable>
                    <template #default="scope">
                        <span>¥{{ scope.row.price }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="inventoryNumber"
                    label="库存数量"
                    width="100"
                    sortable
                ></el-table-column>
                <el-table-column
                    prop="minInventory"
                    label="最低库存"
                    width="100"
                ></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="scope">
                        <el-tag :type="getStatusType(scope.row.status)">{{
                            getStatusName(scope.row.status)
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="160"
                    sortable
                ></el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="handleView(scope.row)"
                        >
                            查看
                        </el-button>
                        <el-button
                            type="success"
                            size="small"
                            @click="handleEdit(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            @click="handleDelete(scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                class="pagination"
            ></el-pagination>
        </el-card>

        <!-- 新增/编辑货物对话框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="dialogType === 'add' ? '新增货物' : '编辑货物'"
            width="600px"
            :close-on-click-modal="false"
        >
            <el-form
                ref="goodsFormRef"
                :model="goodsForm"
                :rules="goodsFormRules"
                label-width="100px"
            >
                <el-form-item label="货物编号" prop="goodsNumber">
                    <el-input
                        v-model="goodsForm.goodsNumber"
                        placeholder="请输入货物编号"
                        readonly
                        :disabled="dialogType === 'edit'"
                    >
                        <template #prefix>
                            <el-icon><Document /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="货物名称" prop="goodsName">
                    <el-input
                        v-model="goodsForm.goodsName"
                        placeholder="请输入货物名称"
                    >
                        <template #prefix>
                            <el-icon><Goods /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="货物类型" prop="goodsType">
                    <el-select
                        v-model="goodsForm.goodsType"
                        placeholder="请选择货物类型"
                    >
                        <el-option
                            label="电子产品"
                            value="electronics"
                        ></el-option>
                        <el-option label="服装" value="clothing"></el-option>
                        <el-option label="食品" value="food"></el-option>
                        <el-option label="家具" value="furniture"></el-option>
                        <el-option label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="单位" prop="unit">
                    <el-input v-model="goodsForm.unit" placeholder="请输入单位">
                        <template #prefix>
                            <el-icon><ScaleToOriginal /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="单价" prop="price">
                    <el-input-number
                        v-model="goodsForm.price"
                        :precision="2"
                        :step="0.01"
                        :min="0"
                        placeholder="请输入单价"
                        style="width: 100%"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="库存数量" prop="inventoryNumber">
                    <el-input-number
                        v-model="goodsForm.inventoryNumber"
                        :step="1"
                        :min="0"
                        placeholder="请输入库存数量"
                        style="width: 100%"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="最低库存" prop="minInventory">
                    <el-input-number
                        v-model="goodsForm.minInventory"
                        :step="1"
                        :min="0"
                        placeholder="请输入最低库存"
                        style="width: 100%"
                    ></el-input-number>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                    <el-select
                        v-model="goodsForm.status"
                        placeholder="请选择状态"
                    >
                        <el-option label="正常" value="normal"></el-option>
                        <el-option label="缺货" value="outOfStock"></el-option>
                        <el-option label="下架" value="offShelve"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input
                        v-model="goodsForm.description"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入货物描述"
                    ></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDialogConfirm"
                    >确定</el-button
                >
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { ElMessage, ElMessageBox } from 'element-plus';
    import {
        Search,
        Plus,
        Upload,
        Download,
        Delete,
        Goods,
        Document,
        ScaleToOriginal,
    } from '@element-plus/icons-vue';

    // 加载状态
    const loading = ref(false);

    // 搜索表单
    const searchForm = reactive({
        goodsName: '',
        goodsType: '',
        status: '',
    });

    // 货物列表
    const goodsList = ref([]);

    // 选择的货物
    const selectedGoods = ref([]);

    // 分页信息
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        total: 0,
    });

    // 对话框
    const dialogVisible = ref(false);
    const dialogType = ref('add'); // 'add' 或 'edit'

    // 表单引用
    const goodsFormRef = ref();

    // 表单数据
    const goodsForm = reactive({
        goodsNumber: '',
        goodsName: '',
        goodsType: '',
        unit: '',
        price: 0,
        inventoryNumber: 0,
        minInventory: 0,
        status: 'normal',
        description: '',
    });

    // 表单验证规则
    const goodsFormRules = {
        goodsNumber: [
            { required: true, message: '请输入货物编号', trigger: 'blur' },
            {
                min: 3,
                max: 20,
                message: '货物编号长度在 3 到 20 个字符',
                trigger: 'blur',
            },
        ],
        goodsName: [
            { required: true, message: '请输入货物名称', trigger: 'blur' },
            {
                min: 2,
                max: 50,
                message: '货物名称长度在 2 到 50 个字符',
                trigger: 'blur',
            },
        ],
        goodsType: [
            { required: true, message: '请选择货物类型', trigger: 'change' },
        ],
        unit: [
            { required: true, message: '请输入单位', trigger: 'blur' },
            {
                min: 1,
                max: 10,
                message: '单位长度在 1 到 10 个字符',
                trigger: 'blur',
            },
        ],
        price: [
            { required: true, message: '请输入单价', trigger: 'blur' },
            { type: 'number', min: 0, message: '单价不能小于 0', trigger: 'blur' },
        ],
        inventoryNumber: [
            { required: true, message: '请输入库存数量', trigger: 'blur' },
            {
                type: 'number',
                min: 0,
                message: '库存数量不能小于 0',
                trigger: 'blur',
            },
        ],
        minInventory: [
            { required: true, message: '请输入最低库存', trigger: 'blur' },
            {
                type: 'number',
                min: 0,
                message: '最低库存不能小于 0',
                trigger: 'blur',
            },
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    };

    // 模拟货物数据
    const mockGoodsData = [
        {
            goodsNumber: 'GD001',
            goodsName: '笔记本电脑',
            goodsType: 'electronics',
            unit: '台',
            price: 5800,
            inventoryNumber: 150,
            minInventory: 50,
            status: 'normal',
            createTime: '2024-01-15 10:30:00',
            description: '高性能笔记本电脑',
        },
        {
            goodsNumber: 'GD002',
            goodsName: '智能手机',
            goodsType: 'electronics',
            unit: '部',
            price: 3500,
            inventoryNumber: 200,
            minInventory: 80,
            status: 'normal',
            createTime: '2024-01-16 14:20:00',
            description: '最新款智能手机',
        },
        {
            goodsNumber: 'GD003',
            goodsName: 'T恤',
            goodsType: 'clothing',
            unit: '件',
            price: 50,
            inventoryNumber: 1000,
            minInventory: 300,
            status: 'normal',
            createTime: '2024-01-17 09:45:00',
            description: '纯棉T恤',
        },
        {
            goodsNumber: 'GD004',
            goodsName: '牛仔裤',
            goodsType: 'clothing',
            unit: '条',
            price: 120,
            inventoryNumber: 500,
            minInventory: 200,
            status: 'normal',
            createTime: '2024-01-18 11:30:00',
            description: '休闲牛仔裤',
        },
        {
            goodsNumber: 'GD005',
            goodsName: '苹果',
            goodsType: 'food',
            unit: '箱',
            price: 120,
            inventoryNumber: 300,
            minInventory: 100,
            status: 'outOfStock',
            createTime: '2024-01-19 16:40:00',
            description: '新鲜苹果',
        },
        {
            goodsNumber: 'GD006',
            goodsName: '香蕉',
            goodsType: 'food',
            unit: '箱',
            price: 80,
            inventoryNumber: 250,
            minInventory: 80,
            status: 'normal',
            createTime: '2024-01-20 08:50:00',
            description: '进口香蕉',
        },
        {
            goodsNumber: 'GD007',
            goodsName: '沙发',
            goodsType: 'furniture',
            unit: '套',
            price: 2800,
            inventoryNumber: 30,
            minInventory: 10,
            status: 'normal',
            createTime: '2024-01-21 13:20:00',
            description: '真皮沙发',
        },
        {
            goodsNumber: 'GD008',
            goodsName: '桌子',
            goodsType: 'furniture',
            unit: '张',
            price: 650,
            inventoryNumber: 80,
            minInventory: 30,
            status: 'offShelve',
            createTime: '2024-01-22 15:10:00',
            description: '实木桌子',
        },
        {
            goodsNumber: 'GD009',
            goodsName: '空调',
            goodsType: 'electronics',
            unit: '台',
            price: 2500,
            inventoryNumber: 60,
            minInventory: 20,
            status: 'normal',
            createTime: '2024-01-23 10:05:00',
            description: '变频空调',
        },
        {
            goodsNumber: 'GD010',
            goodsName: '冰箱',
            goodsType: 'electronics',
            unit: '台',
            price: 3200,
            inventoryNumber: 40,
            minInventory: 15,
            status: 'normal',
            createTime: '2024-01-24 14:45:00',
            description: '双门冰箱',
        },
        {
            goodsNumber: 'GD011',
            goodsName: '微波炉',
            goodsType: 'electronics',
            unit: '台',
            price: 800,
            inventoryNumber: 100,
            minInventory: 40,
            status: 'normal',
            createTime: '2024-01-25 09:20:00',
            description: '智能微波炉',
        },
        {
            goodsNumber: 'GD012',
            goodsName: '电视',
            goodsType: 'electronics',
            unit: '台',
            price: 4500,
            inventoryNumber: 70,
            minInventory: 25,
            status: 'normal',
            createTime: '2024-01-26 16:00:00',
            description: '4K电视',
        },
    ];

    // 获取货物列表
    const getGoodsList = () => {
        loading.value = true;
        // 模拟API请求
        setTimeout(() => {
            goodsList.value = mockGoodsData;
            pagination.total = mockGoodsData.length;
            loading.value = false;
        }, 500);
    };

    // 搜索
    const handleSearch = () => {
        pagination.page = 1;
        getGoodsList();
    };

    // 重置
    const handleReset = () => {
        Object.keys(searchForm).forEach(key => {
            searchForm[key] = '';
        });
        pagination.page = 1;
        getGoodsList();
    };

    // 新增
    const handleAdd = () => {
        dialogType.value = 'add';
        // 生成货物编号
        goodsForm.goodsNumber = 'GD' + String(Date.now()).slice(-8);
        // 重置表单
        Object.keys(goodsForm).forEach(key => {
            if (key !== 'goodsNumber') {
                goodsForm[key] = '';
            }
        });
        goodsForm.status = 'normal';
        goodsForm.price = 0;
        goodsForm.inventoryNumber = 0;
        goodsForm.minInventory = 0;
        dialogVisible.value = true;
    };

    // 批量导入
    const handleBatchImport = () => {
        ElMessage.info('批量导入功能待开发');
    };

    // 导出数据
    const handleExport = () => {
        ElMessage.info('导出功能待开发');
    };

    // 批量删除
    const handleBatchDelete = () => {
        if (selectedGoods.value.length === 0) {
            ElMessage.warning('请选择要删除的货物');
            return;
        }

        ElMessageBox.confirm(
            `确定要删除选中的 ${selectedGoods.value.length} 个货物吗？`,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                // 模拟删除操作
                setTimeout(() => {
                    ElMessage.success('删除成功');
                    selectedGoods.value = [];
                    getGoodsList();
                }, 500);
            })
            .catch(() => {
                // 用户取消删除
            });
    };

    // 选择变化
    const handleSelectionChange = selection => {
        selectedGoods.value = selection;
    };

    // 查看
    const handleView = row => {
        console.log('查看:', row);
        ElMessage.info('查看功能待开发');
    };

    // 编辑
    const handleEdit = row => {
        dialogType.value = 'edit';
        // 填充表单数据
        Object.keys(goodsForm).forEach(key => {
            goodsForm[key] = row[key];
        });
        dialogVisible.value = true;
    };

    // 删除
    const handleDelete = row => {
        ElMessageBox.confirm(`确定要删除货物 "${row.goodsName}" 吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                // 模拟删除操作
                setTimeout(() => {
                    ElMessage.success('删除成功');
                    getGoodsList();
                }, 500);
            })
            .catch(() => {
                // 用户取消删除
            });
    };

    // 对话框确定
    const handleDialogConfirm = async () => {
        try {
            await goodsFormRef.value.validate();
            // 模拟API请求
            setTimeout(() => {
                ElMessage.success(
                    dialogType.value === 'add' ? '新增成功' : '编辑成功'
                );
                dialogVisible.value = false;
                getGoodsList();
            }, 500);
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    // 分页大小变化
    const handleSizeChange = size => {
        pagination.pageSize = size;
        getGoodsList();
    };

    // 页码变化
    const handleCurrentChange = page => {
        pagination.page = page;
        getGoodsList();
    };

    // 获取货物类型标签
    const getGoodsTypeTag = type => {
        const tagMap = {
            electronics: 'primary',
            clothing: 'success',
            food: 'warning',
            furniture: 'info',
            other: 'danger',
        };
        return tagMap[type] || 'default';
    };

    // 获取货物类型名称
    const getGoodsTypeName = type => {
        const nameMap = {
            electronics: '电子产品',
            clothing: '服装',
            food: '食品',
            furniture: '家具',
            other: '其他',
        };
        return nameMap[type] || '未知';
    };

    // 获取状态类型
    const getStatusType = status => {
        const typeMap = {
            normal: 'success',
            outOfStock: 'warning',
            offShelve: 'danger',
        };
        return typeMap[status] || 'default';
    };

    // 获取状态名称
    const getStatusName = status => {
        const nameMap = {
            normal: '正常',
            outOfStock: '缺货',
            offShelve: '下架',
        };
        return nameMap[status] || '未知';
    };

    // 页面加载
    onMounted(() => {
        getGoodsList();
    });
</script>

<style scoped>
    .goods-management-container {
        padding: 20px;
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

    .search-card {
        margin-bottom: 20px;
    }

    .action-bar {
        margin-bottom: 20px;
    }

    .action-bar .el-button {
        margin-right: 10px;
    }

    .table-card {
        margin-bottom: 20px;
    }

    .pagination {
        margin-top: 20px;
        text-align: right;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .goods-management-container {
            padding: 10px;
        }

        .action-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .action-bar .el-button {
            margin-right: 0;
        }
    }
</style>