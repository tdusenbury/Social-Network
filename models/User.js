const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');

//User model schema

const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email address'
            ],
        },
        //array of _id values referencing the Thought model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],

        //array of _id values referencing the User model (self-reference)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
        virtual: true
    },
    id: false
}
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;