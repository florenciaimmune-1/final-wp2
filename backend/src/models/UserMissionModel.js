import { pool } from '../config/db.js';

const VALID_STATES = ['SIN_EMPEZAR', 'EN_PROGRESO', 'COMPLETADA'];

export const UserMission = {
  accept: async ({ user_id, mission_id }) => {
    try {
      await pool.query(
        'INSERT INTO user_missions (user_id, mission_id, state) VALUES (?,?,?)',
        [user_id, mission_id, 'SIN_EMPEZAR']
      );
      return { created: true };
    } catch (err) {
      if (err && err.code === 'ER_DUP_ENTRY') {
        return { created: false, reason: 'already_exists' };
      }
      throw err;
    }
  },
  setState: async ({ user_id, mission_id, state, earned_points = 0 }) => {
    if (!VALID_STATES.includes(state)) {
      throw new Error('Invalid state');
    }

    const isCompletedTarget = state === 'COMPLETADA';
    const [res] = await pool.query(
      `
      UPDATE user_missions
         SET state = ?,
             earned_points = ?,
             completed_at = IF(? = 'COMPLETADA', NOW(), NULL)
       WHERE user_id = ?
         AND mission_id = ?
         AND state <> 'COMPLETADA'
      `,
      [state, earned_points, state, user_id, mission_id]
    );
    return { updated: res.affectedRows > 0, completed: isCompletedTarget };
  },

  myMissions: async (user_id) => {
    const [rows] = await pool.query(
      `
      SELECT um.*, m.title, m.description, m.base_points, m.difficulty
        FROM user_missions um
        JOIN missions m ON m.id = um.mission_id
       WHERE um.user_id = ?
       ORDER BY um.created_at DESC
      `,
      [user_id]
    );
    return rows;
  },
};
