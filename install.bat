@echo off
IF [%1] == [] (
   echo "Argument Error - Usage: install <server> <db name>"
   exit /B
)
IF [%2] == [] (
   echo "Argument Error - Usage: install <server> <db name>"
   exit /B
)

sqlcmd -S %1 -d %2 -E -i tables/CreateTable-ICD-10-to-ICD-9-GEM.sql,tables/CreateTable-ICD-9-to-ICD-10-GEM.sql,insert/ICD-10-GEM-Complete.sql,insert/ICD-9-GEM-Complete.sql
