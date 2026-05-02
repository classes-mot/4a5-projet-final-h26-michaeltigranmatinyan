import express from 'express';
//import jeuxRoutes from './routes/jeux-routes.js'; 
import usersRoutes from './routes/users-routes.js';
import errorHandler from './handler/error-handler.js';
import { connectDB } from './util/bd.js';

await connectDB();

const app = express();

//Parse le code entrant pour ajouter une propriété body sur la request
app.use(express.json());

app.use(cors());

app.use('/api/jeux', jeuxRoutes); 
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.code = 404;
  next(error);
});

app.use(errorHandler);
// W Peco 🥹✌️
app.listen(5000, () => {
  console.log('serveur écoute au', `http://localhost:5000`);
});