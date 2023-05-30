const router = require('express').Router();
const {
 createThought,
 getThoughts,
 findThought,
 updateThought
} = require('../../controllers/thoughtControllers');

router
.route('/')
.get(getThoughts)
.post(createThought)

router
.route('/:thoughtId')
.get(findThought)
.put(updateThought)


module.exports = router;



