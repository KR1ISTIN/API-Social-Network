const router = require('express').Router();
const {
  getUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend
} = require('../../controllers/userControllers');

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(findUser)
  .put(updateUser)
  .delete(deleteUser);

  router.route('/:userId/friends').post(newFriend)
  router.route('/:userId/friends/:friendId').delete(deleteFriend)

module.exports = router;