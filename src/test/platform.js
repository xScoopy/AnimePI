require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const Platform = require('../models/platform.js')

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

describe('Platform API endpoints', () => {
    beforeEach((done) => {
        const samplePlatform = new Platform({
            name: 'test platform',
            shows: []
        })
        samplePlatform.save()
        .then(() => {
            done()
        })
    })

    afterEach((done) => {
        Platform.deleteMany({ name: ['test platform', 'another platform'] })
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
    })

    it('should load all platforms', (done) => {
        chai.request(app)
        .get('/platforms')
        .end((err, res) => {
            if (err) {done(err)}
            console.log('status fine')
            expect(res).to.have.status(200)
            console.log('body array fine')
            expect(res.body.platforms).to.be.an("array")
            done()
        })
    })

    it('should get a specific platform', (done) => {
        Platform.findOne({name: 'test platform' })
        .then((platform) => {
            chai.request(app)
            .get(`/platforms/${platform._id}`)
            .end((err, res) => {
                if (err) {done(err)}
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('test platform')
                done()
            })
        })
    })

    it('should post a new platform', (done) => {
        chai.request(app)
        .post('/platforms')
        .send({name:'another platform', shows: [] })
        .end((err, res) => {
            if (err) {done(err)}
            expect(res.body.name).to.be.equal('another platform')
            expect(res.body).to.be.an('object')

            Platform.findOne({name: 'another platform' })
            .then((platform) => {
                expect(platform).to.be.an('object')
                expect(platform).to.not.equal(null)
                done()
            })
        })
    })

    it('should update a platform', (done) => {
        Platform.findOne({name: 'test platform' })
        .then((platform) => {
            chai.request(app)
            .put(`/platforms/${platform._id}`)
            .send({title: 'another platform'})
            .end((err, res) => {
                if(err) {done(err)}
                expect(res.body.updatedPlatform).to.be.an('object')
                expect(res.body.updatedPlatform.name).to.be.equal('another platform')

                //ensure it was updated in db
                Platform.findOne({name: 'another platform'})
                .then((platform) => {
                    expect(platform).to.not.equal(null)
                    done()
                })
            })
        })
    })

    it('should delete a platform', (done) => {
        Platform.findOne({name: 'test platform' })
        .then((platform) => {
            chai.request(app)
            .delete(`/platforms/${platform._id}`)
            .end((err, res) => {
                if(err) {done(err)}
                expect(res.body.message).to.equal('Successfully deleted')
                
                //ensure it's not in the db
                Platform.findOne({name:'test platform'})
                .then((platform) => {
                    expect(platform).to.equal(null)
                    done()
                })
            })
        })
    })
})