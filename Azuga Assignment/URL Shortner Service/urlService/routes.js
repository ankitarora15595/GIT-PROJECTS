const express = require('express');
const router = express.Router();
const { shorten, getUrl} = require('../urlService/controller');

router.post('/shorten', shorten);
router.get('/:code',getUrl);

module.exports = router;