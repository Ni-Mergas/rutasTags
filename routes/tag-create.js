const { Router } = require('express');
const { saveTagsToDatabase } = require('../controllers/tag-create'); // Asegúrate de importar tu controlador adecuadamente

const router = Router();

// Ruta para crear etiquetas desde un archivo CSV
router.post('/crear-tags-csv', async (req, res) => {
  try {
    // Lee el archivo CSV y guarda las etiquetas en la base de datos
    const csvFilePath = './data/marcas (1).csv'; // Ruta al archivo CSV
    const csvContent = readCsvFile(csvFilePath);
    
    // Crear las etiquetas a partir del contenido del archivo CSV
    const tags = csvContent.map((row) => ({
      name: row.name
    }));

    // Guardar las etiquetas en la base de datos
    await saveTagsToDatabase(tags);
    
    res.json({ message: 'Etiquetas creadas desde el CSV' });
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    res.status(500).json({ error: 'Error al procesar el archivo CSV' });
  }
});

module.exports = router;



