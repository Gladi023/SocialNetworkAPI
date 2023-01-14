//  Mongoose is req
const { Schema, model, Types } = require('mongoose');
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [],
        friends: [this]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
const User = model('User', userSchema);
module.exports = User;