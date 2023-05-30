const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {users, thoughts} = require('./data');

connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', async () => {
    console.log('connected to database successful!')
    try {
        await User.deleteMany();
        await Thought.deleteMany();

        const newUser = await User.insertMany(users)
        const thoughtsOfUser = thoughts.map((thought) => {
            const user = newUser.find((user)=> 
                user.username === thought.username
            );
            return { ...thought, username: user.username}
        })
        await Thought.insertMany(thoughtsOfUser)
        process.exit(0)
    } catch (err) {
        console.error('problem seeding', err)
        process.exit(1)
    }
});

