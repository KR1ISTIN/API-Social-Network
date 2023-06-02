const mongoose = require('mongoose'); 
const reactionSchema = require('./Reaction')

// creating a schema to create a layout for each document
const thoughtSchema = new mongoose.Schema({
    thoughtText: { 
        type: String, 
        required: true, 
        minLength: 1,
        maxLength: 280  
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        // get: (date) => {
        //     if (date) return date.ISOString().split('T')[0];
        // }
    },
    username: {
        type: String,
        required: true
    },
   
    reactions: 
    [reactionSchema]
},
{
    timestamps: true,
    toJSON: {
    virtuals: true,
    getters: true
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// creating a model with our schema
const Thought = mongoose.model('Thought', thoughtSchema);



module.exports = Thought;