import User from '../models/user.js'; 
import HttpError from '../util/http-error.js';
import jwt from 'jsonwebtoken';

// POST Inscription de l'utilisateur
export const registerUser = async (req, res, next) => {
    const { username, password, phoneNumber } = req.body; 

    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    } catch (err) {
        return next(new HttpError('Enregistrement échoué, veuillez réessayer plus tard.', 500));
    }

    if (existingUser) {
        return next(new HttpError("Un utilisateur avec ce nom d'utilisateur existe déjà.", 422));
    }

    const createdUser = new User({
        username,
        password,
        phoneNumber
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

// GET Récupérer le profil pour les rafraichisement
export const getMe = async (req, res, next) => {
    const userId = req.userData.userId;

    let user;
    try {
        user = await User.findById(userId, '-password');
    } catch (err) {
        return next(new HttpError('Récupération du profil échouée.', 500));
    }

    if (!user) {
        return next(new HttpError('Utilisateur non trouvé.', 404));
    }

    res.json({ user: user.toObject({ getters: true }) });
};

// PUT Mettre à jour les informations de contact
export const updateProfile = async (req, res, next) => {
    const userId = req.userData.userId;
    const { username, password, phoneNumber } = req.body;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(new HttpError('Mise à jour échouée.', 500));
    }

    if (!user) {
        return next(new HttpError('Utilisateur non trouvé.', 404));
    }

    if (username) user.username = username;
    if (password) user.password = password;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    try {
        await user.save();
    } catch (err) {
        return next(new HttpError('Erreur lors de la sauvegarde du profil.', 500));
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

// POST Déconnexion
export const logoutUser = async (req, res, next) => {
    // Avec JWT, la déconnexion se fait côté client (suppression du token)
    res.status(200).json({ message: 'Déconnexion réussie.' });
};
