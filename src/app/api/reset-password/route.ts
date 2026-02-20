import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ResetPasswordSchema } from "@/components/schema/ResetPasswordSchema";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token, password, confirmPassword } = body;

        if (!token || typeof token !== "string") {
            return NextResponse.json(
                { success: false, message: "Invalid or missing reset link. Please request a new one." },
                { status: 400 }
            );
        }

        const validated = ResetPasswordSchema.safeParse({ password, confirmPassword });
        if (!validated.success) {
            const msg = validated.error.issues[0]?.message ?? "Invalid password";
            return NextResponse.json({ success: false, message: msg }, { status: 400 });
        }

        const verification = await prisma.verification.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!verification) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired reset link. Please request a new one." },
                { status: 400 }
            );
        }

        if (verification.expiresAt < new Date()) {
            await prisma.verification.delete({ where: { id: verification.id } }).catch(() => { });
            return NextResponse.json(
                { success: false, message: "This reset link has expired. Please request a new one." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(validated.data.password, 10);

        await prisma.$transaction([
            prisma.user.update({
                where: { id: verification.userId },
                data: { hashedPassword },
            }),
            prisma.verification.delete({ where: { id: verification.id } }),
        ]);

        return NextResponse.json({
            success: true,
            message: "Your password has been reset. You can now sign in.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
