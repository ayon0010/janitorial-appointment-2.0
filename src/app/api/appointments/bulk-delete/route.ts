import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        const isAdmin = session?.user.roles.includes("ADMIN");

        if (!session || !isAdmin) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { success: false, message: "No IDs provided" },
                { status: 400 }
            );
        }

        await prisma.user.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Appointments deleted successfully",
        });
    } catch (error) {
        console.error("Bulk delete error:", error);

        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}