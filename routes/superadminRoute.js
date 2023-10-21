const express = require('express')
const router = express.Router()
const superAdminController = require('../controllers/superAdminController')

router.get("/", (req,res)=>{
    res.send({message: "Super Admin Page"})
})
router.post("/register", superAdminController.register)

module.exports = router;