// src/app.ts or src/server.ts
import express from 'express';
import weatherRoutes from './routes/weatherRoutes'; 
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', weatherRoutes); 

export default app;
