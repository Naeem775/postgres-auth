const express = require('express');

const router = express.Router();
const {getUser,signUp,login, updatePassword, deleteUser} = require('../controllers/user')

router.get('/getUser', getUser);
router.post('/signUp', signUp);
router.put('/login', login);
router.put('/updatePassword', updatePassword);
router.put('/deleteUser', deleteUser);

module.exports = router;