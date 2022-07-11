const db = require('../datastore/init');
const schemas = require('../schemaValidator');

const Insert = async (req, res) => {
    const { client, usage_description, room_id } = req.body;

    const { result, error } = schemas.BookPOST.validate(req.body);

    if (error) {
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data. Please review request and try again.',
        });
    }

    try {
        const exist = await db.query('SELECT booking_id FROM booking WHERE room_id = $1', [room_id]);

        if (exist.rowCount > 0) {
            return res.status(403).json({
                status: 'error',
                message: 'Room Already Booked',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

    const now = new Date().toISOString();

    try {
        const result = await db.query(
            'INSERT INTO booking(client, usage_description, room_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [client, usage_description, room_id, now, now]
        );

        return res.status(200).json({
            status: 'success',
            data: result.rows,
        });
    } catch (error) {
        if (error.code == 23503) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid room id',
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

const GetAll = (req, res) => {
    db.query('SELECT * FROM booking ORDER BY room_id ASC')
        .then((result) => {
            return res.status(200).json({
                status: 'success',
                data: result.rows,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: 'error',
                message: err,
            });
        });
};

const GetByID = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM booking WHERE booking_id = $1 ORDER BY room_id ASC', [id])
        .then((result) => {
            return res.status(200).json({
                status: 'success',
                data: result.rows,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                status: 'error',
                message: err,
            });
        });
};

const Update = async (req, res) => {
    const { client, usage_description, room_id } = req.body;
    const booking_id = req.params.id;

    const { result, error } = schemas.BookPOST.validate(req.body);

    const now = new Date().toISOString();

    if (error) {
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data. Please review request and try again.',
        });
    }

    try {
        const exist = await db.query('SELECT booking_id FROM booking WHERE booking_id = $1', [booking_id]);
        if (exist.rowCount == 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Booking with given ID not Found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

    try {
        const result = await db.query(
            'UPDATE "booking" SET "client"= $1 ,"usage_description" = $2, "room_id" = $3, "updated_at" = $4 WHERE "booking_id" = $5 RETURNING *',
            [client, usage_description, room_id, now, booking_id]
        );
        return res.status(200).json({
            status: 'success',
            data: result.rows,
        });
    } catch (error) {
        if (error.code == 23503) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid room id',
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

const Delete = async (req, res) => {
    const booking_id = req.params.id;

    try {
        const exist = await db.query('SELECT booking_id FROM booking WHERE booking_id = $1', [booking_id]);

        if (exist.rowCount == 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Booking with given ID not Found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

    try {
        await db.query('DELETE FROM "booking" WHERE "booking_id" = $1', [booking_id]);
        return res.status(200).json({
            status: 'success',
            message: 'Booking with given ID Deleted',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    Insert,
    GetAll,
    GetByID,
    Update,
    Delete,
};
