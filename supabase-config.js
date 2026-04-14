/**
 * Supabase 配置 - 幕墙工程管理系统
 *
 * 连接信息：
 * - Project URL: https://qvtrsimodfciaumbmvqh.supabase.co
 * - Anon Key: sb_publishable_UMLRjqofXoGaKKFZPAjxTw_-xij88Pb
 *
 * 使用说明：
 * 1. 云端同步已启用
 * 2. 登录后会自动同步数据
 * 3. 侧边栏底部有「从云端同步」「上传至云端」按钮
 * 4. 所有设备共用同一云端数据库，自动同步
 */

// Supabase 配置
const SUPABASE_URL = 'https://qvtrsimodfciaumbmvqh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_UMLRjqofXoGaKKFZPAjxTw_-xij88Pb';

// Supabase 表名映射（与本地数据键名对应）
const SUPABASE_TABLES = {
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
};
