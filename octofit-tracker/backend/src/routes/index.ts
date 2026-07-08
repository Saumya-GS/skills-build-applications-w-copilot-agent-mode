import express from 'express';
import activitiesRouter from './activities.js';
import leaderboardRouter from './leaderboard.js';
import teamsRouter from './teams.js';
import usersRouter from './users.js';
import workoutsRouter from './workouts.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/teams', teamsRouter);
router.use('/activities', activitiesRouter);
router.use('/workouts', workoutsRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
