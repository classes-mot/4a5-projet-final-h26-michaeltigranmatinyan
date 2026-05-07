import express from 'express';
import { check } from 'express-validator';
import * as postsControllers from '../controllers/posts-controller.js';
import checkAuth from '../middlewares/check-auth.js';

const router = express.Router();

// ROUTES PUBLIQUES

router.get('/', postsControllers.getAllPosts);

router.get('/:id', postsControllers.getPostById);


// AUTHENTIFICATION
router.use(checkAuth); 


// ROUTES PROTÉGÉES 

router.post(
    '/',
    [
        check('titre').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    postsControllers.addPost
);

router.put(
    '/:id',
    [
        check('titre').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    postsControllers.updatePost
);

router.delete('/:id', postsControllers.deletePost);

export default router;
