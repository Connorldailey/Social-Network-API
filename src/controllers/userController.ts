import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET all users /users
export const getAllUsers = async (_req: Request, res: Response) =>  {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET user by id /users/:id
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'User not found.'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST a new user /users
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// PUT update a user by id /user/:id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user with this id.' });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE remove a user by id /users/:id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No user with this id.' });
        } else {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.status(200).json({
                message: 'User and thoughts deleted.'
            });
        }
        
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST add a new friend to a user's friend list /:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;

        // Check if friend exists
        const friend = await User.findById(friendId);
        if (!friend) {
            res.status(404).json({ message: 'Friend not found.' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId }},
            { new: true}
        );

        if (!user) {
            res.status(404).json({
                message: 'No user with this ID'
            });
        }

        res.status(200).json({ message: 'Friend added.', user });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE remove a friend from a user's friend list /:userId/friends/:friendId
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId }},
            { new: true }
        );

        if (!user) {
            res.status(404).json({
                message: 'No user with this id.'
            });
        }

        res.status(200).json({ message: 'Friend successfully deleted.', user });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

