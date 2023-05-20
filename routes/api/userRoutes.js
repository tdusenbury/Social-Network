const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    getAllUsers,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController')


//api/users = get.getAllUsers & post.createUser
router.route('/').get(getAllUsers).post(createUser);

//api/users/:userId = get.getSingleUser & delete.deleteUser & put.updateUser
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

//api/users/:userId/reactions = post.addFriend
router.route('/:userId/friends/:friendId').post(addFriend);

//api/users/:userId/reactions/:reactionId = delete.removeFriend 
router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;