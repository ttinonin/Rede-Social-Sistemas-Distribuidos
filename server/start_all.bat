@echo off

start cmd /k "uvicorn main:app --reload"
start cmd /k "cd /d .\go_social && go run main.go"


