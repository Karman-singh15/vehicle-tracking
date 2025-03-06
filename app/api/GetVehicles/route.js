import connectMongodb from "@/libs/mongodb";
import Delivery from "@/models/delivery";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongodb();
    const deliveries=await Delivery.find({});
    return NextResponse.json({deliveries},{status:200});
}
