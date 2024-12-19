import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';
const router = Router();
router.route('/')
    .get(getAllThoughts)
    .post(createThought);
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
export { router as thoughtRouter };
