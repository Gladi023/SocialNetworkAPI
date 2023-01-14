const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Route for getting all thoughts
router.route('/')
.get(getThoughts)

// Route for posting user ID
router.route('/:userId')
.post(addThought)

// Route for thoughtId
router.route('/:thoughtId')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought)

// Route for adding a reaction
router.route('/:thoughtId/reactions')
.post(addReaction)

// Route for deleting a reaction
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;