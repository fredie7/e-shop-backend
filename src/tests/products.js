import chaiHttp from 'chai-http';
import chai, { use } from 'chai';
import app from '../app'
import fs from 'fs'

chai.use(chaiHttp)
chai.should()
const {expect} = chai

describe('POST /api/v1/createProduct', () => {
    let user = {
        id: null,
        token: null,
        name: 'ramsey',
        email: 'ramsey@email.com',
        password: 'ramseypassword1'
    }
    const signupData = {
        name: user.name,
        email: user.email,
        password: user.password,
    }
    const signinData = {
        email: user.email,
        password: user.password,
    }
    before(async()=> {
        let res = await chai.request(app)
           .post('/api/v1/auth/signup')
           .send(signupData)
        user.id = res.body.id

        res = await chai.request(app)
           .post('/api/v1/auth/signin')
           .send(signinData)
        user.token = res.body.token
    })
    it('should provide a statusCode of 201', (done)=> {
        const order = {
            title:'vegetable',
            price:'45',
            description:'description info',
            quantity:3,
            status:'add',
            count:5,
            producedBy:'lex company',
            image:'image5.jpeg',
        }

    chai.request(app)
      .post('/api/v1/createProduct')
      .set('authorization', user.token)
      .set('content-type', 'multipart/form-data')
      .field('title','vegetable')
      .field('price','45')
      .field('description','dummy description')
      .field('quantity',3)
      .field('status','add')
      .field('count',5)
      .field('producedBy',user.id)
      .attach('image',fs.readFileSync(`${__dirname}/file.jpg`), 'file.jpg')
      .end((err,res)=> {
        expect(res.body).to.equal({})
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('producedBy')
        res.body.producedBy.should.eql(user.id)
        res.body.should.have.property('title')
        res.body.should.have.property('price')
        res.body.should.have.property('description')
        res.body.should.have.property('quantity')
        res.body.should.have.property('status')
        res.body.should.have.property('count')
        res.body.should.have.property('image')
        done();
      })
    })
})
