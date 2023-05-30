const router = require('express').Router();
const {
 createThought,
 getThoughts,
 findThought
} = require('../../controllers/thoughtControllers');

router
.route('/')
.get(getThoughts)
.post(createThought)

router
.route('/:thoughtId')
.get(findThought);


module.exports = router;



