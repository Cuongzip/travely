import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        backgroundImg: { type: String, required: true },
        locations: {
            name: { type: String, required: true },
            image: { type: String, required: true },
        },
    },
    { timestamps: true },
);

export default mongoose.models.hero ||
    mongoose.model("hero", HeroSchema, "heroes");
