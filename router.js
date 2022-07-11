const express = require('express');
const authMiddleware = require('./authMiddleware');
const book = require('./handler/book');
const router = express.Router();
const room = require('./handler/room');

router.get('/room', authMiddleware('operator'), room.GetAll);
router.get('/room/:id', authMiddleware('operator'), room.GetById);

router.get('/book', authMiddleware('operator'), book.GetAll);
router.get('/book/:id', authMiddleware('operator'), book.GetByID);
router.post('/book', authMiddleware('operator'), book.Insert);
router.patch('/book/:id', authMiddleware('operator'), book.Update);
router.delete('/book/:id', book.Delete);

module.exports = router;
