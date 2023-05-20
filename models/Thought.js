const { Schema, model } = require('mongoose');
const moment = require('moment');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format("MM/DD/YYYY"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionsSchema 
        ],
    },
);

    // Array of nested documents created with the reactionSchema
    /// Does this need to be first to be called on in thoughtSchema???
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: DataTransfer.now,
            get: (date) => moment(date).format("MM/DD/YYYY"),
        },
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;