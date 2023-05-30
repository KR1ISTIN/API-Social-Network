const mongoose = require('mongoose'); 
const Schema = require('mongoose'); 

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: (date) => {
        //     if (date) return date.ISOString().split('T')[0];
        // }
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
});



module.exports = reactionSchema