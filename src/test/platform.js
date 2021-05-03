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
            name: 'test platform'
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
})