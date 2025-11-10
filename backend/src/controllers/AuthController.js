import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';

export const AuthController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Faltan datos' });
    const exists = await User.findByEmail(email);
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });
    const hash = await bcrypt.hash(password, 10);
    const id = await User.create({ name, email, password_hash: hash });
    const token = jwt.sign({ id, role: 'AVENTURERO' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  },
};
