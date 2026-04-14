@echo off
chcp 65001 >nul
cd /d "f:\workbuddy测试02-一线使用的项目管理系统"
set GIT="C:\Program Files\Git\bin\git.exe"
set count=0
:retry
set /a count+=1
echo [%count%] 尝试推送...
%GIT% add .
%GIT% commit -m "fix: 刷新恢复项目+跨设备数据同步功能"
%GIT% push origin main
if %errorlevel% neq 0 (
    echo 失败，等待15秒后重试...
    timeout /t 15 >nul
    goto retry
)
echo 推送成功！
pause
