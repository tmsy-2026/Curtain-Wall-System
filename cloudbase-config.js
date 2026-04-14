/**
 * 腾讯云开发配置
 * 
 * 使用说明：
 * 1. 登录腾讯云开发控制台 (https://console.cloud.tencent.com/tcb)
 * 2. 创建环境，获取环境ID
 * 3. 替换下方配置信息
 * 4. 部署到云开发静态网站托管
 */

// 腾讯云开发配置
const CLOUDBASE_CONFIG = {
    env: 'YOUR_ENVIRONMENT_ID',  // 替换为你的环境ID
    appId: 'YOUR_APP_ID',        // 替换为你的应用ID（可选）
    
    // 是否启用云开发（本地模式使用localStorage）
    enableCloud: false,
    
    // 云开发API基础路径（可选配置）
    cloudBaseUrl: ''
};

// 当前配置模式
const CURRENT_MODE = CLOUDBASE_CONFIG.enableCloud ? 'cloud' : 'local';

/**
 * 云数据库操作类
 * 当enableCloud为true时，使用腾讯云数据库
 * 否则使用本地localStorage（单机版演示用）
 */
class CloudDatabase {
    constructor(config) {
        this.config = config;
        this.db = null;
        this.collections = {};
        
        if (config.enableCloud && typeof tcb !== 'undefined') {
            this.initCloud();
        } else {
            this.useLocalStorage();
        }
    }

    async initCloud() {
        try {
            // 初始化云开发
            this.db = tcb.init({
                env: this.config.env
            });
            
            // 匿名登录
            await this.db.auth({ persistence: 'local' });
            
            console.log('云开发初始化成功');
        } catch (e) {
            console.error('云开发初始化失败:', e);
            this.useLocalStorage();
        }
    }

    useLocalStorage() {
        console.log('使用本地存储模式（单机版）');
        this.db = localStorage;
    }

    collection(name) {
        if (!this.collections[name]) {
            this.collections[name] = new CollectionProxy(name, this);
        }
        return this.collections[name];
    }

    getData(key) {
        if (this.db === localStorage) {
            const data = this.db.getItem('cwms_db');
            return data ? JSON.parse(data)[key] : [];
        }
        // 云开发模式
        return this.collections[key]?.getAll() || [];
    }
}

/**
 * 集合代理
 */
class CollectionProxy {
    constructor(name, db) {
        this.name = name;
        this.db = db;
    }

    async get() {
        // 本地模式
        if (this.db.db === localStorage) {
            const data = JSON.parse(this.db.db.getItem('cwms_db') || '{}');
            return data[this.name] || [];
        }
        
        // 云开发模式
        try {
            const res = await this.db.db.collection(this.name).get();
            return res.data;
        } catch (e) {
            console.error('获取数据失败:', e);
            return [];
        }
    }

    async add(data) {
        if (this.db.db === localStorage) {
            const storeData = JSON.parse(this.db.db.getItem('cwms_db') || '{}');
            data.id = Date.now().toString();
            data.createdAt = new Date().toISOString();
            storeData[this.name] = storeData[this.name] || [];
            storeData[this.name].push(data);
            this.db.db.setItem('cwms_db', JSON.stringify(storeData));
            return data;
        }

        // 云开发模式
        try {
            const res = await this.db.db.collection(this.name).add({ data });
            return { id: res.id, ...data };
        } catch (e) {
            console.error('添加数据失败:', e);
            throw e;
        }
    }

    async update(id, data) {
        if (this.db.db === localStorage) {
            const storeData = JSON.parse(this.db.db.getItem('cwms_db') || '{}');
            const list = storeData[this.name] || [];
            const index = list.findIndex(item => item.id === id);
            if (index !== -1) {
                list[index] = { ...list[index], ...data };
                storeData[this.name] = list;
                this.db.db.setItem('cwms_db', JSON.stringify(storeData));
            }
            return list[index];
        }

        // 云开发模式
        try {
            await this.db.db.collection(this.name).doc(id).update({ data });
            return data;
        } catch (e) {
            console.error('更新数据失败:', e);
            throw e;
        }
    }

    async remove(id) {
        if (this.db.db === localStorage) {
            const storeData = JSON.parse(this.db.db.getItem('cwms_db') || '{}');
            const list = storeData[this.name] || [];
            storeData[this.name] = list.filter(item => item.id !== id);
            this.db.db.setItem('cwms_db', JSON.stringify(storeData));
            return true;
        }

        // 云开发模式
        try {
            await this.db.db.collection(this.name).doc(id).remove();
            return true;
        } catch (e) {
            console.error('删除数据失败:', e);
            throw e;
        }
    }
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLOUDBASE_CONFIG, CloudDatabase };
}
