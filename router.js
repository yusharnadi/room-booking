const express = require('express');
const authMiddleware = require('./authMiddleware');
const book = require('./handler/book');
const router = express.Router();
const room = require('./handler/room');
const auth = require('./handler/auth');

router.get('/room', authMiddleware('karyawan'), room.GetAll);
router.get('/room/:id', authMiddleware('karyawan'), room.GetById);

router.get('/book', authMiddleware('karyawan'), book.GetAll);
router.get('/book/:id', authMiddleware('karyawan'), book.GetByID);
router.post('/book', authMiddleware('karyawan'), book.Insert);
router.patch('/book/:id', authMiddleware('karyawan'), book.Update);
router.delete('/book/:id', authMiddleware('admin'), book.Delete);

router.post('/auth/register', auth.Register);
router.post('/auth/login', auth.Login);

module.exports = router;
