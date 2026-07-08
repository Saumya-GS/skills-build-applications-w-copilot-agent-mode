import express from 'express';
import { Team, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().populate('team', 'name description');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('team', 'name description');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, teamId } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = await User.create({
      name,
      email,
      team: teamId,
    });

    if (teamId) {
      await Team.findByIdAndUpdate(teamId, { $addToSet: { members: newUser._id } });
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;
