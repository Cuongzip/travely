import dbConnect from "@/lib/mongodb";
import { AccommodationType } from "@/models";

export async function GET() {
    await dbConnect();
    const accommodationTypes = await AccommodationType.find({});
    return Response.json({ accommodationTypes });
}
