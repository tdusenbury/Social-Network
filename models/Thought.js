const { Schema, model } = require('mongoose');
const moment = require('moment');


    // Array of nested documents created with the reactionSchema--Must be first to be called below
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
            default: Date.now,
            get: (date) => moment(date).format("MM/DD/YYYY"),
        },
    },
);

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
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;