import dbConnect from "@/lib/mongodb";
import { Hotel } from "@/models";

export async function GET() {
    await dbConnect();
    const hotels = await Hotel.find({});
    return Response.json({ hotels });
}
