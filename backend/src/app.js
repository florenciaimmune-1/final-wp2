import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import missionRoutes from './routes/missions.routes.js';
import rankingRoutes from './routes/ranking.routes.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/ranking', rankingRoutes);

export default app;
