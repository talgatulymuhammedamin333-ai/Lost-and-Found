const pool = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const secret = process.env.JWT_SECRET


exports.register = async (req, res) => {
    
    const image = req.file ? req.file.filename : '45735739845.png'
    const {name, surname, email, password} = req.body
    if (!name, !surname || !email || !password) return res.status(400).send({ message: 'Барлық өрістерді толтырыңыз' })

 
    try {

        const test = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (test.rows.length !== 0) {
            return res.status(409).send({ message: "Электронды пошта бос емес" })
        }

        const hash = await bcrypt.hash(password, 10)

        const result = await pool.query('INSERT INTO users(name, surname, email, password, profileImg) VALUES($1,$2,$3,$4,$5) RETURNING id', [name, surname, email, hash, image])

        const userId = result.rows[0].id

        await pool.query('INSERT INTO users_profile_edit (id) VALUES ($1)', [userId])

        const token = jwt.sign({email: email}, secret, {expiresIn: '12h'})

        res.json( token )

    } catch (e) {
        res.status(500).send({ message: "Сервер ошибка" })
    }
}  


exports.login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.send('Govno')
    }
    try {
        
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (result.rows.length < 1) return res.send("Account doesn't exist")

        const db_password = result.rows[0].password

        const isValid = await bcrypt.compare(password, db_password)

        if (isValid) {
            const token = jwt.sign({email: email}, secret, { expiresIn: '12h' })
            res.json(token)
        } else {
            return res.status(401).send({ message: "Incorrect Password" })
        }

    } catch (error) {
        res.status(500).send({ message: 'Server Error' })
    }

}