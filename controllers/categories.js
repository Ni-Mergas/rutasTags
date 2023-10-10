const { response } = require('express');

const categoriesGet = ( req, res = response ) =>{
    res.json({
        msg:'get API - desde controlador'
    });
}

const categoriesPost = ( req, res ) =>{

    const body = req.body;
    res.json({
        msg:'post API - desde controlador',
        body
    });
}

const categoriesDelete = ( req, res ) =>{
    res.json({
        msg:'delete API - desde Controlador'
    });
}
module.exports = {
    categoriesGet,
    categoriesPost,
    categoriesDelete
}