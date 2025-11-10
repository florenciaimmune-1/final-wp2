import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { UserController } from '../controllers/UserController.js';
const r = Router();
r.get('/me', auth, UserController.me);
r.put('/me', auth, UserController.update);
r.post('/complete', auth, UserController.completeMission);
export default r;
