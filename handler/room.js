const db = require('../datastore/init');

const GetAll = (req, res) => {
    db.query('SELECT * FROM room ORDER BY room_id ASC', (error, result) => {
        if (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }

        res.status(200).json({ status: 'success', data: result.rows });
    });
};

const GetById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM room WHERE room_id = $1  ORDER BY room_id ASC', [id], (error, result) => {
        if (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }

        res.status(200).json({ status: 'success', data: result.rows });
    });
};

module.exports = {
    GetAll,
    GetById,
};
