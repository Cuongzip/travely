import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
    try {
        if (mongoose.connection.readyState === 1) return;
        await mongoose.connect(MONGODB_URI);
        console.log("Connect success");
    } catch (error) {
        console.log("Connect fail");
    }
}

export default dbConnect;
