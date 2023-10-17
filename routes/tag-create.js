
const { Router } = require( 'express' );
const { crearTagsCsv } = require('../controllers/tag-create');

const csvFilePath = ('./data/Marcas.csv')
const  categoriesPutTagsBD = require('../controllers/tag-create')
const router = Router();


router.post('/crear-tags-csv', async (req, res) => {
    //const csvFilePath = './data/Marcas.csv'; // Ruta al archivo CSV
    try {
      await crearTagsCsv(csvFilePath); // Llama a la función para procesar el archivo CSV
      res.json({ message: 'Etiquetas creadas desde el CSV' });
    } catch (error) {
      console.error('Error al procesar el archivo CSV:', error);
      res.status(500).json({ error: 'Error al procesar el archivo CSV' });
    }
  },
  categoriesPutTagsBD);

  module.exports = router;