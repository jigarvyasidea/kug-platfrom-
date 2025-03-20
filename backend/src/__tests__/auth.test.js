const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mockPool) };
});

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword123'),
  compare: jest.fn().mockResolvedValue(true)
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token')
}));

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API Routes', () => {
  let pool;
  
  beforeEach(() => {
    // Get the mocked pool
    pool = require('pg').Pool();
    pool.query.mockClear();
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      // Mock successful user registration
      pool.query.mockResolvedValueOnce({ rows: [] }); // No existing user
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Test User', email: 'test@example.com', role: 'member' }] });
      
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', 1);
      expect(response.body.user).toHaveProperty('name', 'Test User');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('role', 'member');
      expect(response.body.user).not.toHaveProperty('password');
    });
    
    it('should return 400 if email already exists', async () => {
      // Mock existing user
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com' }] });
      
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email already exists');
    });
    
    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          // Missing email
          password: 'password123'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
  
  describe('POST /api/auth/login', () => {
    it('should login a user successfully', async () => {
      // Mock successful user login
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          email: 'test@example.com', 
          password: 'hashedPassword123', 
          role: 'member' 
        }] 
      });
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', 1);
      expect(response.body.user).toHaveProperty('name', 'Test User');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('role', 'member');
      expect(response.body.user).not.toHaveProperty('password');
    });
    
    it('should return 401 if email is not found', async () => {
      // Mock user not found
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
    
    it('should return 401 if password is incorrect', async () => {
      // Mock user found but password comparison fails
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          email: 'test@example.com', 
          password: 'hashedPassword123', 
          role: 'member' 
        }] 
      });
      
      // Mock bcrypt.compare to return false for incorrect password
      require('bcrypt').compare.mockResolvedValueOnce(false);
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
  
  describe('GET /api/auth/me', () => {
    it('should return the current user', async () => {
      // Mock JWT verification
      jwt.verify = jest.fn().mockReturnValue({ id: 1 });
      
      // Mock user retrieval
      pool.query.mockResolvedValueOnce({ 
        rows: [{ 
          id: 1, 
          name: 'Test User', 
          email: 'test@example.com', 
          role: 'member' 
        }] 
      });
      
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer mock-token');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name', 'Test User');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('role', 'member');
    });
    
    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .get('/api/auth/me');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'No token, authorization denied');
    });
    
    it('should return 401 if token is invalid', async () => {
      // Mock JWT verification to throw an error
      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Token is not valid');
    });
  });
});
