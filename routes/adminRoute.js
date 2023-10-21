const express = require('express')
const router = express.Router()

const { addNewAdmin ,getAdmins ,getOneAdmin ,updateAdmin} = require('../controllers/AdminController')


router.get("/", (req,res)=>{
    res.send({message: "Admin Page"})
})

router.post("/addAdmin" , addNewAdmin)

router.get("/getAdmins" , getAdmins)

router.get("/getOneAdmin/:id" , getOneAdmin)

router.get("/updateAdmin/:id" , updateAdmin)


module.exports = router;