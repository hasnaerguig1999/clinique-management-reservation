const express = require('express')
const {getAllReclamations,createReclamation, updateReclamation,deleteReclamation,acceptReclamation,rejectReclamation} = require('../controllers/ReclamationController');
const router = express.Router()


router.post('/', createReclamation);
router.get('/', getAllReclamations);
router.post('/accepte', acceptReclamation);
router.post('/reject', rejectReclamation);




module.exports = router;