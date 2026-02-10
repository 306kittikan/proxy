// prisma/seed-student.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🌱 กำลังเพิ่มข้อมูลนักศึกษา...');

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

        console.log('✅ เพิ่มข้อมูลนักศึกษาสำเร็จ:');
        console.log(JSON.stringify(student, null, 2));
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
