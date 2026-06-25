import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
 
  const { userId,sessionClaims } =await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const username=sessionClaims?.username;

  const { name, email, phone,role } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const owner = await prisma.user.create({
      data: { clerkUserId: userId, name, email, phone, username, role },
    });


    return NextResponse.json(
  { owner, message: "Registration completed" },
  { status: 201 }
);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
