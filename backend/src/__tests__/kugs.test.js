const request = require('supertest');
const express = require('express');
const kugsRoutes = require('../routes/kugs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mockPool) };
});

jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      req.user = {
        id: 1,
        role: req.headers['x-user-role'] || 'member'
      };
      next();
    } else {
      res.status(401).json({ error: 'No token, authorization denied' });
    }
  };
});

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/kugs', kugsRoutes);

describe('KUGs API Routes', () => {
  let pool;
  
  beforeEach(() => {
    // Get the mocked pool
    pool = require('pg').Pool();
    pool.query.mockClear();
  });
  
  describe('GET /api/kugs', () => {
    it('should return all KUGs', async () => {
      // Mock KUGs data
      const mockKugs = [
        { id: 1, name: 'KUG Bangalore', city: 'Bangalore', country: 'India', member_count: 120 },
        { id: 2, name: 'KUG Delhi', city: 'Delhi', country: 'India', member_count: 85 }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockKugs });
      
      const response = await request(app).get('/api/kugs');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id', 1);
      expect(response.body[0]).toHaveProperty('name', 'KUG Bangalore');
      expect(response.body[1]).toHaveProperty('id', 2);
      expect(response.body[1]).toHaveProperty('name', 'KUG Delhi');
    });
    
    it('should handle database errors', async () => {
      // Mock database error
      pool.query.mockRejectedValueOnce(new Error('Database error'));
      
      const response = await request(app).get('/api/kugs');
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Server error');
    });
  });
  
  describe('GET /api/kugs/:id', () => {
    it('should return a specific KUG by ID', async () => {
      // Mock KUG data
      const mockKug = {
        id: 1,
        name: 'KUG Bangalore',
        city: 'Bangalore',
        country: 'India',
        description: 'Kotlin User Group in Bangalore',
        logo_url: 'https://example.com/logo.png',
        website: 'https://kug-bangalore.org',
        github_url: 'https://github.com/kug-bangalore',
        twitter_handle: 'KUGBangalore',
        discord_invite: 'https://discord.gg/kugbangalore',
        created_at: '2022-01-01T00:00:00.000Z',
        member_count: 120
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockKug] });
      
      const response = await request(app).get('/api/kugs/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name', 'KUG Bangalore');
      expect(response.body).toHaveProperty('city', 'Bangalore');
      expect(response.body).toHaveProperty('member_count', 120);
    });
    
    it('should return 404 if KUG is not found', async () => {
      // Mock empty result
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app).get('/api/kugs/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'KUG not found');
    });
  });
  
  describe('POST /api/kugs', () => {
    it('should create a new KUG if user is admin', async () => {
      // Mock admin role
      const mockKug = {
        id: 3,
        name: 'KUG Mumbai',
        city: 'Mumbai',
        country: 'India',
        description: 'Kotlin User Group in Mumbai'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [mockKug] });
      
      const response = await request(app)
        .post('/api/kugs')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'admin')
        .send({
          name: 'KUG Mumbai',
          city: 'Mumbai',
          country: 'India',
          description: 'Kotlin User Group in Mumbai'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id', 3);
      expect(response.body).toHaveProperty('name', 'KUG Mumbai');
    });
    
    it('should return 403 if user is not admin', async () => {
      const response = await request(app)
        .post('/api/kugs')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'member')
        .send({
          name: 'KUG Mumbai',
          city: 'Mumbai',
          country: 'India',
          description: 'Kotlin User Group in Mumbai'
        });
      
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'Access denied');
    });
  });
  
  describe('PUT /api/kugs/:id', () => {
    it('should update a KUG if user is admin', async () => {
      // Mock KUG update
      const mockUpdatedKug = {
        id: 1,
        name: 'KUG Bangalore',
        city: 'Bangalore',
        country: 'India',
        description: 'Updated description'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [mockUpdatedKug] }); // Update result
      
      const response = await request(app)
        .put('/api/kugs/1')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'admin')
        .send({
          description: 'Updated description'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('description', 'Updated description');
    });
    
    it('should return 403 if user is not admin or KUG lead', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [] }); // Not a KUG lead
      
      const response = await request(app)
        .put('/api/kugs/1')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'member')
        .send({
          description: 'Updated description'
        });
      
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error', 'Access denied');
    });
    
    it('should return 404 if KUG is not found', async () => {
      // Mock empty result
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app)
        .put('/api/kugs/999')
        .set('Authorization', 'Bearer token')
        .set('x-user-role', 'admin')
        .send({
          description: 'Updated description'
        });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'KUG not found');
    });
  });
  
  describe('GET /api/kugs/:id/members', () => {
    it('should return all members of a KUG', async () => {
      // Mock KUG members data
      const mockMembers = [
        { user_id: 1, name: 'John Doe', email: 'john@example.com', role: 'lead', joined_at: '2022-01-01T00:00:00.000Z' },
        { user_id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'member', joined_at: '2022-02-01T00:00:00.000Z' }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // KUG exists check
      pool.query.mockResolvedValueOnce({ rows: mockMembers }); // Members result
      
      const response = await request(app).get('/api/kugs/1/members');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('user_id', 1);
      expect(response.body[0]).toHaveProperty('name', 'John Doe');
      expect(response.body[0]).toHaveProperty('role', 'lead');
      expect(response.body[1]).toHaveProperty('user_id', 2);
      expect(response.body[1]).toHaveProperty('name', 'Jane Smith');
      expect(response.body[1]).toHaveProperty('role', 'member');
    });
    
    it('should return 404 if KUG is not found', async () => {
      // Mock empty result
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app).get('/api/kugs/999/members');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'KUG not found');
    });
  });
  
  describe('POST /api/kugs/:id/join', () => {
    it('should allow a user to join a KUG', async () => {
      // Mock successful join
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [] }); // Not already a member
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 1, kug_id: 1, role: 'member' }] }); // Join result
      
      const response = await request(app)
        .post('/api/kugs/1/join')
        .set('Authorization', 'Bearer token');
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user_id', 1);
      expect(response.body).toHaveProperty('kug_id', 1);
      expect(response.body).toHaveProperty('role', 'member');
    });
    
    it('should return 400 if user is already a member', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // KUG exists check
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: 1, kug_id: 1 }] }); // Already a member
      
      const response = await request(app)
        .post('/api/kugs/1/join')
        .set('Authorization', 'Bearer token');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Already a member of this KUG');
    });
  });
});
