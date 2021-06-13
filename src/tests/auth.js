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

describe('/api/v1/auth/signin', ()=> {
  const newUser = {
    name: 'jex',
    email: 'jex@email.com',
    password: 'jex123456'
  }
  before((done)=> {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end(()=> {
        done()
      })
    })

      it('returns success when valid input is provided', (done)=> {
        const user = {
          email: newUser.email,
          password: newUser.password
        }
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((req,res)=> {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done()
          });
      })

      it('fails when password is not provided', (done)=> {
        const user = {
          email: 'jex@email.com',
          password: ''
        }
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((req,res)=> {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.a.property('error').eql('password must contain at least 6 characters')
            done()
          })
      })

      it('fails on wrong user credentials', (done)=> {
        const user = {
          email: 'day@email.com',
          password: 'kdjkj9'
        }
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((req,res)=> {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('user does not exist')
            done()
          })
      })

      it('fails when password does not contain a digit character', (done)=> {
        const user = {
          email: 'jex@email.com',
          password: 'jexpassword'
        }
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((req,res)=> {
            res.should.have.status(422);
            res.body.should.be.a('object')
            res.body.should.have.property('error').eql('password must contain a digit character')
            done()
          })
      })

      it('fails if the email is not valid', (done)=> {
        const user = {
          email: 'ex@email.co',
          password: 'jex123456'
        }
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((req,res)=> {
            res.should.have.status(401);
            res.body.should.be.a('object')
            res.body.should.have.property('error').eql('user does not exist')
            done()
          })
      })

      it('email must contain an @ symbol', (done)=> {
        const user = {
          email: 'jexemail.com',
          password: 'jex123456'
        }
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((req,res)=> {
            res.should.have.status(422);
            done()
          })
      })
})