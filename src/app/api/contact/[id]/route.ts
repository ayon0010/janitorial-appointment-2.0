import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const session = await auth();
    const isAdmin = session?.user.roles.includes("ADMIN");

    if (!session && !isAdmin) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    await prisma.contact.delete({
        where: { id },
    });

    return NextResponse.json({
        success: true,
        message: "Deleted Successfully",
    });
}