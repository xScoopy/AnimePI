require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../models/user.js')

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)


after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
  })

describe('User API endpoints', () => {
    //Creates a user before each user endpoint test
    beforeEach((done) => {
        const sampleUser = new User({
            username: 'test',
            password: 'testpass',
        })
        sampleUser.save()
        .then(() => {
            done()
        })
    })

    //deletes the test user after tests are run
    afterEach((done) => {
        User.deleteMany({username: ['test', 'anothertest']})
        .then(() => {
            done()
        })
    })

    //tests that the / route loads all users
    it('should return all users in json format', (done) => {
        chai.request(app)
        .get('/users')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.users).to.be.an("array")
            done()
        })
    })
    
    

})