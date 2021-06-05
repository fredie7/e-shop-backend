import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('/api/v1/auth/signup', () => {
    it('should return a status code of 201', (done) => {
      const user = {
        name: 'alex',
        email: 'alex@test.com',
        password: 'alexpassword1',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('email');
          res.body.should.have.property('password');
          done();
        });
    });  
});