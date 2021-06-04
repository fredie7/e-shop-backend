import User from '../model/User'
import Product from '../model/Product'
import hashPassword from '../services/hash'
require ('dotenv').config()

const seedDatabase = async ()=> {
    const users = [
        {
         name: 'lex',
         email: 'lex@gmail.com',
         password: hashPassword('lexpassword'),
         isAdmin: true,
        },
        {
         name: 'mike',
         email: 'mike@gmail.com',
         password: hashPassword('mikepassword'),
         isAdmin: false,
        },
        {
         name: 'clara',
         email: 'clara@gmail.com',
         password: hashPassword('clarapassword'),
         isAdmin: false,
        },
    ]

    const seedUsers = users.map(async (userData)=> {
        const newUser = await User.create(userData)
        return newUser;
    })
    const insertedUsers = await Promise.all(seedUsers);
    console.log(insertedUsers)

    const products = [
        {
         title: 'apple',
         price: '30',
         description: 'lorem lorem lorem lorem lorem loremlorem ',
         quantity: '1',
         status: 'add',
         count: '1',
         producedBy: 'cadbuary'
        },
        {
         title: 'strawberry',
         price: '50',
         description: 'lorem lorem lorem lorem lorem loremlorem ',
         quantity: '1',
         status: 'add',
         count: '1',
         producedBy: 'guiness'
        },
        {
         title: 'orange',
         price: '90',
         description: 'lorem lorem lorem lorem lorem loremlorem ',
         quantity: '1',
         status: 'add',
         count: '1',
         producedBy: 'peak'
        },
    ]
    
    const seedProducts = products.map(async (productData)=> {
        const newProduct = await Product.create(productData);
        console.log(newProduct)
        return newProduct
    })
    const insertedProducts = await Promise.all(seedProducts)
    console.log(insertedProducts)
}

export default seedDatabase;