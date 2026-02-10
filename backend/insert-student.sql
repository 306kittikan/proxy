INSERT INTO students ("id", "studentId", "firstName", "lastName", "createdAt", "updatedAt")
VALUES (gen_random_uuid(), '6604101306', 'กิตติกานต์', 'เอียดใหญ่', NOW(), NOW())
ON CONFLICT ("studentId") DO UPDATE 
SET "firstName" = EXCLUDED."firstName", "lastName" = EXCLUDED."lastName", "updatedAt" = NOW();
