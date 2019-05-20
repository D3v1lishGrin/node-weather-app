const chai = require('chai');
chai.use(require('chai-json'));
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

it('should return code 404', (done) => {
    chai.request(server)
        .get('/cities')
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;

            done();
        });
});

it('should return the city with the correct properties', (done) => {
    chai.request(server)
        .get('/cities/2873891/weather')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('sunrise');
            res.body.should.have.property('sunset');
            res.body.should.have.property('temp');
            res.body.should.have.property('temp_min');
            res.body.should.have.property('temp_max');
            res.body.should.have.property('humidity');
            res.body.should.have.property('clouds_percent');
            res.body.should.have.property('wind_speed');

            done();
        });
});

it('should return error 404 because of missing lat parameter', (done) => {
    chai.request(server)
        .get('/cities/?lng=8.46')
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;

            done();
        });
});

it('should return error 404 because of missing lng parameter', (done) => {
    chai.request(server)
        .get('/cities/?lat=49.48')
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;

            done();
        })
});