import { connect } from "mongoose";

async function connectDB() {
    try {
        await connect("mongodb://127.0.0.1:27017/final-project");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

export default connectDB;
