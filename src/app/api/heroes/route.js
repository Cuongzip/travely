import dbConnect from "@/lib/mongodb";
import { Hero } from "@/models";

export async function GET() {
    try {
        await dbConnect();
        const heroes = await Hero.find({});
        return Response.json({ heroes }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}
