import express from 'express';
import User from '../models/userModel.js';

const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new user
userRouter.post('/add-user', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login success check by userName and password
userRouter.get('/login', async (req, res) => {
    const { userName, password } = req.query;

    try {
        // Check if there is a user with the same username and password
        const user = await User.findOne({ userName, password }).select('-password');
        console.log(user);

        if (user) {
            // If a user with the provided details exists, return user details
            res.status(200).json({ message: 'Login successful', user });
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
        console.log(deletedUser);

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
userRouter.get('/user-by-id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by userName
userRouter.get('/user-by-name/:userName', async (req, res) => {
    const { userName } = req.params;

    try {
        const user = await User.findOne({ userName });
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default userRouter;
