// Script to add student: กิตติกานต์ เอียดใหญ่ (6604101306)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addStudent() {
    try {
        const student = await prisma.student.create({
            data: {
                studentId: '6604101306',
                firstName: 'กิตติกานต์',
                lastName: 'เอียดใหญ่',
            },
        });

        console.log('✅ เพิ่มข้อมูลนักศึกษาสำเร็จ:');
        console.log(JSON.stringify(student, null, 2));
    } catch (error: any) {
        if (error.code === 'P2002') {
            console.log('⚠️  รหัสนักศึกษานี้มีอยู่ในระบบแล้ว');

            // ดึงข้อมูลที่มีอยู่
            const existing = await prisma.student.findUnique({
                where: { studentId: '6604101306' },
            });
            console.log('ข้อมูลที่มีอยู่:');
            console.log(JSON.stringify(existing, null, 2));
        } else {
            console.error('❌ เกิดข้อผิดพลาด:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

addStudent();
