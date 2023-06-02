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
            { username: req.body.username }, // find the username in the user table that is equal to the username in the req.body from thought model
            { $push: { thoughts: thought._id } }, // ref the thoughts column in users table
            {runValidators: true, new: true}
          );
          console.log(user);
          if (!user) {
            return res
              .status(404)
              .json({ message: 'Thought created, but no user found with that username' });
          }
          res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      // update a thought 
      async updateThought(req,res) {
        try {
          const thoughtUpdate = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            {runValidators: true, new: true}
          );
          if (!thoughtUpdate) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          //console.log(req.body)
          res.json(thoughtUpdate);

        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      // delete a thought and remove it from assosicated user
      async deleteThought(req, res) {
        try {
          const deleteThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
          if (!deleteThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },  // find the thoughts in the user table that is equal to req.params with the thoughtId that was passed
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'Deleted thought, but no user with this id!' });
          }
          res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // create a reaction
      async createReaction(req, res) {
        try {
          //console.log(req.body)
          const createReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },//  find id based on the req.params Then ruhn line 95
            { $push: { reactions: req.body }}, // push the req.body on the reactions array
            {runValidators: true, new: true}
          );
          
          if (!createReaction) {
            return res
              .status(404)
              .json({ message: 'Reaction created, but not associated' });
          }
          res.json(createReaction);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      // delete reaction
      async deleteReaction(req, res) {
        try {
          console.log(req.params.reactionId)
          const deleteReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId }}}, 
            
          );
          if (!deleteReaction) {
            return res
              .status(404)
              .json({ message: 'Reaction deleted, but not associated with thought' });
          }
          
          res.json({message: 'Reaction has been deleted'});
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
};