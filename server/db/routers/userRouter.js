import express from 'express';
import User from '../models/userModel.js';

const userRouter = express.Router();
// get all users
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add a new user
userRouter.post('/add-user', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// login success check by userName and password
userRouter.get('/login', async (req, res) => {
    const { userName, password } = req.query;

    try {
        // Check if there is a user with the same username and password
        const user = await User.findOne({ userName, password });
        console.log(user);

        if (user) {
            // If a user with the provided details exists, proceed to the next page
            res.status(200).json({ message: 'Login successful' });
        } else {
            // If there is no user with the provided details, return an error
            res.status(401).json({ message: 'Incorrect username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user by userName
userRouter.put('/:userName', async (req, res) => {
    const userName = req.params.userName;
    const updatedUserInfo = req.body;

    try {
        // Find the user by userName and update its information
        const updatedUser = await User.findOneAndUpdate({ userName }, updatedUserInfo, { new: true });

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete user by userName
userRouter.delete('/:userName', async (req, res) => {
    const userName = req.params.userName;

    try {
        // Find the user by userName and delete it
        const deletedUser = await User.findOneAndDelete({ userName });
        console.log(deletedUser)

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default userRouter;
