import { Schema, model } from 'mongoose';
const validateEmail = function (email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
const userSchema = new Schema({
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
        validate: {
            validator: validateEmail,
            message: 'Please provide a valid email address',
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true
});
userSchema
    .virtual('friendCount')
    .get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
