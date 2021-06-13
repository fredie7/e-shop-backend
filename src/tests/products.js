import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app'

chai.use(chaiHttp)
chai.should()

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
            image:'image.jpg',
        }
        console.log(order)

    chai.request(app)
      .post('/api/v1/createProduct')
      .set('authorization', user.token)
      .send(order)
      .end((err,res)=> {
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
