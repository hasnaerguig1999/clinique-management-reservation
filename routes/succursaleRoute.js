const express = require('express')
const router = express.Router()
const succursaleController = require('../controllers/succursaleController')

const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads/succursale')
    },
    filename: function(req, file, cd){
        cd(null, Date.now() + '_' + file.originalname )    
    }
})

let upload = multer({ storage: storage })

router.get("/", succursaleController.getAllSuccursales)
router.get("/:id", succursaleController.getSuccursaleById)

router.post("/create", upload.single('picture'), succursaleController.addSuccursale)
router.post("/update/:id", upload.single('picture'), succursaleController.updateSuccursale)
router.post("/delete/:id", succursaleController.deleteSuccursale)

module.exports = router;