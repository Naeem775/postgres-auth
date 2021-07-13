const express = require('express');

const router = express.Router();
const {getUser,signUp,login} = require('../controllers/user')

router.get('/getUser', getUser);
router.post('/signUp', signUp);
router.put('/login', login);

module.exports = router;