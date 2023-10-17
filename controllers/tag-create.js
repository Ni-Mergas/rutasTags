const { response } = require('express');

const csv = require('csv-parser')
const fs = require('fs')

const csvFilePath = ('./data/Marcas.csv')

const categoriesPutTagsBD = async ( tags) => {
    try {
      
      await Categories.insertMany(tags);
  
      console.log('Etiquetas guardadas en la base de datos');
    } catch (error) {
     
      throw new Error('Error al guardar etiquetas en la base de datos',error);
    }
  };
  
  const crearTagsCsv = (csvFilePath) => {
    const tags = [];
    fs.createReadStream(csvFilePath)
     .pipe(csv())
      .on('data', (row) => {
        // Procesa cada fila del CSV y crea etiquetas
        const tagName = row.name; // Nombre de la etiqueta desde el CSV

        tags.push({ name: tagName });
        
      })
      .on('end',  async() => {
        //  array de etiquetas creadas desde el CSV (tags)
        console.log('Etiquetas creadas:', tags);
    


        // Lógica para guardar las etiquetas base de datos 
    
         await categoriesPutTagsBD(tags)
       
      });
 };

 module.exports ={
    crearTagsCsv
 }