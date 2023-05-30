const {mongoose,Schema} = require('mongoose'); 

// creating a schema to create a layout for each document
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trimmed: true
    },
    email: { type: String, 
        required: true,
        unique: true, 
        trimmed: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    }, 

    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
    virtuals: true,
    },
    id: false,
    }
  );

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// creating a model with our schema
const User = mongoose.model('User', userSchema);

module.exports = User;