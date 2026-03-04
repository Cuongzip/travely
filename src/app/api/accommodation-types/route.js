import dbConnect from "@/lib/mongodb";
import { AccommodationType } from "@/models";

export async function GET() {
    try {
        await dbConnect();
        const accommodationTypes = await AccommodationType.find({});
        return Response.json({ accommodationTypes }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
