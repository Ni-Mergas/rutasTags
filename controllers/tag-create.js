
const Tags = require('../models/tags');
const { parse } = require('csv-parse/sync');
const { readFileSync } = require('fs');
const { CLIENT_RENEG_LIMIT } = require('tls');

const filePath = './data/marcas.csv';

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

const createTagsPost = async (req, res) => {
  try {
     const csvContent = readCsvFile(filePath);
    
    const tags = csvContent.map((row) => ({
      name: row.name
    }));

    // Guarda los tags en la base de datos
    const createdTags = await Tags.create(tags);

    console.log('Etiquetas creadas:', createdTags);

    res.json({
      createdTags
    });

  } catch (error) {
    console.log(error);
  }
};

const tagsGet = async ( req, res ) => {

  
  try {
    const query = { status:true }

    const tags = await Tags.find( query )

    res.json({

      tags
    })
    
  } catch ( error ) {

    console.log( error );
  }
}

const tagsPut = async (req, res) => {

  try {
    const { id } = req.params;
    const body = req.body;
    const tags = await Tags.findByIdAndUpdate( id, body );
    
    res.json({
      tags
    })
    
  } catch (error) {
    console.log(error);
  }
}

const tagsDelete = async ( req, res ) =>{

  try {

    const { id } = req.params;
    const tags = await Tags.findByIdAndUpdate( id, { status:false } );

    res.json({
      tags
    });
    
  } catch (error) {
    
    console.log(error); 

  }
}

module.exports = {
  createTagsPost,
  tagsGet,
  tagsPut,
  tagsDelete
};
