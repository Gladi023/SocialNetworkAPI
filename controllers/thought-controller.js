const { Thought, User } = require('../models');

const thoughtController = {
    async getThoughts({ params }, res) {
        try {
            const thoughtData = await Thought.find({});
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getThoughtByID({ params }, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: params.thoughtId });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with an id of ' + params.thoughtId + '!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addThought({ params, body }, res) {
        try {
            const newThought = await Thought.create(body);
            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: newThought._id } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'Invalid user data!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            res.json(err);
        }
    },
    // Update thoughts
    async updateThought({ params, body }, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, { runValidators: true, new: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with an id of ' + params.thoughtId + '!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            res.json(err);
        }
    },
    // Delete thoughts
    async deleteThought({ params }, res) {
        try {
            const thoughtData = await Thought.findByIdAndDelete({ _id: params.thoughtId }, { runValidators: true, new: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with an id of ' + params.thoughtId + '!' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            res.json(err);
        }
    },
    // add reaction
    async addReaction({ params, body}, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}},{ new: true, runValidators: true });
            if (!thoughtData) {
                res.status(404).json({message: 'Incorrect reaction'});
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            res.json(err);
        }
    },
    // delete reaction
    async deleteReaction({ params }, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate({ _id: params.thoughtId }, {$pull: {reactions: {reactionId : params.reactionId}}}, { runValidators: true, new: true });
            if (!thoughtData) {
                res.status(404).json({ message: 'Incorrect reaciton' });
                return;
            }
            res.json(thoughtData);
        } catch (err) {
            res.json(err);
        }
    }};


    module.exports = thoughtController;