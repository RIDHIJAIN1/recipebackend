import express from 'express';
import userRouter from './routes/user.js';
import recipeRouter from './routes/recipe.js';
import favouriteRouter from './routes/favourite.js';
import multer from 'multer';
import { newRecipe } from './controller/recipe.js';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname with ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const app = express();

config({
  path: './data/config.env',
});

// Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipe', recipeRouter);
app.use('/api/v1/favourite', favouriteRouter);
app.post('/api/v1/recipe/new', upload.single('image'), newRecipe);

// Using error middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Nice working');
});
