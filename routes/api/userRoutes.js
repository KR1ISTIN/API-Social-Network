const router = require('express').Router();
const {
  getUsers,
  findUser,
  createUser,
  updateUser
} = require('../../controllers/userControllers');

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(findUser)
  .put(updateUser);

module.exports = router;