const db = require('../config/db');
const sanitizeObject = require('../utils/sanitizeObject');

const createTask = async (userId, title, description) => {
  const query = 'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *';
  const result = await db.query(query, [userId, title, description]);
  return result.rows[0];
};

const getTasksByUser = async (userId, limit, cursor) => {
  let query = 'SELECT * FROM tasks WHERE user_id = $1';
  const params = [userId];

  if (cursor) {
    query += ' AND id > $2 ORDER BY id ASC LIMIT $3';
    params.push(cursor, limit);
  } else {
    query += ' ORDER BY id ASC LIMIT $2';
    params.push(limit);
  }

  const result = await db.query(query, params);
  return result.rows;
};

// Helper for ownership check
const findTaskByIdAndUser = async (taskId, userId) => {
  const result = await db.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
  const task = result.rows[0];

  if (!task) return { status: 'not_found' };
  // Use String conversion for safe comparison
  if (String(task.user_id) !== String(userId)) return { status: 'forbidden' };
  
  return { status: 'success', task };
};

const updateTask = async (taskId, userId, updates) => {
  // White-listing allowed fields
  const allowedFields = ['title', 'description', 'completed'];
  const fields = [];
  const values = [taskId, userId];
  let paramIndex = 3;

  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      fields.push(`${field} = $${paramIndex}`);
      values.push(updates[field]);
      paramIndex++;
    }
  });

  if (fields.length === 0) return null;

  const query = `
    UPDATE tasks 
    SET ${fields.join(', ')} 
    WHERE id = $1 AND user_id = $2 
    RETURNING *`;

  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteTask = async (taskId, userId) => {
  const result = await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id', [taskId, userId]);
  return result.rowCount > 0;
};

module.exports = { createTask, getTasksByUser, findTaskByIdAndUser, updateTask, deleteTask };