/**
 * WebDAV 配置 - 幕墙工程管理系统
 *
 * 连接信息：
 * - 服务器: https://wesen.kmras.com:55006
 * - 路径: /pro5/cwm-data/
 *
 * 使用说明：
 * 1. 登录后自动同步数据到 WebDAV
 * 2. 所有设备访问同一个 WebDAV 服务器，实现真正的云同步
 */

// WebDAV 配置
const WEBDAV_CONFIG = {
    server: 'https://wesen.kmras.com:55006',
    username: 'guests',
    password: '!qW5G4(',
    dataPath: '/pro5/cwm-data/',
    dataFile: 'cwm-database.json'
};

// WebDAV 完整文件路径
const WEBDAV_FULL_PATH = WEBDAV_CONFIG.dataPath + WEBDAV_CONFIG.dataFile;
