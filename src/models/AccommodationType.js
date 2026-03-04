import mongoose from "mongoose";

const accommodationTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true },
);

export default mongoose.models.accommodationType ||
    mongoose.model("accommodationType", accommodationTypeSchema);
