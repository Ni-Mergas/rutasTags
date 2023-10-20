const { response } = require('express');


const Categories = require('../models/categories');



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
module.exports = {
    categoriesGet,
    categoriesPost,
    categoriesDelete,
    categoriesPut,
}