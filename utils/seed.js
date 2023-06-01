const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {users, thoughts} = require('./data');


connection.once('open', async () => {
    console.log('connected to database successful!')
    try {
        await User.deleteMany();
        await Thought.deleteMany();

        const newUser = await User.insertMany(users) // returns a newUser array
        const thoughtsOfUser = thoughts.map((thought) => { // returns a array, but maps through the thoughts and takes each thought then performs a task
            const user = newUser.find((user)=>  // the task: user is equal to a user from the newUser array and finds the "user" where user.username is stricly equal to thoughts.username
                user.username === thought.username // so now match user.username to thought.username which is now equal to the const user
            );
            return { ...thought, username: user.username}// return everything in thought and add add a new properpty called username where is is equal to user.username
        })
        await Thought.insertMany(thoughtsOfUser) // now take thoughtsOfUser and insert the results into the Thought Model
        process.exit(0)
    } catch (err) {
        console.error('problem seeding', err)
        process.exit(1)
    }
});

