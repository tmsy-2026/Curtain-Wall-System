/**
 * 腾讯云开发配置 - 幕墙工程管理系统
 *
 * 环境信息：
 * - 环境ID: curtain-wall-system-4clw9766e0a1-1409842760
 * - 地域: ap-shanghai
 *
 * 使用说明：
 * 1. 云端同步已启用（enableCloud: true）
 * 2. 登录后会自动尝试云端同步
 * 3. 侧边栏底部有「从云端同步」「上传至云端」按钮
 * 4. 所有设备共用同一云端数据库，自动同步
 */

// 腾讯云开发配置
const CLOUDBASE_CONFIG = {
    env: 'curtain-wall-system-4clw9766e0a1-1409842760',  // 腾讯云环境ID
    region: 'ap-shanghai',                                 // 地域

    // 是否启用云开发（true=云端同步，false=本地存储）
    enableCloud: true,

    // 云数据库集合名称
    collections: {
        projects: 'cwm_projects',
        staff: 'cwm_staff',
        attendance: 'cwm_attendance',
        wages: 'cwm_wages',
        entryExit: 'cwm_entry_exit',
        materials: 'cwm_materials',
        inventory: 'cwm_inventory',
        outbound: 'cwm_outbound',
        approvals: 'cwm_approvals',
        contracts: 'cwm_contracts',
        payments: 'cwm_payments',
        reimburse: 'cwm_reimburse',
        pettyCash: 'cwm_petty_cash',
        income: 'cwm_income',
        expense: 'cwm_expense'
    }
};
