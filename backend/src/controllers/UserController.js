import { User } from '../models/UserModel.js';
import { pool } from '../config/db.js';
import { levelFor } from '../utils/level.js';
import { UserMission } from '../models/UserMissionModel.js';

export const UserController = {
  me: async (req, res) => {
    const data = await User.findPublicById(req.user.id);
    res.json(data);
  },
  update: async (req, res) => {
    const { name, avatar_url, bio } = req.body;
    await User.updateProfile(req.user.id, { name, avatar_url, bio });
    res.json({ ok: true });
  },
  completeMission: async (req, res) => {
    const { mission_id, earned_points } = req.body;
    await UserMission.setState({ user_id: req.user.id, mission_id, state: 'COMPLETADA', earned_points });
    await pool.query('UPDATE users SET points = points + ? WHERE id=?', [earned_points, req.user.id]);
    const [[{ points }]] = await pool.query('SELECT points FROM users WHERE id=?', [req.user.id]);
    const level = await levelFor(points);
    await pool.query('UPDATE users SET level=? WHERE id=?', [level, req.user.id]);
    res.json({ points, level });
  },
};
