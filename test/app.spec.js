const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
// const bookmarks = require('../src')

describe('App', () => {
  it('GET / responds with 200 containing "hi"', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  })
})