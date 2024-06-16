import express from 'express';
import Therapist from '../models/therapistModel.js';

const therapistRouter = express.Router();
// get all users
therapistRouter.get('/', async (req, res) => {
    try {
        const therapists = await Therapist.find();
        res.json(therapists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add a new user
therapistRouter.post('/add-therapist', async (req, res) => {
    const therapist = new Therapist(req.body);
    try {
        const newTherapist = await therapist.save();
        res.status(201).json(newTherapist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// login success check by userName and password
therapistRouter.post('/login', async (req, res) => {
    const { therapistName, password } = req.body;

    try {
        // Check if there is a user with the same username and password
        const therapist = await Therapist.findOne({ therapistName, password });
        console.log(therapist);

        if (therapist) {
            // If a user with the provided details exists, proceed to the next page
            res.status(200).json({ message: 'Login successful' });
        } else {
            // If there is no user with the provided details, return an error
            res.status(401).json({ message: 'Incorrect therapist name or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update user by userName
therapistRouter.put('/:therapistName', async (req, res) => {
    const therapistName = req.params.userName;
    const updatedUserInfo = req.body;

    try {
        // Find the user by userName and update its information
        const updatedTherapist = await Therapist.findOneAndUpdate({ therapistName }, updatedUserInfo, { new: true });

        if (updatedTherapist) {
            res.status(200).json(updatedTherapist);
        } else {
            res.status(404).json({ message: 'therapist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete user by userName
therapistRouter.delete('/:userName', async (req, res) => {
    const therapistName = req.params.userName;

    try {
        // Find the user by userName and delete it
        const deletedTherapist = await Therapist.findOneAndDelete({ therapistName });
        console.log(deletedTherapist)

        if (deletedTherapist) {
            res.status(200).json({ message: 'therapist deleted successfully',  deletedTherapist });
        } else {
            res.status(404).json({ message: 'therapist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default therapistRouter;
