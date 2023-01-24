const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const productCtrl = require('../controllers/product');

router.post('/admin/', auth, productCtrl.createProduct);
router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
//router.put('/admin/:id',auth, productCtrl.modifyProduct);
//router.delete('/admin/:id',auth, productCtrl.deleteProduct);

module.exports = router;