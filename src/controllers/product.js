import Product from '../model/Product';

const productController = {
    createProduct: async (req, res, next) => {
        try {
            const newProduct = await Product.create({...req.body, image: req.file.path})
            console.log(newProduct)
            console.log(req)
            return res.status(200).json(newProduct)
        } catch (error) {
            return res.status(500).json({error: 'internal server eror'})
        }
        next()
    },

    getProducts: async (req,res)=> {
        try {
            const products = await Product.getAllProducts()
            return res.status(200).json(products)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'internal server eror'})
        }
    },

    getOneProduct: async (req,res)=> {
        try {
            const foundProduct = await Product.getById(req.params.productId)
            if (!foundProduct) {
                return res.status(404).json({error: 'product not found'})
            }
            return res.status(200).json(foundProduct)
        } catch (error) {
            return res.status(500).json({error: 'internal server error', stack: error})
        }
    }
}

export default productController;