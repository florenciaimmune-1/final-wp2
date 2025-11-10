import { pool } from '../config/db.js';

export const Mission = {
  allActive: async () => {
    const [rows] = await pool.query(
      'SELECT * FROM missions WHERE status="ACTIVA" ORDER BY id DESC'
    );
    return rows;
  },
  create: async ({ title, description, base_points, difficulty, created_by }) => {
    const [res] = await pool.query(
      'INSERT INTO missions(title,description,base_points,difficulty,created_by) VALUES (?,?,?,?,?)',
      [title, description, base_points, difficulty, created_by]
    );
    return res.insertId;
  },
  update: async (id, fields) => {
    const keys = Object.keys(fields);
    if (!keys.length) return;
    const set = keys.map(k => `${k}=?`).join(',');
    const values = Object.values(fields);
    await pool.query(`UPDATE missions SET ${set} WHERE id=?`, [...values, id]);
  },
  remove: async (id) => {
    await pool.query('DELETE FROM missions WHERE id=?', [id]);
  },
};
