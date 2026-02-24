import { SignUpFormSchema } from "@/components/schema/SignUpSchema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendEmail, isResendConfigured } from "@/lib/resend";

const ADMIN_SIGNUP_EMAIL = "shariar.ayon128@gmail.com";

export async function POST(request: Request) {
    const data = await request.json();
    const validation = SignUpFormSchema.safeParse(data);
    if (!validation.success) {
        return NextResponse.json({ success: false, message: validation.error.message }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
        where: { email: validation.data.email },
    });
    if (existingUser) {
        return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 400 });
    }

    const password = await bcrypt.hash(validation.data.password, 10);
    const cityArray = validation.data.cities.split(',').map((city) => city.trim());
    const user = await prisma.user.create({
        data: {
            companyName: validation.data.companyName,
            email: validation.data.email,
            hashedPassword: password,
            serviceState: validation.data.serviceState,
            city: cityArray,
        },
    });
    if (!user) {
        return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
    }

    // Notify admin about new signup (non-blocking for the user)
    if (isResendConfigured()) {
        const safeCompany = validation.data.companyName || "Unknown company";
        const safeEmail = validation.data.email;
        const safeState = validation.data.serviceState || "N/A";
        const safeCities = cityArray.length ? cityArray.join(", ") : "N/A";
        void sendEmail({
            to: ADMIN_SIGNUP_EMAIL,
            subject: `New user signup: ${safeCompany} (${safeEmail})`,
            html: `
              <p>A new user has signed up on Janitorial Appointments.</p>
              <ul>
                <li><strong>Company:</strong> ${safeCompany}</li>
                <li><strong>Email:</strong> ${safeEmail}</li>
                <li><strong>Primary state:</strong> ${safeState}</li>
                <li><strong>Cities:</strong> ${safeCities}</li>
              </ul>
            `,
        });
    }

    return NextResponse.json({ success: true, message: 'User created successfully' }, { status: 201 });
}