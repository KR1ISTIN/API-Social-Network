const router = require('express').Router();
const {
 createThought,
 getThoughts,
 findThought,
 updateThought,
 deleteThought,
 createReaction,
 deleteReaction,
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

router.route('/:thoughtId/reactions').post(createReaction)
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);


module.exports = router;



