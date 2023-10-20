
const Tags = require('../models/tags');
const { parse } = require('csv-parse/sync');

const { readFileSync } = require('fs');

const filePath = './data/marcas (1).csv';

const readCsvFile = (filePath) => {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const csvContent = parse(fileContent, {
      columns: true
    });
    return csvContent;
  } catch (error) {
    console.log(error);
    throw new Error('Error al leer el archivo CSV', error);
  }
};

const saveTagsToDatabase = async (tags) => {
  try {
    // Utiliza Mongoose o el método que corresponda para guardar las etiquetas en MongoDB
    await Tags.insertMany(tags);
    console.log('Etiquetas guardadas en la base de datos MongoDB');
  } catch (error) {
    console.error('Error al guardar etiquetas en la base de datos', error);
    throw error; // Re-lanzar el error
  }
};

const main = async () => {
  try {
    const csvContent = readCsvFile(filePath);
    console.log(csvContent);

    // Crear las etiquetas a partir del contenido del archivo CSV
    const tags = csvContent.map((row) => ({
      name: row.name
    }));

    console.log('Etiquetas creadas:', tags);

    // Guardar las etiquetas en la base de datos
    await saveTagsToDatabase(tags);
  } catch (error) {
    console.log(error);
  }
};

main(); 
  
