import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'
import { success } from 'zod';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const { id } = await params;
    const session = await auth();
    const isAdmin = session?.user.roles.includes('ADMIN');

    if (!isAdmin && !session) {
        return NextResponse.json({ success: false, message: 'Unauthorized' })
    }

    const deleteData = await prisma.message.delete({
        where: {
            id: id
        }
    })




    return NextResponse.json({ success: true, message: 'Deleted Successfully' })
}