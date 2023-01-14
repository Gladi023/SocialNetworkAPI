//mongoose is req
const { Schema, model, Types } = require('mongoose');
// Requires dateFormat
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: [({ length }) => length > 0 && length <= 280, 'Thoughts can only be between 1 and 280 characters long!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;