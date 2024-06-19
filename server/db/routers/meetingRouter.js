import express from 'express';
import Meeting from '../models/meetingModel.js';
import Therapist from '../models/therapistModel.js';
import User from '../models/userModel.js';

const meetingRouter = express.Router();

// Get all meetings
meetingRouter.get('/', async (req, res) => {
    try {
        const meetings = await Meeting.find().populate('therapistId').populate('userId');
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new meeting
meetingRouter.post('/add-meeting', async (req, res) => {
    const { therapistId, userId, time, hour } = req.body;

    try {
        // Check if therapist exists
        const therapist = await Therapist.findById(therapistId);
        if (!therapist) {
            return res.status(404).json({ message: 'Therapist not found' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create and save the meeting
        const meeting = new Meeting({
            therapistId,
            userId,
            time,
            hour

        });
        await meeting.save();

        res.status(201).json(meeting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default meetingRouter;
