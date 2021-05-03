require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const Genre = require('../models/genre.js')

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

describe('Genre API endpoints', () => {
    beforeEach((done) => {
        const sampleGenre = new Genre({
            name: 'test genre'
        })
        sampleGenre.save()
        .then(() => {
            done()
        })
    })

    afterEach((done) => {
        Genre.deleteMany({ name: ['test genre', 'another genre'] })
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
    })

    it('should load all genres', (done) => {
        chai.request(app)
        .get('/genres')
        .end((err, res) => {
            if (err) {done(err)}
            expect(res).to.have.status(200)
            expect(res.body.genres).to.be.an("array")
            done()
        })
    })

    it('should get a specific genre', (done) => {
        Genre.findOne({name: 'test genre' })
        .then((genre) => {
            chai.request(app)
            .get(`/genres/${genre._id}`)
            .end((err, res) => {
                if (err) {done(err)}
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('test genre')
                done()
            })
        })
    })

    it('should post a new genre', (done) => {
        chai.request(app)
        .post('/genres')
        .send({name:'another genre', shows: [] })
        .end((err, res) => {
            if (err) {done(err)}
            expect(res.body.name).to.be.equal('another genre')
            expect(res.body).to.be.an('object')

            Genre.findOne({name: 'another genre' })
            .then((genre) => {
                expect(genre).to.be.an('object')
                expect(genre).to.not.equal(null)
                done()
            })
        })
    })

    it('should update a genre', (done) => {
        Genre.findOne({name: 'test genre' })
        .then((genre) => {
            chai.request(app)
            .put(`/genres/${genre._id}`)
            .send({title: 'another genre'})
            .end((err, res) => {
                if(err) {done(err)}
                expect(res.body.updatedGenre).to.be.an('object')
                expect(res.body.updatedGenre.name).to.be.equal('another genre')

                //ensure it was updated in db
                Genre.findOne({title: 'another genre'})
                .then((genre) => {
                    expect(genre).to.not.equal(null)
                    done()
                })
            })
        })
    })

    it('should delete a genre', (done) => {
        Genre.findOne({title: 'test genre' })
        .then((genre) => {
            chai.request(app)
            .delete(`/genres/${genre._id}`)
            .end((err, res) => {
                if(err) {done(err)}
                expect(res.body.message).to.equal('Successfully deleted')
                
                //ensure it's not in the db
                Genre.findOne({title:'test genre'})
                .then((genre) => {
                    expect(genre).to.equal(null)
                    done()
                })
            })
        })
    })
})