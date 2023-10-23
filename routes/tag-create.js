
const { Router } = require('express');
const { createTagsPost,
        tagsGet,
        tagsPut,
        tagsDelete } = require('../controllers/tag-create');

const router = Router();

router.get('/', tagsGet);

router.post('/', createTagsPost);

router.put('/:id', tagsPut);

router.delete('/:id', tagsDelete );

module.exports = router;