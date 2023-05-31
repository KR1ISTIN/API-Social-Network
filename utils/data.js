const users = [
    {
        username: 'kristin1',
        email: 'kristin1@yahoo.com'
    }
];

const thoughts = [
    {
        thoughtText: 'Coding is fun',
        username: 'kristin1',
        // subdocument
        reactions: [
            {
                reactionBody: 'There are a ton of resources for it too',
                username: 'jayjay'
            }
        ]
    }
];

module.exports = {users, thoughts}