// src/routes/student.routes.ts
import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const { studentId, firstName, lastName } = req.body;
        if (!studentId || !firstName || !lastName) {
            return res.status(400).json({ message: 'กรุณาระบุ studentId, firstName และ lastName' });
        }

        const student = await prisma.student.create({
            data: { studentId, firstName, lastName },
        });

        res.status(201).json({ data: student });
    } catch (err: any) {
        console.error('CREATE error:', err);

        if (err.code === 'P2002') {
            return res.status(409).json({ message: 'รหัสนักศึกษานี้มีอยู่แล้ว' });
        }

        res.status(500).json({ message: 'ไม่สามารถสร้างข้อมูลนักศึกษาได้' });
    }
});

// READ ALL
router.get('/', async (_req, res) => {
    try {
        const students = await prisma.student.findMany({
            orderBy: { createdAt: 'desc' },
        });

        res.json({ data: students });
    } catch (err) {
        console.error('READ ALL error:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงรายการได้' });
    }
});

// READ ONE by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: req.params.id },
        });

        if (!student) {
            return res.status(404).json({ message: 'ไม่พบนักศึกษา' });
        }

        res.json({ data: student });
    } catch (err) {
        console.error('READ ONE error:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});

// READ ONE by Student ID
router.get('/studentId/:studentId', async (req, res) => {
    try {
        const student = await prisma.student.findUnique({
            where: { studentId: req.params.studentId },
        });

        if (!student) {
            return res.status(404).json({ message: 'ไม่พบนักศึกษา' });
        }

        res.json({ data: student });
    } catch (err) {
        console.error('READ ONE error:', err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
});

// UPDATE (PATCH)
router.patch('/:id', async (req, res) => {
    try {
        const { studentId, firstName, lastName } = req.body;

        const student = await prisma.student.update({
            where: { id: req.params.id },
            data: {
                ...(studentId && { studentId }),
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
            },
        });

        res.json({ data: student });
    } catch (err: any) {
        console.error('UPDATE error:', err);

        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'ไม่พบนักศึกษาที่ต้องการอัปเดต' });
        }

        res.status(500).json({ message: 'ไม่สามารถอัปเดตได้' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await prisma.student.delete({
            where: { id: req.params.id },
        });

        res.json({ message: 'ลบข้อมูลนักศึกษาสำเร็จ' });
    } catch (err: any) {
        console.error('DELETE error:', err);

        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'ไม่พบนักศึกษาที่ต้องการลบ' });
        }

        res.status(500).json({ message: 'ไม่สามารถลบได้' });
    }
});

export default router;
