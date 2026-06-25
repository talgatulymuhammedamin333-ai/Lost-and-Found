const express = require('express')
const { register, login } = require('../controllers/authControllers');
const { getUser, updateProfile } = require('../controllers/userControllers');
const upload = require('../middleware/upload');
const {auth} = require('../middleware/auth');
const { createPost, lostPosts, foundPosts, getPostById } = require('../controllers/postControllers');

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/profile', auth , getUser)
router.put('/updateProfile', upload.single('profileimg'), updateProfile)

router.post('/add/post', upload.single('postimg') ,createPost);
router.get('/posts/lost', lostPosts)
router.get('/posts/found', foundPosts)
router.get('/post/:id', getPostById);

module.exports = router;