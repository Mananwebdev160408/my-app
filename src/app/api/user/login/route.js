import bcrypt from "bcrypt";
import { connect } from "@/database/dbconnext";
import { users } from "@/model/user.model.js";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if([email,password].some((field)=>field.trim()==="")) return NextResponse.json({error:"Provide all fields"},{status:400})
    const mongofindres = await users.findOne({ email });
    if (!mongofindres)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    const isPassswordCorrect = await bcrypt.compare(
      password,
      mongofindres.password
    );
    if (!isPassswordCorrect)
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 400 }
      );
    return NextResponse.json(mongofindres);
  } catch (error) {
    console.log(error);
  }
}
