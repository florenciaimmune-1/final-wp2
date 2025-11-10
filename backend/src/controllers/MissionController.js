import { Mission } from '../models/MissionModel.js';
import { UserMission } from '../models/UserMissionModel.js';

const VALID_STATES = ['SIN_EMPEZAR','EN_PROGRESO','COMPLETADA'];

export const MissionController = {
  list: async (req, res) => {
    const rows = await Mission.allActive();
    res.json(rows);
  },

  create: async (req, res) => {
    const { title, description, base_points = 10, difficulty = 'FACIL' } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Faltan datos' });
    const id = await Mission.create({ title, description, base_points, difficulty, created_by: req.user.id });
    res.status(201).json({ id });
  },

  update: async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    await Mission.update(id, req.body);
    res.json({ ok: true });
  },

  remove: async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    await Mission.remove(id);
    res.json({ ok: true });
  },

  accept: async (req, res) => {
    const { mission_id } = req.body;
    if (!mission_id) return res.status(400).json({ error: 'mission_id requerido' });
    await UserMission.accept({ user_id: req.user.id, mission_id });
    res.status(201).json({ ok: true });
  },

  mine: async (req, res) => {
    const rows = await UserMission.myMissions(req.user.id);
    res.json(rows);
  },

  setState: async (req, res) => {
    const { mission_id, state } = req.body;
    if (!mission_id) return res.status(400).json({ error: 'mission_id requerido' });
    if (!VALID_STATES.includes(state)) return res.status(400).json({ error: 'Estado inválido' });
    await UserMission.setState({ user_id: req.user.id, mission_id, state });
    res.json({ ok: true });
  },
};
