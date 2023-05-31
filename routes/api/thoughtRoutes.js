const router = require('express').Router();
const {
 createThought,
 getThoughts,
 findThought,
 updateThought,
 deleteThought
} = require('../../controllers/thoughtControllers');

router
.route('/')
.get(getThoughts)
.post(createThought)


router
.route('/:thoughtId')
.get(findThought)
.put(updateThought)
.delete(deleteThought)


module.exports = router;



