const express = require('express')
const router = express.Router()

const {register} = require('../controllers/Technician')
const { getAllTechniciens, getOneById, updateTechnicien } = require('../controllers/TechnicienController');


router.get('/',getAllTechniciens);
router.get('/:id', getOneById);
router.put('/:id',updateTechnicien);


router.post('/register', register);


module.exports = router;