import { pool } from '../config/db.js';

export const User = {
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    return rows[0] || null;
  },
  findPublicById: async (id) => {
    const [rows] = await pool.query(
      'SELECT id,name,email,role,points,level,avatar_url,bio FROM users WHERE id=?',[id]
    );
    return rows[0] || null;
  },
  create: async ({ name, email, password_hash }) => {
    const [res] = await pool.query(
      'INSERT INTO users(name,email,password_hash) VALUES (?,?,?)',
      [name, email, password_hash]
    );
    return res.insertId;
  },
  updateProfile: async (id, { name, avatar_url, bio }) => {
    await pool.query('UPDATE users SET name=?, avatar_url=?, bio=? WHERE id=?',
      [name, avatar_url, bio, id]);
  },
};
