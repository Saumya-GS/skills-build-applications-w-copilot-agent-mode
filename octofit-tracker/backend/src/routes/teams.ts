import express from 'express';
import { Team, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email totalActivities totalDistance points');
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'name email totalActivities totalDistance points');

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description = '', memberIds = [] } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    const newTeam = await Team.create({
      name,
      description,
      members: memberIds,
    });

    if (memberIds.length > 0) {
      await User.updateMany(
        { _id: { $in: memberIds } },
        { team: newTeam._id }
      );
    }

    res.status(201).json(newTeam);
  } catch (error) {
    next(error);
  }
});

export default router;
