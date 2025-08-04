import { connect } from "@/database/dbconnext";
import { users } from "@/model/user.model.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
connect();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    if ([username, email, password].some((field) => field.trim() === "")) {
      return NextResponse.json(
        { error: "Provide all fields" },
        { status: 400 }
      );
    }

    const existinguser =await  users.findOne({ email });
    if (existinguser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const mongores =await users.create({ username, email, password:hashedpassword });
    return NextResponse.json(mongores);
  } catch (error) {
    console.log(error);
  }
}
