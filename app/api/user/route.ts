import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import { userSchema } from "@/lib/validationSchema";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { name, email, password } = userSchema.parse(body);
    // check if email already exist
    const existingUserByEail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exist",
        },
        { status: 409 }
      );
    }
    // existingUserByEail can also be apply to Username
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Something went wrong!" },
      { status: 409 }
    );
  }
}
