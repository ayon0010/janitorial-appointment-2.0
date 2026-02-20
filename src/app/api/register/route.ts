import { SignUpFormSchema } from "@/components/schema/SignUpSchema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


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
    return NextResponse.json({ success: true, message: 'User created successfully' }, { status: 201 });
}