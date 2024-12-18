import { Schema, model, Document, Types } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: IReaction[],
}

const reactionSchema = new Schema<IReaction>(
    {
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
            get: (timestamp: Date) => timestamp,
        },
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        _id: false,
    },
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
            get: (timestamp: Date) => timestamp,          
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            type: [reactionSchema],
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function (this: IThought) {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

export default Thought;
