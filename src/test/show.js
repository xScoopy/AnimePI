require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const Show = require('../models/show.js')
const Genre = require('../models/genre.js')
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

describe('Shows API endpoints', () => {
    // creates a sample  show, 
    beforeEach((done) => {
        const sampleShow = new Show({
            title: 'test show', 
            publisher: 'test publisher',
            genres: [],
            platforms: []
        })
        sampleShow.save()
        .then(() => {
            done()
        })
    })
        

    afterEach((done) => {
        Show.deleteMany({ title: ['test show', 'another show'] })
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
    })

    it('should load all shows in json format', (done) => {
        chai.request(app)
        .get('/shows')
        .end((err,res) => {
            if (err) {done(err)}
            expect(res).to.have.status(200)
            expect(res.body.shows).to.be.an("array")
            done()
        })
    })

    it('should get one specific show', (done)  => {
        Show.findOne({title: 'test show'})
        .then((show) => {
            chai.request(app)
            .get(`/shows/${show._id}`)
            .end((err, res) => {
                if (err) {done(err)}
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.title).to.equal('test show')
                expect(res.body.publisher).to.equal('test publisher')
                expect(res.body.genres).to.be.an('array')
                done()
            })
        })
    })

    it('should post a new show', (done) => {
        chai.request(app)
        .post('/shows')
        .send({title: 'another show', publisher: 'test publisher'})
        .end( (err, res) => {
            if (err) { done(err) }
            expect(res.body.show).to.be.an('object')
            expect(res.body.show).to.have.property('title', 'another show')

            Show.findOne({title: 'another show'})
            .then((show) => {
                expect(show).to.be.an('object')
                done()
            })
        })
    })

    it('should update a show', (done) => {
        Show.findOne({title: 'test show'})
        .then((show) => {
            chai.request(app)
            .put(`/shows/${show._id}`)
            .send({title: 'another show'})
            .end( (err, res) => {
                if(err) {done(err)}
                expect(res.body.updatedShow).to.have.property('title', 'another show')
                expect(res.body.updatedShow).to.be.an('object')

                Show.findOne({title:'another show'})
                .then( (show) => {
                    expect(show).to.not.equal(null)
                    done()
                })
            })
        })
    })

    it('should delete a show', (done) => {
        Show.findOne({title: 'test show'})
        .then((show) => {
            chai.request(app)
            .delete(`/shows/${show._id}`)
            .end((err, res) => {
                if(err) {done(err)}
                expect(res.body.message).to.equal('Successfully deleted.')

                //ensure it no longer exists in the db
                Show.findOne({title:'test show'})
                .then((show) => {
                    expect(show).to.equal(null)
                    done()
                })
            })
        })
    })
})