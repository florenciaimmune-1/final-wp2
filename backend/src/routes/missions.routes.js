import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { MissionController } from '../controllers/MissionController.js';

const r = Router();

r.get('/', MissionController.list);
r.get('/mine', auth, MissionController.mine);
r.post('/accept', auth, MissionController.accept);
r.post('/state', auth, MissionController.setState);
r.post('/', auth, requireRole('MAESTRO'), MissionController.create);
r.put('/:id', auth, requireRole('MAESTRO'), MissionController.update);
r.delete('/:id', auth, requireRole('MAESTRO'), MissionController.remove);

export default r;


