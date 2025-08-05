import request from 'supertest'
import { app } from '../index'
import { User } from '../models/User'
import mongoose from 'mongoose'

describe('Authentication', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/espresso-chat-test')
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    // Clear users collection
    await User.deleteMany({})
  })

  describe('GET /auth/me', () => {
    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/auth/me')
        .expect(401)

      expect(response.body.error).toBe('Not authenticated')
    })
  })

  describe('GET /auth/logout', () => {
    it('should redirect to client URL', async () => {
      const response = await request(app)
        .get('/auth/logout')
        .expect(302)

      expect(response.header.location).toContain('localhost:5173')
    })
  })
}) 