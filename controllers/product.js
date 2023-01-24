const Product = require('../models/product')
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.getAllProducts = (req, res, next) => {
    Product.findAll()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
}

exports.getOneProduct = (req, res, next) => {
    Product.findOne({where: {id: req.params.id}})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({error}));
}


exports.createProduct = (req, res, next) => {
    if(!userId && isAdmin) {
        return res.status(401).json({error: 'Unauthorized request'})
    }
    const product = ({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    })
    Product.create(product)
        .then(() => res.status(201).json({message: 'Product created!'}))
        .catch(error => res.status(400).json({error}));

}