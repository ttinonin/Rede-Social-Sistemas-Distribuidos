@echo off

start cmd /k "cd /d .\publishers && python publisher_process.py"
start cmd /k "uvicorn main:app --port 8001"
start cmd /k "uvicorn main:app --port 8002"
start cmd /k "uvicorn main:app --port 8003"
start cmd /k "uvicorn load_balancer:app --port 9000"
start cmd /k "cd /d .\go_social && go run main.go"
start cmd /k "cd /d ..\chat-gateaway && node server.js"



