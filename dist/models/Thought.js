import { Schema, model, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: (timestamp) => timestamp,
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    _id: false,
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: (timestamp) => timestamp,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: [reactionSchema],
    }
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
});
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
