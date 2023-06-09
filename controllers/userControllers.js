const {User, Thought} = require('../models');

module.exports = {
    // gets all users
    async getUsers(req,res) {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // find A user
    async findUser(req, res) {
      try {
        const findUser = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .populate('friends'._id);
        if (!findUser) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(findUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // creates new users 
    async createUser(req, res) {
      try {
        const createUser = await User.create(req.body);
        res.json(createUser);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // update a user
    async updateUser(req,res) {
   
      try {
        const userUpdate = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          {runValidators: true, new: true}
        );
        if (!userUpdate) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        //let newUsername = req.body.username
       
        //console.log(newUsername);
        // TRYING to update Thought Model on username when user updates their username
          // await Thought.findOneAndUpdate(
          
          //   {$set: {username: newUsername}}
          // )
        res.json(userUpdate);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // delete a user and thoughts assosicated with that user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts were deleted!' })

      } catch (err) {
        console.error()
        res.status(500).json(err);
      }
    },
    // create a friend
    async newFriend(req, res) {
      try {
        console.log(req.body)
        const newFriend = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { friends: req.body._id}},
          {runValidators: true, new: true}
        );
        
        if (!newFriend) {
          return res
            .status(404)
            .json({ message: 'no friend found' });
        }
        res.json(newFriend);
      } catch (err) {
        console.log(err);
        res.status(500).json({message: 'an error has occured'});
      }
    },
    // delete a friend
    async deleteFriend(req, res) {
      try {
        console.log(req.params.friendId)
        const deleteFriend = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId }}, 
          
        );
        if (!deleteFriend) {
          return res
            .status(404)
            .json({ message: 'friend deleted, but not associated with user' });
        }
        
        res.json({message: 'The friend has been successfully deleted'});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
}