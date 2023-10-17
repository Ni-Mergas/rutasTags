const { response } = require('express');
 const csv = require('csv-parser')
 const fs = require('fs')



const Categories = require('../models/categories');
 const { readFileSync } = require('fs');
 const { parse } = require('csv-parse/sync');

 const csvFilePath = ('./data/Marcas.csv')

const categoriesGet = async ( req, res = response ) =>{
    
    try {
    
        const query = { status:true }
    
        const categories = await Categories.find( query )
    
        res.json({
    
            categories
        });
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener información de la base de datos')
    }
}



const categoriesPost = async ( req, res = response) =>{

    try {
        const {name, category} = req.body;
        const categories = new Categories({name, category});
    
        await categories.save()
    
        res.json({
            
            categories
        });
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al enviar la información a la base de datos');
    }

}
    
const categoriesPut = async ( req, res =response )=> {

    try {
        
        const { id } = req.params;
        const body = req.body;
        const categories = await Categories.findByIdAndUpdate( id, body);
   
        res.json({
           categories
        });
    } catch (error) {

        console.log(error)
        throw new Error('Error al actualizar la información')
        
    }

}

const categoriesDelete = async ( req, res ) =>{
    
    
    try {
        const {id} = req.params;
        const categories = await Categories.findByIdAndUpdate(id,{ status:false } );
        res.json({
            categories
        });     
    } catch (error) {
        
        console.log(error)
        throw new Error('Error al borrar tag')
    }
}

  

const categoriesPutTagsBD = async (tags) => {
    try {
      
      await Categories.insertMany(tags);
  
      console.log('Etiquetas guardadas en la base de datos');
    } catch (error) {
      console.error('Error al guardar etiquetas en la base de datos:', error);
      throw new Error('Error al guardar etiquetas en la base de datos');
    }
  };

  const fileContent = readFileSync('./data/Marcas.csv','utf-8');
  const csvContent = parse(fileContent,{
      columns:true
  })
   console.log(csvContent);
  
  
  const crearTagsCsv = (csvFilePath) => {
    const tags = [];
    console.log(csvFilePath)
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



module.exports = {
    categoriesGet,
    categoriesPost,
    categoriesDelete,
    categoriesPut,
    categoriesPutTagsBD,
    crearTagsCsv
}