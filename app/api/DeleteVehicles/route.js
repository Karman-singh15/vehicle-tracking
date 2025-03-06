import connectMongodb from "@/libs/mongodb";
import Delivery from "@/models/delivery";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const id=request.nextUrl.searchParams.get("id");
    await connectMongodb();
    await Delivery.findByIdAndDelete(id);
    return NextResponse.json({message:"Delivery deleted successfully"},{status:200});
}
