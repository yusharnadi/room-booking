const express = require('express');
const router = express.Router();
const room = require('./handler/room');

router.get('/room', room.GetAll);
router.get('/room/:id', room.GetById);

module.exports = router;
