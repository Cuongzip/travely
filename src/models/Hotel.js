import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        bedroomCount: { type: Number, required: true },
        area: { type: Number, required: true },
        rate: { type: Number, required: true },
    },
    { timestamps: true },
);

export default mongoose.models.hotel || mongoose.model("hotel", HotelSchema);
