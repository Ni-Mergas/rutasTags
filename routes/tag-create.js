
const { Router } = require('express');
const { createTagsPost,
        tagsGet,
        tagsPut,
        tagsDelete } = require('../controllers/tag-create');

const fileUpload = require('express-fileupload');
const { CSV_PATHS } = require('../enums/csv-path');
const fs = require( 'fs' );
const { check } = require('express-validator');
const { tagExiste } = require('../helpers/validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', tagsGet);

router.post('/',
check('name').custom(tagExiste),
validarCampos,
 createTagsPost);


router.post('/uploadFile', async ( req, res) =>{
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
        return res.status(400).send('No se cargarón los archivos correctamente.');
      }

    let { file } = files;
    let path = CSV_PATHS.tags;
    await (new Promise((resolve, reject) => {
        file.mv(path, function(err) {
            if (err) reject(err);
            else resolve()
        });
    }));

    // ejecute la funcion de leer el archivo

    const tagsStored =  await createTagsPost(req, res);

    //borrar csv

    fs.unlink( path, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo CSV:', err);
        }
      });

    //finalizar peticion
    res.send(tagsStored)

})

router.put('/:id', tagsPut);

router.delete('/:id', tagsDelete );

module.exports = router;