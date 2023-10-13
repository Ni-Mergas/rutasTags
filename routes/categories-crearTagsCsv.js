const {check} = require('express-validator');

const { Router } = require( 'express' );
// const {validarCampos} = require('../middlewares/validar-campos');

const { crearTagsCsv} = require('../controllers/categories');

const router = Router();

// router.post('/crearTagsCsv',
// check("name","nombre obligatorio").not().isEmpty(),
// crearTagsCsv,
// validarCampos);

router.post('/crearTagsCsv', (req, res) => {
    const csvFilePath = 'ruta/al/archivo.csv'; // Reemplaza con la ubicación de tu archivo CSV
    crearTagsCsv(csvFilePath);
  
    // Puedes enviar una respuesta al cliente si es necesario
    res.json({ message: 'Etiquetas creadas desde el CSV' });
  });

module.exports = router;



  