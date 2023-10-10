

const { Router } = require( 'express' );
const { categoriesGet, 
        categoriesPost, 
        categoriesDelete } = require('../controllers/categories');
const router = Router();

router.get('/', categoriesGet);

router.post('/', categoriesPost );

router.delete('/', categoriesDelete);

module.exports = router;