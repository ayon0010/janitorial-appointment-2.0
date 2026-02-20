import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { ForgotPasswordSchema } from "@/components/schema/ForgotPasswordSchema";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const RESET_EXPIRY_HOURS = 1;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = ForgotPasswordSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json(
                { success: false, message: validated.error.issues[0]?.message || "Invalid email" },
                { status: 400 }
            );
        }

        const { email } = validated.data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.hashedPassword) {
            return NextResponse.json({
                success: true,
                message: "If an account exists with that email, you will receive a reset link.",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + RESET_EXPIRY_HOURS);

        await prisma.verification.deleteMany({
            where: { userId: user.id },
        });

        await prisma.verification.create({
            data: {
                token,
                userId: user.id,
                expiresAt,
            },
        });

        const resetUrl = `${SITE_URL}/reset-password/${token}`;

        if (resend) {
            const { error } = await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
                to: email,
                subject: "Reset your Janitorial Appointments password",
                html: `
                    <p>You requested a password reset for your Janitorial Appointments account.</p>
                    <p>Click the link below to reset your password (valid for ${RESET_EXPIRY_HOURS} hour):</p>
                    <p><a href="${resetUrl}">${resetUrl}</a></p>
                    <p>If you did not request this, please ignore this email.</p>
                `,
            });

            if (error) {
                console.error("Resend error:", error);
                return NextResponse.json(
                    { success: false, message: "Failed to send reset email. Please try again later." },
                    { status: 500 }
                );
            }
        } else {
            console.log("[DEV] Password reset link (no RESEND_API_KEY):", resetUrl);
        }

        return NextResponse.json({
            success: true,
            message: "If an account exists with that email, you will receive a reset link.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}