@echo off
chcp 65001 >nul
cd /d "f:\workbuddy测试02-一线使用的项目管理系统"
set "GIT=C:\Program Files\Git\bin\git.exe"

echo ========================================
echo  GitHub 推送脚本 - 循环直到成功
echo ========================================

set count=0
:retry
set /a count+=1
echo.
echo [%date% %time%] 第 %count% 次尝试推送...

%GIT% push origin main

if %errorlevel% neq 0 (
    echo.
    echo [失败] 网络不稳定，等待 5 秒后重试...
    timeout /t 5 >nul
    goto :retry
)

echo.
echo ========================================
echo  推送成功！
echo ========================================
pause
