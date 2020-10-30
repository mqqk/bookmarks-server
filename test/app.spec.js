// const { expect } = require('chai')
// const supertest = require('supertest')
const app = require('../src/app')
const bookmarks = require('../src')

describe('App', () => {
  it('GET /bookmarks responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(200)
  })
})