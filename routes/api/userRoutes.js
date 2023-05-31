const router = require('express').Router();
const {
  getUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser
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

module.exports = router;