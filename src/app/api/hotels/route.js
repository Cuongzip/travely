import dbConnect from "@/lib/mongodb";
import { Hotel } from "@/models";

export async function GET() {
    try {
        await dbConnect();
        const hotels = await Hotel.find({});
        return Response.json({ hotels }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
