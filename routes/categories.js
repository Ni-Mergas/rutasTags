const {check} = require('express-validator');

const { Router } = require( 'express' );
const {validarCampos} = require('../middlewares/validar-campos');

const { crearTagsCsv } = require('../controllers/categories'); 

const { categoriesGet, 
        categoriesPost, 
        categoriesDelete, 
        categoriesPut,
        categoriesPutTagsBD} = require('../controllers/categories');

const csvFilePath = ('./data/Marcas.csv')

const router = Router();


router.get('/', categoriesGet);

router.post('/',
check("name","nombre obligatorio").not().isEmpty(),
check("category", "la categoria es obligatoria").not().isEmpty(), 
validarCampos, 
categoriesPost );


router.post('/crearTagsCsv', async (req, res) => {
  const csvFilePath = './data/Marcas.csv'; // Ruta al archivo CSV
  try {
    await crearTagsCsv(csvFilePath); // Llama a la función para procesar el archivo CSV
    res.json({ message: 'Etiquetas creadas desde el CSV' });
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    res.status(500).json({ error: 'Error al procesar el archivo CSV' });
  }
},
categoriesPutTagsBD);

router.put('/:id', categoriesPut);

router.delete('/:id', categoriesDelete);

module.exports = router;