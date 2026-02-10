@echo off
echo Adding student: กิตติกานต์ เอียดใหญ่ (6604101306)
echo.

curl -X POST http://localhost:3000/api/students ^
  -H "Content-Type: application/json" ^
  -d "{\"studentId\":\"6604101306\",\"firstName\":\"กิตติกานต์\",\"lastName\":\"เอียดใหญ่\"}"

echo.
echo.
echo Retrieving all students:
curl http://localhost:3000/api/students

echo.
