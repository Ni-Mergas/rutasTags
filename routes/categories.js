const {check} = require('express-validator');

const { Router } = require( 'express' );
const {validarCampos} = require('../middlewares/validar-campos');

const { categoriesGet, 
        categoriesPost, 
        categoriesDelete } = require('../controllers/categories');

const router = Router();


router.get('/', categoriesGet);

router.post('/',
check("name","nombre obligatorio").not().isEmpty(),
check("category", "la categoria es obligatoria").not().isEmpty(), 
validarCampos, 
categoriesPost );

router.delete('/:id', categoriesDelete);

module.exports = router;