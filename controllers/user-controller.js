const userController = {
    async getUsers(req, res) {
        try {
            const userData = await User.find({});
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addUser({ body }, res) {
        try {
            const userData = await User.create(body);
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async getUserByID({ params }, res) {
        try {
            const userData = await User.findOne({ _id: params.id });
            if (!userData) {
                res.status(404).json({ message: 'No user found with an id of ' + params.id + '!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
 // Update user
 async updateUser({ params, body }, res) {
    try {
        const userData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
        if(!userData) {
            res.status(404).json({ message: 'No user found with an id of ' + params.id + '!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
},
// Delete user
async deleteUser({params}, res) {
    try {
        const userData = await User.findOneAndDelete({_id: params.id});
        if(!userData) {
            res.status(404).json({ message: 'No user found with an id of ' + params.id + '!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
},
// Add friend
async addFriend({params}, res){
    try {
        const userData = await User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendID}},
            {runValidators: true, new: true}
        );
        if(!userData) {
            res.status(404).json({ message: 'No user found with an id of ' + params.id + '!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
},
// Delete friend
async deleteFriend({params}, res) {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendID } },
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({ message: 'No user found with an id of ' + params.id + '!' });
        }
        res.json(userData);
    } catch (err) {
        res.json(err);
    }
}
}

module.exports = userController;

