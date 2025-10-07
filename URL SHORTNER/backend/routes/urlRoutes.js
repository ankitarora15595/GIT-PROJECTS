const express = require('express');
const router = express.Router();
const { shorten, retrieve } = require('../controllers/urlController');

router.post('/shorten', shorten);
router.get('/:code', retrieve);

module.exports = router;
