const pool = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
   


exports.getUser = async (req, res) => {
    const {email} = req.user
    

    try {
        const result = await pool.query('SELECT * FROM users INNER JOIN users_profile_edit ON users.id = users_profile_edit.id WHERE users.email = $1', [email])


        res.status(200).json(result.rows)
    } catch (e) {
        res.status(500).send({message: 'Server error'})
    }
}

exports.updateProfile = async (req, res) => {
    const image = req.file?.filename
    const {bgc, about, id} = req.body

    try {
        const result = await pool.query('UPDATE users_profile_edit SET bgc = $1, about = $2 WHERE id = $3', [bgc, about, id])
        if (image) {
            const resultTwo = await pool.query('UPDATE users SET profileimg = $1 WHERE id = $2', [image, id])
        }

        res.status(200).send({ message: 'Ok' })
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: "Server error" })
    }
} 