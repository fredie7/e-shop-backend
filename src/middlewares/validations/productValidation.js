const productValidation = {
  createProductValidation: (req, res, next)=> {
    req.check('title', 'fill in product title').notEmpty();
    req.check('price', 'fill in product price').notEmpty();
    req.check('description', 'enter the product description').notEmpty();
    req.check('quantity', 'fill in product quantity').notEmpty();
    req.check('status', 'fill in status').notEmpty();
    req.check('count', 'fill in the product count').notEmpty();
    req.check('producedBy', 'fill in the manufacturer').notEmpty();
    // req.check('image', 'upload product image').notEmpty();

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(422).json({error: firstError});
    }
    next();
  }
}

export default productValidation;