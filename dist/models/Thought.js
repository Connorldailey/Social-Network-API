import { Schema, model, Types } from 'mongoose';
import { format } from 'date-fns';
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
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
        transform: (_doc, ret) => {
            if (ret.createdAt) {
                ret.createdAt = format(ret.createdAt, "MMMM dd, yyyy 'at' hh:mm a");
            }
            return ret;
        },
    },
    id: false,
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
        transform: (_doc, ret) => {
            delete ret.__v; // Remove __v field
            if (ret.createdAt) {
                ret.createdAt = format(ret.createdAt, "MMMM dd, yyyy 'at' hh:mm a");
            }
            return ret;
        },
    },
    id: false,
    timestamps: false,
});
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
