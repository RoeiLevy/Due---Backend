@echo off
REM Replace the URL with your server's API endpoint
set SERVER_URL=https://yesno.wtf/api

REM Specify the log file path
set LOG_FILE=C:\Users\97254\Dev\Due-Backend

REM Make the API call using curl or any other HTTP client and append the response to the log file
curl -X GET %SERVER_URL% >> %LOG_FILE% 2>&1