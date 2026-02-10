// backend/update-task.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Updating task...');
        const result = await prisma.task.updateMany({
            where: {
                title: 'ข้อมูลนักศึกษา (จากฐานข้อมูล)'
            },
            data: {
                title: 'กิตติกานต์ เอียดใหญ่',
                description: 'รหัสนักศึกษา: 6604101306'
            }
        });
        console.log('✅ Success! Tasks updated:', result.count);
    } catch (error) {
        console.error('❌ Error updating task:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
