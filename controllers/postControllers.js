const pool = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

exports.createPost = async (req, res) => {
    try {
        const image = req.file?.filename
        const { user_id, title, status, description, phone } = req.body;
        console.log(user_id)


        if (!user_id || !title || !status || !description || !phone) {
            return res.status(400).json({
                message: 'Fill all fields'
            });
        }

        const result = await pool.query(
            `
            INSERT INTO posts
            (user_id, title, status, description, phone, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [user_id, title, status, description, phone, image]
        );

        res.status(201).json(result.rows[0]);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        });
        console.log(e)
    }
};

exports.lostPosts = async (req, res) => {
    try {
        const result = await pool.query("SELECT users.*, posts.* FROM posts INNER JOIN users ON posts.user_id = users.id WHERE status = 'lost' ")
        
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).send({ message: 'Server Error' })
    }
}

exports.foundPosts = async (req, res) => {
    try {
        const result = await pool.query("SELECT users.*, posts.* FROM posts INNER JOIN users ON posts.user_id = users.id WHERE status = 'Found' ")
        
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).send({ message: 'Server Error' })
    }
}

exports.getPostById = async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query('SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = $1',[id]);

        res.status(200).json(result.rows)
    } catch (e) {
        res.status(500).send({ message: 'Server error' })
    }
}