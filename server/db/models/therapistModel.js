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
    },
    daysAvailable: {
        Sunday: { type: Boolean, default: false },
        Monday: { type: Boolean, default: false },
        Tuesday: { type: Boolean, default: false },
        Wednesday: { type: Boolean, default: false },
        Thursday: { type: Boolean, default: false },
        Friday: { type: Boolean, default: false },
        Saturday: { type: Boolean, default: false }
    },
    availabilityHours: {
        type: [String] // Assuming hours will be stored as an array of strings like ['09:00-12:00', '14:00-18:00']
    },
    specializations: {
        type: [String] // Adding an array of strings to store specializations
    }
});

// Create the model
const Therapist = model("Therapist", therapistSchema);

export default Therapist;
