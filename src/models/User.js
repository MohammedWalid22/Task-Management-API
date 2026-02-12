const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
  const values = [username, email, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById };