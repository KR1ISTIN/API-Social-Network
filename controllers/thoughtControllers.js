const {Thought, User} = require('../models');

module.exports ={
    // all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // find one thought
      async findThought(req, res) {
        try {
          const oneThought = await Thought.findOne({ _id: req.params.thoughtId });
    
          if (!oneThought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(oneThought);
        } catch (err) {
          res.status(500).json(err)
        }
      },
      // create a thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } }, // ref the thoughts column in users table
            { new: true }
          );
          if (!user) {
            return res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' });
          }
          res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
};