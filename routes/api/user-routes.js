// Requires for routing
const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserByID,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Route for getting and displaying users
router.route('/')
.get(getUsers)
.post(addUser);

// Route for getting, updating, and deleting user by ID
router.route('/:id')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser);

// Route for adding and deleting friends
router.route('/:id/friends/:friendID')
.post(addFriend)
.delete(deleteFriend)


module.exports = router;