var assert = require('assert')
var request = require('supertest')
var mocks = require('./fixtures')

var app = require('../index').makeApp()

mocks.initMocks()

describe('Routes', function(){
  it('Home page returns 200 and has correct content', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.statusCode, 200)
        assert(res.text.match('DataHub'), res.text)
        done()
    })
  })

  it('Showcase page returns 200 and has correct content', function(done){
    request(app)
      .get('/admin/demo-package')
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.statusCode, 200)
        assert(res.text.match('DataHub'), res.text)
        done()
    })
  })

  it('Showcase page has readme, title and publisher in content', function(done){
    request(app)
      .get('/admin/demo-package')
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.statusCode, 200)
        assert(res.text.match('Read me'), res.text)
        assert(res.text.match('DEMO - CBOE Volatility Index'), res.text)
        done()
    })
  })

  it('Publisher page returns 200 and has correct content', function(done){
    request(app)
      .get('/publisher')
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.statusCode, 200)
        assert(res.text.match('Data Packages'), res.text)
        assert(res.text.match('Member since'), res.text)
        done()
    })
  })

  it('Search page returns 200 and has correct content', function(done){
    request(app)
      .get('/search')
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.statusCode, 200)
        assert(res.text.match('Discover Data'), res.text)
        assert(res.text.match('packages found for'), res.text)
        done()
    })
  })
})
