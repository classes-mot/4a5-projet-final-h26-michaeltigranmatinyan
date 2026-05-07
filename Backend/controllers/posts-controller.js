import { validationResult } from 'express-validator';
import { Post } from '../models/post.js';
import HttpError from '../util/http-error.js';

// GET All Posts
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('creator', 'username phoneNumber');
        res.json({ posts: posts.map(post => post.toObject({ getters: true })) });
    } catch (err) {
        return next(new HttpError('Erreur lors de la récupération des posts.', 500));
    }
};

// GET Post par id
export const getPostById = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError('Post non trouvé.', 404));
        }
        res.json({ post: post.toObject({ getters: true }) });
    } catch (err) {
        return next(new HttpError('Une erreur BD est survenue.', 500));
    }
};

// POST Add Post
export const addPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Données invalides vérifier votre requête.', 422));
    }

    const { titre, description } = req.body;

    const nouveauPost = new Post({
        titre,
        description,
        creator: req.userData.userId
    });

    try {
        await nouveauPost.save();
        res.status(201).json({ post: nouveauPost.toObject({ getters: true }) });
    } catch (err) {
        return next(new HttpError('Création du post échouée.', 500));
    }
};

// DELETE Post
export const deletePost = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return next(new HttpError('Post non trouvé.', 404));
        }

        await post.deleteOne(); 

        res.status(200).json({ message: 'Post supprimé avec succès.' });

    } catch (err) {
        return next(new HttpError('Erreur lors de la suppression du post.', 500));
    }
};

// PATCH MAJ Post
export const updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Données invalides votre requête.', 422));
    }

    const postId = req.params.id;
    const { titre, description } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId, 
            { titre, description }, 
            { new: true } 
        );

        if (!updatedPost) {
            return next(new HttpError('Post non trouvé.', 404)); 
        }

        res.status(200).json({ post: updatedPost });

    } catch (err) {
        return next(new HttpError('Erreur de la mise à jour du post.', 500));
    }
};
