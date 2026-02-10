// backend/insert-student.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Inserting student: กิตติกานต์ เอียดใหญ่ (6604101306)...');
        const student = await prisma.student.upsert({
            where: { studentId: '6604101306' },
            update: {
                firstName: 'กิตติกานต์',
                lastName: 'เอียดใหญ่',
            },
            create: {
                studentId: '6604101306',
                firstName: 'กิตติกานต์',
                lastName: 'เอียดใหญ่',
            },
        });
        console.log('✅ Success! Student inserted:', student);
    } catch (error) {
        console.error('❌ Error inserting student:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
