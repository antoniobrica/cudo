#!/bin/bash

echo "Starting SQL Server"
/opt/mssql/bin/sqlservr &

echo "Waiting for SQL Server to start"
sleep 30s

echo "Running database setup scripts"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Password -d master -i /var/opt/mssql/scripts/create_projects_db.sql
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Password -d master -i /var/opt/mssql/scripts/create_tasks_db.sql
