require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../models/user.js')

chai.config.includeStack = true

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

    it('should post a new user', (done) => {
        chai.request(app)
        .post('/users')
        .send({username: 'anothertest', password: 'anotherpass'})
        .end((err,res) => {
            if (err) { done(err) }
            expect(res.body.user).to.be.an('object')
            expect(res.body.user).to.have.property('username', 'anothertest')
        
        User.findOne({username: 'anothertest'})
            .then(user => {
                expect(user).to.be.an('object')
                done()
            })
        })
    })
    
    it('should update a user', (done) => {
        User.findOne({username: 'test'})
        .then((user) => {
            chai.request(app)
            .put(`/users/${user._id}`)
            .send({username: 'anothertest'})
            .end((err, res) => {
                if (err) {done(err)}
                expect(res.body.user).to.be.an('object')
                expect(res.body.user).to.have.property('username', 'anothertest')
            
            User.findOne({username: 'anothertest'})
                .then((user) => {
                    expect(user).to.be.an('object')
                    done()
                })
            })
        })
    })
    
    it('should delete a user', (done) => {
        User.findOne({username: 'test'})
        .then((user) => {
            chai.request(app)
            .delete(`/users/${user._id}`)
            .end((err, res) => {
                if (err) {done(err)}
                expect(res.body.message).to.equal('Successfully deleted.')
                expect(res.body._id).to.equal(user._id)

            User.findOne({username: 'test'})
                .then(user => {
                    expect(user).to.equal(null)
                    done()
                })
            })
        })
    })

})