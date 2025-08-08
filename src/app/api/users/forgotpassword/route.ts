import { connect } from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/models/mailer";

connect();

export async function POST(request:NextRequest){
    try {
      const reqBody = await request.json();
      const { email } = reqBody;

      //checking if the user exists

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "User not found" });
      }

      await sendEmail({
        email: user.email,
        emailType:"RESET",
        userId: user._id
      })

        return NextResponse.json(
          { message: "Password reset email sent successfully" },
          { status: 200 }
        );
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
        
    }
}