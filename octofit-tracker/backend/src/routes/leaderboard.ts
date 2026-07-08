import express from 'express';
import { Team, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
      .sort({ points: -1, totalDistance: -1 })
      .limit(10)
      .select('name totalActivities totalDistance points');

    const teams = await Team.find()
      .sort({ points: -1, totalDistance: -1 })
      .limit(10)
      .select('name totalActivities totalDistance points');

    res.json({ users, teams });
  } catch (error) {
    next(error);
  }
});

export default router;
