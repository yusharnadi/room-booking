const db = require('../datastore/init');
const schemas = require('../schemaValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const { result, error } = schemas.userRegister.validate(req.body);

    const now = new Date().toISOString();

    if (error) {
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data. Please review request and try again.',
        });
    }

    try {
        const exist = await db.query('SELECT "user_id" FROM "user" WHERE "email" = $1', [email]);

        if (exist.rowCount > 0) {
            return res.status(403).json({
                status: 'error',
                message: 'User with given email already registered.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO "user" (name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, email, role, created_at',
            [name, email, hashedPassword, role, now, now]
        );

        return res.status(200).json({
            status: 'success',
            data: result.rows,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    const { result, error } = schemas.userLogin.validate(req.body);

    if (error) {
        return res.status(422).json({
            status: 'error',
            message: 'Invalid request data. Please review request and try again.',
        });
    }

    try {
        const exist = await db.query('SELECT * FROM "user" WHERE "email" = $1', [email]);

        if (exist.rowCount == 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User with given email not Found.',
            });
        }

        const hash = exist.rows[0].password;

        const isValid = await bcrypt.compare(password, hash);

        if (!isValid) {
            return res.status(403).json({
                status: 'error',
                message: 'User and Password incorrect.',
            });
        }
        const payload = {
            name: exist.rows[0].name,
            email: exist.rows[0].email,
            role: exist.rows[0].role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({
            status: 'success',
            token: 'Bearer ' + token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        });
    }
};

module.exports = {
    Register,
    Login,
};
