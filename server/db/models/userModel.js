import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Define the schema
const userSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the model
const User = model("User", userSchema);

export default User;
