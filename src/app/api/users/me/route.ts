import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";

import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function GET(request:NextRequest){
    try {
       const userId=await getDataFromToken(request)
       const user=await User.findById({_id:userId}).select("-password")

       return NextResponse.json({
        message:"User found",
        data:user
       })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}

	// •	Tumhara ek dashboard hai.
	// •	User login hota hai → token milta hai → token ke basis pe uska profile fetch hota hai → dikhate ho: “Welcome, Bhavya!”
	// •	Tab yeh code kaam aayega.