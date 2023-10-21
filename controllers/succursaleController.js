const Succursale = require('../models/Succursale');
const {validator, succursaleSchema} = require('../validator/joi')

getAllSuccursales = async (req, res) =>{
    const succursales = await Succursale.findAll();

    res.json({ succursales });
}

getSuccursaleById = async (req, res) =>{
    const id = req.params.id
    const succursale = await Succursale.findByPk(id);

    if(!succursale){
        return res.json({error: "Succursale Not Found"})
    }

    res.json({ succursale: succursale })
}

addSuccursale = async (req, res) =>{
    const err = validator(succursaleSchema, req.body)
    if(err){
        res.json(err)
    }
    const picture = req.file.filename
    const {name, address, phone, succursale_start, succursale_end} = req.body
    const data = {
        name,
        picture,
        address,
        phone,
        succursale_start,
        succursale_end
    }
    try {
        const succursale = await Succursale.create(data)

        res.json({ succursale });
    } catch (error) {
        console.error("something went wrong", err)
    }
}


updateSuccursale = async (req, res)=>{
    const err = validator(succursaleSchema, req.body)
    if(err){
        res.json(err)
    }
    
    const id = req.params.id
    const picture = req.file.filename
    let {name, address, phone, succursale_start, succursale_end} = req.body

    try {

        const succursale = await Succursale.findByPk(id)
        if(!succursale){
            return res.json({error: "Succursale Not Found"})
        }
        
        succursale.name = name
        succursale.picture = picture
        succursale.address = address
        succursale.phone = phone
        succursale.succursale_start = succursale_start
        succursale.succursale_end = succursale_end

        await succursale.save()

        res.json({succursale})
    } catch (error) {
        console.error("something went wrong", error)
    }
}

deleteSuccursale = async (req, res) => {
    const id  = req.params.id;

    const succursale = await Succursale.findByPk(id);

    if (!succursale) {
        return res.json({ error: "succursale not found" });
    }

    await succursale.destroy();

    res.status(200).json({ message: "succursale deleted successfully" })
}
    

module.exports = { addSuccursale, getAllSuccursales, getSuccursaleById, updateSuccursale, deleteSuccursale}