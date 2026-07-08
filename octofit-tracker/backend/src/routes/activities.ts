import express from 'express';
import { Activity, Team, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .populate('user', 'name')
      .populate('team', 'name');

    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      userId,
      teamId,
      type,
      distance = 0,
      duration = 0,
      calories = 0,
      timestamp,
    } = req.body;

    if (!userId || !type) {
      return res.status(400).json({ error: 'userId and type are required' });
    }

    const activity = await Activity.create({
      user: userId,
      team: teamId,
      type,
      distance,
      duration,
      calories,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    const points = Math.max(Math.round(distance * 2 + duration * 0.1 + calories * 0.05), 5);

    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalActivities: 1,
        totalDistance: distance,
        points,
      },
    });

    if (teamId) {
      await Team.findByIdAndUpdate(teamId, {
        $inc: {
          totalActivities: 1,
          totalDistance: distance,
          points,
        },
      });
    }

    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

export default router;
