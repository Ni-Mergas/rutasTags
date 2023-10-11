const { response } = require('express');

const Categories = require('../models/categories');

const categoriesGet = async ( req, res = response ) =>{
    const query = { status:true }

     const [ categories, total ] = await Promise.all([
         Categories.find(query),
         Categories.countDocuments(query)
     ]);

    res.json({
        total,
        categories
    });
}

const categoriesPost = async ( req, res = response) =>{

    const {name, category} = req.body;
    const categories = new Categories({name, category});

    await categories.save()

    res.json({

        msg:'post API - desde controador',
        categories

    })
}

const categoriesDelete = async ( req, res ) =>{

    const {id} = req.params;
    const categories = await Categories.findByIdAndUpdate(id,{ status:false } );
    res.json({
        categories
    });
}
module.exports = {
    categoriesGet,
    categoriesPost,
    categoriesDelete
}