@echo off
chcp 65001 >nul
echo ========================================
echo   幕墙工程管理系统 - WebDAV同步脚本
echo ========================================
echo.

:: 获取当前脚本所在目录
set SCRIPT_DIR=%~dp0
set DATA_DIR=%SCRIPT_DIR%

:: 获取用户数据目录（浏览器下载的默认位置）
set USER_DATA=%USERPROFILE%\Downloads

echo [1] 请选择操作：
echo     1 - 将浏览器数据导出到 WebDAV
echo     2 - 从 WebDAV 导入到浏览器
echo     3 - 退出
echo.

set /p choice=请输入选项 (1/2/3): 

if "%choice%"=="1" goto export
if "%choice%"=="2" goto import
if "%choice%"=="3" exit

:export
echo.
echo [导出] 请将浏览器下载的 cwm-sync.json 文件放到此文件夹
echo 路径: %DATA_DIR%
echo.
set /p confirm=按回车继续，或者输入文件完整路径: 

if "%confirm%"=="" (
    if exist "%DATA_DIR%\cwm-sync.json" (
        echo 找到文件，开始同步...
        :: 复制到Z盘
        if exist "Z:\pro5\cwm-data\" (
            copy "%DATA_DIR%\cwm-sync.json" "Z:\pro5\cwm-data\cwm-database.json" /Y
            echo 完成！数据已同步到 Z:\pro5\cwm-data\
        ) else (
            echo 警告：未找到 Z: 盘，请确保 WebDAV 已映射
        )
    ) else (
        echo 错误：在此文件夹中未找到 cwm-sync.json
    )
) else (
    if exist "%confirm%" (
        echo 找到文件，开始同步...
        copy "%confirm%" "Z:\pro5\cwm-data\cwm-database.json" /Y
        echo 完成！数据已同步到 Z:\pro5\cwm-data\
    ) else (
        echo 错误：文件不存在
    )
)

pause
exit

:import
echo.
echo [导入] 从 WebDAV 下载数据...
if exist "Z:\pro5\cwm-data\cwm-database.json" (
    copy "Z:\pro5\cwm-data\cwm-database.json" "%USER_DATA%\cwm-sync-import.json" /Y
    echo 完成！数据已保存到下载文件夹
    echo 请在浏览器中使用 [从本地导入] 功能导入此文件
    start explorer "%USER_DATA%"
) else (
    echo 错误：Z:\pro5\cwm-data\cwm-database.json 不存在
)
pause
exit
