import connectMongodb from "@/libs/mongodb";
import Delivery from "@/models/delivery";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {driver,end_position,total_time}=await request.json();
    await connectMongodb();
    await Delivery.create({driver,end_position,total_time});
    return NextResponse.json({message:"Delivery created successfully"},{status:201})
}

export async function GET() {
    await connectMongodb();
    const deliveries=await Delivery.find({});
    return NextResponse.json({deliveries},{status:200});
}

export async function DELETE(request) {
    const id=request.nextUrl.searchParams.get("id");
    await connectMongodb();
    await Delivery.findByIdAndDelete(id);
    return NextResponse.json({message:"Delivery deleted successfully"},{status:200});
}