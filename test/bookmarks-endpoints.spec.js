const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')

describe('Bookmarks Endpoints', function() {

    let db

    before('make knex instance', () => {
        db= knex({
            client:'pg',
            connection:process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('clean the table',() => db('bookmarks').truncate())

    context('Given there are bookmarks', () => {

        before('clean the table', () => db('bookmarks').truncate())
        afterEach('clean up',() => db('bookmarks').truncate())

        describe(`Get /api/bookmarks`, () => {
            context('Given no bookmarks', () => {
                it('responds with 200 and an empty list', () => {
                    return supertest(app)
                        .get('/api/bookmarks')
                        .expect(200,[])
                })
            })
        })
        })
        
    })

