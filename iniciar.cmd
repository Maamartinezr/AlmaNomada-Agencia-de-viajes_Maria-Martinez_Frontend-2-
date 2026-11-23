@echo off
cd /d "%~dp0"
where pnpm >nul 2>nul
if errorlevel 1 (
  echo Se requiere Node.js 24 y pnpm. Instala pnpm con: npm install -g pnpm@11.25.0
  pause
  exit /b 1
)
if not exist node_modules (
  call pnpm install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Abre http://127.0.0.1:5173 en tu navegador. Ctrl+C para detener.
call pnpm dev
pause
