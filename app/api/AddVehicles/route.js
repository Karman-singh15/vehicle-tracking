import connectMongodb from "@/libs/mongodb";
import Delivery from "@/models/delivery";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {driver,end_position,total_time}=await request.json();
    await connectMongodb();
    await Delivery.create({driver,end_position,total_time});
    return NextResponse.json({message:"Delivery created successfully"},{status:201})
}
