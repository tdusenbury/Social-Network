const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//createUser,getSingleUser,getAllUsers,updateUser,deleteUser,addFriend,removeFriend,

module.exports = {
    
//createUser
    createUser(req, res) {
        User.create(req.body)
            .then((user) =>
                res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
        },

//getSingleUser
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then(async (user) => 
                !user 
                    ? res.status(400).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                    })
                )
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
            },

//getAllUsers
    getAllUsers(req, res) {
        User.find()
            .select("-__v")
                .then(async (users) => {
                    const userObj = {
                        users,  
                };
                    return res.json(userObj);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
            },


//updateUser
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id' })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err));
        },

//deleteUser,
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id exists' })
                    : User.findOneAndUpdate(
                        { users: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'User deleted, but no thoughts found'
                    })
                : res.json({ message: 'User has been deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

//addFriend
    addFriend(req, res) {
        console.log('Thank you for adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json({ message: 'Your friend has been deleted'})
            )
            .catch((err) => res.status(500).json(err));
    },

//removeFriend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json({ message: 'friend deleted' })
        )
            .catch((err) =>
                res.status(500).json(err));
    },
};


