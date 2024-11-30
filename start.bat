@echo off
start powershell -NoExit -Command "cd client; npm run dev"
start powershell -NoExit -Command "cd server; npm run dev"
REM Wait for user input to stop servers
pause

REM Kill any running Node.js processes
taskkill /F /IM node.exe
