const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

//createThought
    createThought(req, res) {
        Thought.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
        },

//getSingleThought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID has been found' })
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    }, 
        
//getAllThoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
//updateThought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this ID'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

//deleteThought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this ID' })
                : Thought.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            )
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thoughts found' })
                : res.json({ message: 'Thought has been deleted'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        }, 
        
//addReaction
    addReaction(req, res) {
        console.log('You have added a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((reaction) => 
                !reaction
                    ? res.status(404).json({ message: 'No thought with that ID has been found'})
                    : res.json(reaction)
        )
            .catch((err) => res.status(500).json(err));
    },

//deleteReaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true}
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};