#!/bin/bash

set -e

# Start the SQL Server
/opt/mssql/bin/sqlservr &

# Wait for the SQL Server to be ready
echo "Waiting for SQL Server to be ready..."
/opt/mssql-tools/bin/sqlcmd -l 30 -S localhost -U sa -P 'YourStrong!Password' -Q "SELECT 1;" &>/dev/null
echo "SQL Server is ready."

# Create the 'accountsxxx' database
echo "Creating the 'accountsxxx' database..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'YourStrong!Password' -Q "CREATE DATABASE accountsxxx;"
echo "Database 'accountsxxx' created."

# Keep the SQL Server process running
wait