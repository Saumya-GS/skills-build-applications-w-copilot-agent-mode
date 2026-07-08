import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with sample test data for Octofit Tracker.
 *
 * - 3 users with profile stats
 * - 2 teams with member relationships
 * - 3 activity logs spanning running, cycling, and swimming
 * - 3 scheduled workouts for workout planning
 */
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany(),
      Workout.deleteMany(),
      Team.deleteMany(),
      User.deleteMany(),
    ]);

    const users = await User.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        totalDistance: 120.7,
        totalActivities: 42,
        points: 930,
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        totalDistance: 97.4,
        totalActivities: 34,
        points: 780,
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        totalDistance: 85.6,
        totalActivities: 31,
        points: 720,
      },
    ]);

    const [alice, bob, carol] = users;

    const teams = await Team.create([
      {
        name: 'Morning Runners',
        description: 'Early risers who love a sunrise run',
        members: [alice._id, bob._id],
        totalDistance: 218.1,
        totalActivities: 76,
        points: 1710,
      },
      {
        name: 'Cycling Enthusiasts',
        description: 'Pedal power for every weekend ride',
        members: [carol._id],
        totalDistance: 85.6,
        totalActivities: 31,
        points: 720,
      },
    ]);

    await User.updateMany(
      { _id: { $in: [alice._id, bob._id] } },
      { team: teams[0]._id }
    );

    await User.findByIdAndUpdate(carol._id, { team: teams[1]._id });

    await Activity.create([
      {
        user: alice._id,
        team: teams[0]._id,
        type: 'Running',
        distance: 12.3,
        duration: 75,
        calories: 780,
        timestamp: new Date(),
      },
      {
        user: bob._id,
        team: teams[0]._id,
        type: 'Cycling',
        distance: 24.1,
        duration: 95,
        calories: 900,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        user: carol._id,
        team: teams[1]._id,
        type: 'Swimming',
        distance: 2.4,
        duration: 50,
        calories: 420,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      },
    ]);

    await Workout.create([
      {
        user: alice._id,
        name: 'Tempo Run',
        type: 'Running',
        intensity: 'High',
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        notes: 'Warm up before hitting the pace intervals',
      },
      {
        user: bob._id,
        name: 'Endurance Ride',
        type: 'Cycling',
        intensity: 'Moderate',
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
        notes: 'Keep a steady cadence and hydrate',
      },
      {
        user: carol._id,
        name: 'Recovery Swim',
        type: 'Swimming',
        intensity: 'Low',
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
        notes: 'Focus on form and easy laps',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
