import express from 'express';
import postsRoutes from './routes/posts-routes.js'; 
import usersRoutes from './routes/users-routes.js';
import errorHandler from './handler/error-handler.js';
import { connectDB } from './util/bd.js';

await connectDB();

const app = express();

//Parse le code entrant pour ajouter une propriété body sur la request Express
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE'); 
  next();
});

app.use('/api/items', postsRoutes); 
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.code = 404;
  next(error);
});

app.use(errorHandler);
// W Peco 🥹✌️
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('serveur écoute au', `http://localhost:${PORT}`);
});