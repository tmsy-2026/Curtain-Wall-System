# 幕墙工程管理系统 - 技术规范文档

## 1. 项目概述

**项目名称**：幕墙工程管理系统（CWMS - Curtain Wall Management System）

**核心功能**：面向幕墙施工项目的协同管理平台，支持多角色登录、分模块管理、数据隔离与流程审批。

**目标用户**：
- 项目经理（系统管理员）
- 材料仓管员
- 劳务管理员
- 财务人员
- 采购人员
- 审批人员

---

## 2. 技术方案

### 2.1 技术栈
- **前端**：原生 HTML5 + CSS3 + JavaScript（无框架依赖，简单稳定）
- **UI框架**：自定义响应式组件库，支持亮/暗/系统主题
- **后端**：腾讯云 CloudBase（云函数）
- **数据库**：CloudBase 云数据库（MongoDB兼容）
- **文件存储**：CloudBase 云存储
- **部署**：腾讯云静态网站托管

### 2.2 部署架构
```
用户浏览器 → 腾讯云CDN → 静态资源(COS) → 云函数 → 云数据库
```

---

## 3. 功能模块

### 3.1 权限系统（RBAC）
| 角色 | 权限说明 |
|------|----------|
| 项目经理 | 全模块管理、账号管理、角色权限配置 |
| 材料仓管员 | 材料档案、入库、出库、库存、盘点 |
| 劳务管理员 | 人员档案、班组、考勤、工资 |
| 财务人员 | 收支管理、发票、成本报表、对账 |
| 采购人员 | 采购申请、订单、供应商、办公用品 |
| 审批人员 | 各类审批流程处理 |

### 3.2 功能模块清单

#### P0 - 核心基础模块
- [x] 用户认证系统（登录/注册/登出）
- [x] 角色权限管理（RBAC）
- [x] 账号管理（项目经理新建账号、设置密码）
- [x] 材料仓管管理（分类、档案、入库、出库、库存）
- [x] 采购管理（申请、订单、供应商）
- [x] 流程审批管理（多类型审批流程）

#### P1 - 重要业务模块
- [x] 劳务管理（人员档案、班组、考勤、工资）
- [x] 财务管理（收支、发票、成本、对账）
- [x] 数据导出（Excel导出）

#### P2 - 增强功能
- [x] 消息通知（站内消息）
- [x] 附件上传
- [x] 批量操作
- [x] 多项目支持
- [x] 打印功能
- [x] 逾期提醒
- [x] 操作日志
- [x] 数据初始化（预设模板）

---

## 4. 数据库设计

### 4.1 核心数据表

#### users（用户表）
```json
{
  "_id": "ObjectId",
  "username": "string",
  "password": "string(salted hash)",
  "role": "string(project_manager/warehouse/labor/finance/purchase/approver)",
  "realName": "string",
  "phone": "string",
  "status": "number(0=禁用,1=启用)",
  "createdAt": "date",
  "lastLogin": "date"
}
```

#### materials（材料档案）
```json
{
  "_id": "ObjectId",
  "category": "string",
  "name": "string",
  "spec": "string",
  "unit": "string",
  "price": "number",
  "supplier": "string",
  "safeStock": "number",
  "remark": "string"
}
```

#### warehouse_in（入库记录）
```json
{
  "_id": "ObjectId",
  "materialId": "ObjectId",
  "batchNo": "string",
  "quantity": "number",
  "unitPrice": "number",
  "supplier": "string",
  "inDate": "date",
  "operator": "ObjectId",
  "remark": "string"
}
```

#### warehouse_out（出库记录）
```json
{
  "_id": "ObjectId",
  "materialId": "ObjectId",
  "quantity": "number",
  "projectName": "string",
  "outDate": "date",
  "operator": "ObjectId",
  "remark": "string"
}
```

#### labor_staff（劳务人员）
```json
{
  "_id": "ObjectId",
  "name": "string",
  "idCard": "string",
  "workType": "string",
  "phone": "string",
  "team": "string",
  "joinDate": "date",
  "status": "number"
}
```

#### finance_records（财务记录）
```json
{
  "_id": "ObjectId",
  "type": "string(income/expense)",
  "category": "string",
  "amount": "number",
  "date": "date",
  "payer": "string",
  "payee": "string",
  "invoiceNo": "string",
  "remark": "string",
  "operator": "ObjectId"
}
```

#### purchase_orders（采购订单）
```json
{
  "_id": "ObjectId",
  "materialId": "ObjectId",
  "quantity": "number",
  "unitPrice": "number",
  "supplier": "string",
  "status": "string(pending/approved/ordered/received)",
  "applyDate": "date",
  "expectedDate": "date",
  "applicant": "ObjectId"
}
```

#### approval_flows（审批流程）
```json
{
  "_id": "ObjectId",
  "type": "string(purchase/payment/leave/contract)",
  "title": "string",
  "content": "string",
  "amount": "number",
  "attachments": "array",
  "status": "string(pending/approved/rejected)",
  "steps": "array",
  "currentStep": "number",
  "applicant": "ObjectId",
  "createdAt": "date"
}
```

#### notifications（消息通知）
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "title": "string",
  "content": "string",
  "type": "string(approval/reminder/system)",
  "read": "boolean",
  "createdAt": "date"
}
```

#### operation_logs（操作日志）
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "action": "string",
  "module": "string",
  "detail": "string",
  "ip": "string",
  "createdAt": "date"
}
```

---

## 5. 响应式设计

### 5.1 断点
- 移动端：< 768px
- 平板端：768px - 1024px
- 桌面端：> 1024px

### 5.2 主题支持
- 亮色主题（默认）
- 暗色主题
- 跟随系统

---

## 6. 质量标准

- 加载时间 < 2秒
- 支持主流浏览器（Chrome、Firefox、Safari、Edge）
- 移动端触控友好
- 数据操作需操作日志记录
- 敏感操作需二次确认

---

## 7. 部署

- 代码仓库：GitHub
- 托管平台：腾讯云静态网站托管
- 备份：定期数据导出
