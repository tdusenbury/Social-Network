const router = require('express').Router();
const {
    createThought,
    getSingleThought,
    getAllThoughts,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,

} = require('../../controllers/thoughtController');

//api/thoughts = get.getThoughts & post.createThought

router.route('/').get(getAllThoughts).post(createThought);

//api/:thoughtId/reaction = post.addReaction

router.route('/:thoughtId/reactions').post(addReaction);

//api/users/:userId/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//api/thoughts/:thoughtId = get.getSingleThought & put.updateThought & delete.deleteThought

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;