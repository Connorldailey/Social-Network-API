import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';
import { Types } from 'mongoose';

// GET all thoughts /thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET thought by id /thoughts/:thoughtId
export const getThoughtById = async (req: Request, res: Response) => {
    const thoughtId = req.params.thoughtId;
    try {
        const thought = await Thought.findById({ _id: thoughtId });

        if (!thought) {
            res.status(404).json({
                message: 'Thought not found.'
            });
        }

        res.status(200).json(thought);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST create a new thought
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username, userId } = req.body;
    try {
        const thought = await Thought.create({
            thoughtText: thoughtText,
            username: username,
        });

        if (!thought) {
            res.status(404).json({
                message: 'Could not create thought.'
            });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: {thoughts: thought }},
            { new: true }
        );

        if (!user) {
            res.status(404).json({
                message: 'No user with this ID'
            });
        }

        res.status(200).json({ message: 'Thought added', thought });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// PUT update a thought by id /thoughts/:thoughtId
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id.' });
        }

        res.status(200).json(thought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE delete a thought by id /thoughts/:thoughtId
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId)

        if (!thought) {
            res.status(404).json({
                message: 'No thought with this id.'
            });
        }

        const thoughtId = new Types.ObjectId(req.params.thoughtId);
        await User.findOneAndUpdate(
            { thoughts: thoughtId },
            { $pull: { thoughts: thoughtId } },
            { new: true }
        );

        res.status(200).json({
            message: 'Thought successfully deleted.'
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST create a reaction /thoughts/:thoughtId/reactions
export const createReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { new: true }
        );

        if (!reaction) {
            res.status(404).json({
                message: 'Failed to create reaction.'
            });
        }

        res.status(200).json(reaction);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE delete a reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { new: true }
        );

        if (!thought) {
            res.status(404).json({
                message: 'Failed to delete reaction'
            });
        }

        res.status(200).json({
            message: 'Reaction successfully deleted', thought
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}