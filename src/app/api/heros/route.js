import dbConnect from "@/lib/mongodb";
import { Hero } from "@/models";

export async function GET() {
    await dbConnect();
    const heroes = await Hero.find({});
    return Response.json({ heroes });
}
