import User from '../models/user.js'; 
import HttpError from '../util/http-error.js';
import jwt from 'jsonwebtoken';

// POST Inscription de l'utilisateur
export const registerUser = async (req, res, next) => {
    const { username, password } = req.body; 

    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    } catch (err) {
        return next(new HttpError('Enregistrement échoué, veuillez réessayer plus tard.', 500));
    }

    if (existingUser) {
        return next(new HttpError('Un utilisateur avec ce nom d\\'utilisateur existe déjà.', 422));
    }

    const createdUser = new User({
        username,
        password 
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(new HttpError('Enregistrement échoué, veuillez réessayer.', 500));
    }

    //JWT
    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, username: createdUser.username },
            'cle',
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Erreur lors de la génération du jeton.', 500));
    }
    //confirm
    res.status(201).json({ userId: createdUser.id, username: createdUser.username, token: token });
};

// POST Connexion de l'utilisateur
export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    } catch (err) {
        return next(new HttpError('Échec de connexion, veuillez réessayer.', 500));
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Identification échouée, vérifiez vos identifiants.', 401));
    }

    //JWT
    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, username: existingUser.username },
            'cle',
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Erreur lors de la génération du cle.', 500));
    }

    // confirm
    res.status(200).json({ userId: existingUser.id, username: existingUser.username, token: token });
};
