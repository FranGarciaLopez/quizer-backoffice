#!/bin/bash

echo "Starting API"
cd "../../api"
mkdir -p ./logs
echo "  - Enabling virtual environment" && source "venv/bin/activate" > ./api/logs/api.log
echo "  - Installing dependencies" && pip install -r requirements.txt  >> ./api/logs/api.log
echo "  - Starting server" && python3 app.py >> ./api/logs/api.log &
echo "  - Server running"
sleep 10

echo ""
echo "Starting Backoffice"
cd "../backoffice"
mkdir -p ./backoffice/logs
echo "  - Installing vue-cli-service" && npm install -g @vue/cli-service > ./backoffice/logs/backoffice.log
echo "  - Installing dependencies" && npm install --legacy-peer-deps >> ./backoffice/logs/backoffice.log
echo "  - Starting service" && npm run serve >> ./backoffice/logs/backoffice.log &
sleep 10


echo "Stopping services"

kill $(ps | grep npm | awk {'print$1'})
kill $(ps | grep node | awk {'print$1'})
echo "  - Backoffice stopped"
kill $(ps | grep python3 | awk {'print$1'})
echo "  - API stopped"
