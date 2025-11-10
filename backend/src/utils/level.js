import { pool } from '../config/db.js';
export async function levelFor(points){
  const [rows] = await pool.query(
    'SELECT level FROM levels WHERE min_points <= ? ORDER BY level DESC LIMIT 1',
    [points]
  );
  return rows[0]?.level || 1;
}
