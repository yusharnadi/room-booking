const express = require('express');
const router = express.Router();
const room = require('./handler/room');

router.get('/room', room.GetAll);
router.get('/room/:id', room.GetById);
router.post('/room/', room.GetAll);
router.patch('/room/:id', room.GetAll);
router.delete('/room/:id', room.GetAll);

module.exports = router;
