import { pool } from '../config/db.js';
export const RankingController = {
  top: async (req, res) => {
    const [rows] = await pool.query(
      'SELECT id,name,points,level,avatar_url FROM users ORDER BY points DESC, level DESC LIMIT 50'
    );
    res.json(rows);
  }
};
