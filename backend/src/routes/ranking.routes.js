import { Router } from 'express';
import { RankingController } from '../controllers/RankingController.js';
const r = Router();
r.get('/top', RankingController.top);
export default r;
