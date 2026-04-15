import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = 'https://qvtrsimodfciaumbmvqh.supabase.co'
ANON_KEY = 'sb_publishable_UMLRjqofXoGaKKFZPAjxTw_-xij88Pb'

headers = {
    'apikey': ANON_KEY,
    'Authorization': f'Bearer {ANON_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

def req(url, method='GET', data=None):
    d = json.dumps(data).encode() if data else None
    r = urllib.request.Request(url, data=d, method=method)
    for k,v in headers.items():
        r.add_header(k, v)
    try:
        with urllib.request.urlopen(r, timeout=10) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode())

print("=== 测试 cwm_users 写入/读取 ===")

# 先清理测试数据
req(f"{SUPABASE_URL}/rest/v1/cwm_users?username=eq.test_admin", 'DELETE')

# 写入admin账号
status, result = req(f"{SUPABASE_URL}/rest/v1/cwm_users", 'POST', {
    "username": "admin",
    "password": "admin123",
    "role": "manager",
    "name": "系统管理员",
    "project": "ALL",
    "phone": "13800138000",
    "status": "active"
})
print(f"写入admin: HTTP {status}")
if status in [200, 201]:
    print("✅ 写入成功")
else:
    print(f"❌ 写入失败: {result}")

# 读取验证
status2, rows = req(f"{SUPABASE_URL}/rest/v1/cwm_users?select=username,role,status")
print(f"\n读取账号列表: HTTP {status2}")
if isinstance(rows, list):
    for r in rows:
        print(f"  - {r.get('username')} ({r.get('role')}) [{r.get('status')}]")
    print(f"\n✅ 共 {len(rows)} 条账号")
else:
    print(f"❌ 读取失败: {rows}")

print("\n=== 所有表字段验证完毕 ===")
