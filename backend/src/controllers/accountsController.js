const pool = require('../utils/db');

// Read all
const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accounts ORDER BY createdat DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read single
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create
const create = async (req, res) => {
    const { link, name, description } = req.body;
    if (!link || !name) return res.status(400).json({ error: 'Link and Name are required' });

    try {
        const result = await pool.query(
            'INSERT INTO accounts (link, name, description, createdat, updatedat) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
            [link, name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
const update = async (req, res) => {
    const { id } = req.params;
    const { link, name, description } = req.body;

    try {
        const result = await pool.query(
            'UPDATE accounts SET link=$1, name=$2, description=$3, updatedat=NOW() WHERE id=$4 RETURNING *',
            [link, name, description, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM accounts WHERE id=$1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAll, getById, create, update, remove };
