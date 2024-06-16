import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Define the schema
const therapistSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    therapistId: {
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
    therapistName: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    licenseAndCertifications: {
        type: [String] // Assuming multiple certifications can be stored as an array of strings
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    hourlyRate: {
        type: Number
    },

    notes: {
        type: String
    }
});

// Create the model
const Therapist = model("Therapist", therapistSchema);

export default Therapist;
