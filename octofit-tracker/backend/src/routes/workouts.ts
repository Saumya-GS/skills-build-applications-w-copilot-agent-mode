import express from 'express';
import { Workout } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const workouts = await Workout.find()
      .sort({ scheduledAt: 1 })
      .populate('user', 'name');

    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, name, type, intensity = 'Moderate', scheduledAt, notes = '' } = req.body;

    if (!userId || !name || !type || !scheduledAt) {
      return res.status(400).json({ error: 'userId, name, type, and scheduledAt are required' });
    }

    const workout = await Workout.create({
      user: userId,
      name,
      type,
      intensity,
      scheduledAt: new Date(scheduledAt),
      notes,
    });

    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;
