const chai = require('chai');
chai.use(require('chai-json'));
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);


it ('should return the city with the correct properties', (done) =>{
    chai.request(server)
        .get('/cities/2873891/weather')
        .end((err, res)=>{
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
