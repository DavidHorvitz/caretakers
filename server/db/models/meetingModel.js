import { Schema, model, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Define the schema
const meetingSchema = new Schema({
    meetingId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    therapistId: {
        type: Types.ObjectId,
        ref: 'Therapist',
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    hour:{
        type:String,
        required: true

    }
});

// Create the model
const Meeting = model("Meeting", meetingSchema);

export default Meeting;
