const request = require('supertest');
const express = require('express');
const leaderboardsRoutes = require('../routes/leaderboards');

// Mock dependencies
jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mockPool) };
});

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/leaderboards', leaderboardsRoutes);

describe('Leaderboards API Routes', () => {
  let pool;
  
  beforeEach(() => {
    // Get the mocked pool
    pool = require('pg').Pool();
    pool.query.mockClear();
  });
  
  describe('GET /api/leaderboards/global', () => {
    it('should return the global leaderboard', async () => {
      // Mock leaderboard data
      const mockLeaderboard = [
        { 
          id: 1, 
          name: 'John Doe', 
          profile_picture: '/images/avatar1.png',
          total_points: 150,
          contribution_count: 5,
          talks: 2,
          blogs: 1,
          code: 2,
          events: 0,
          badge_count: 3
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          profile_picture: '/images/avatar2.png',
          total_points: 120,
          contribution_count: 4,
          talks: 1,
          blogs: 2,
          code: 1,
          events: 0,
          badge_count: 2
        }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockLeaderboard });
      
      const response = await request(app).get('/api/leaderboards/global');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('total_points', 150);
      expect(response.body[1]).toHaveProperty('id', 2);
      expect(response.body[1]).toHaveProperty('name', 'Jane Smith');
      expect(response.body[1]).toHaveProperty('total_points', 120);
    });
    
    it('should handle database errors', async () => {
      // Mock database error
      pool.query.mockRejectedValueOnce(new Error('Database error'));
      
      const response = await request(app).get('/api/leaderboards/global');
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Server error');
    });
  });
  
  describe('GET /api/leaderboards/kug/:kugId', () => {
    it('should return the leaderboard for a specific KUG', async () => {
      // Mock KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      // Mock KUG leaderboard data
      const mockLeaderboard = [
        { 
          id: 1, 
          name: 'John Doe', 
          profile_picture: '/images/avatar1.png',
          total_points: 100,
          contribution_count: 3,
          talks: 1,
          blogs: 1,
          code: 1,
          events: 0,
          badge_count: 2
        },
        { 
          id: 3, 
          name: 'Bob Johnson', 
          profile_picture: '/images/avatar3.png',
          total_points: 80,
          contribution_count: 2,
          talks: 1,
          blogs: 0,
          code: 1,
          events: 0,
          badge_count: 1
        }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockLeaderboard });
      
      const response = await request(app).get('/api/leaderboards/kug/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('total_points', 100);
      expect(response.body[1]).toHaveProperty('id', 3);
      expect(response.body[1]).toHaveProperty('name', 'Bob Johnson');
      expect(response.body[1]).toHaveProperty('total_points', 80);
    });
    
    it('should return 404 if KUG is not found', async () => {
      // Mock KUG not found
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app).get('/api/leaderboards/kug/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'KUG not found');
    });
  });
  
  describe('GET /api/leaderboards/type/:type', () => {
    it('should return the leaderboard for a specific contribution type', async () => {
      // Mock type leaderboard data
      const mockLeaderboard = [
        { 
          id: 1, 
          name: 'John Doe', 
          profile_picture: '/images/avatar1.png',
          total_points: 100,
          contribution_count: 2
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          profile_picture: '/images/avatar2.png',
          total_points: 50,
          contribution_count: 1
        }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockLeaderboard });
      
      const response = await request(app).get('/api/leaderboards/type/talk');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('total_points', 100);
      expect(response.body[1]).toHaveProperty('id', 2);
      expect(response.body[1]).toHaveProperty('name', 'Jane Smith');
      expect(response.body[1]).toHaveProperty('total_points', 50);
    });
    
    it('should return 400 if contribution type is invalid', async () => {
      const response = await request(app).get('/api/leaderboards/type/invalid');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid contribution type');
    });
  });
  
  describe('GET /api/leaderboards/user/:userId', () => {
    it('should return ranking information for a specific user', async () => {
      // Mock user exists check
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe', profile_picture: '/images/avatar1.png' }] });
      
      // Mock global ranking
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe', total_points: 150, rank: 1 }] });
      
      // Mock KUG rankings
      pool.query.mockResolvedValueOnce({ 
        rows: [
          { kug_id: 1, kug_name: 'KUG Bangalore', total_points: 100, rank: 1 },
          { kug_id: 2, kug_name: 'KUG Delhi', total_points: 50, rank: 2 }
        ] 
      });
      
      // Mock contribution stats
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          total: 5,
          talks: 2,
          blogs: 1,
          code: 2,
          events: 0,
          total_points: 150
        }] 
      });
      
      // Mock badges
      pool.query.mockResolvedValueOnce({ 
        rows: [
          { id: 1, name: 'First Contribution', description: 'Made your first contribution', image_url: '/images/badge1.png', kug_name: 'KUG Bangalore', awarded_at: '2023-03-10T00:00:00.000Z' },
          { id: 2, name: 'Speaker', description: 'Gave 3+ talks', image_url: '/images/badge2.png', kug_name: 'KUG Bangalore', awarded_at: '2023-04-15T00:00:00.000Z' }
        ] 
      });
      
      const response = await request(app).get('/api/leaderboards/user/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('global_ranking');
      expect(response.body).toHaveProperty('kug_rankings');
      expect(response.body).toHaveProperty('contribution_stats');
      expect(response.body).toHaveProperty('badges');
      
      expect(response.body.user).toHaveProperty('id', 1);
      expect(response.body.user).toHaveProperty('name', 'John Doe');
      
      expect(response.body.global_ranking).toHaveProperty('rank', 1);
      expect(response.body.global_ranking).toHaveProperty('total_points', 150);
      
      expect(response.body.kug_rankings).toHaveLength(2);
      expect(response.body.kug_rankings[0]).toHaveProperty('kug_name', 'KUG Bangalore');
      expect(response.body.kug_rankings[0]).toHaveProperty('rank', 1);
      
      expect(response.body.contribution_stats).toHaveProperty('total', 5);
      expect(response.body.contribution_stats).toHaveProperty('talks', 2);
      
      expect(response.body.badges).toHaveLength(2);
      expect(response.body.badges[0]).toHaveProperty('name', 'First Contribution');
    });
    
    it('should return 404 if user is not found', async () => {
      // Mock user not found
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app).get('/api/leaderboards/user/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });
  
  describe('GET /api/leaderboards/monthly', () => {
    it('should return the monthly leaderboard', async () => {
      // Mock monthly leaderboard data
      const mockLeaderboard = [
        { 
          id: 1, 
          name: 'John Doe', 
          profile_picture: '/images/avatar1.png',
          total_points: 80,
          contribution_count: 2
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          profile_picture: '/images/avatar2.png',
          total_points: 60,
          contribution_count: 2
        }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockLeaderboard });
      
      const response = await request(app).get('/api/leaderboards/monthly');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('month');
      expect(response.body).toHaveProperty('year');
      expect(response.body).toHaveProperty('leaderboard');
      expect(response.body.leaderboard).toHaveLength(2);
      expect(response.body.leaderboard[0]).toHaveProperty('id', 1);
      expect(response.body.leaderboard[0]).toHaveProperty('name', 'John Doe');
      expect(response.body.leaderboard[0]).toHaveProperty('total_points', 80);
      expect(response.body.leaderboard[1]).toHaveProperty('id', 2);
      expect(response.body.leaderboard[1]).toHaveProperty('name', 'Jane Smith');
      expect(response.body.leaderboard[1]).toHaveProperty('total_points', 60);
    });
  });
});
