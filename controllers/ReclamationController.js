
const {reclamationSchema, validator} = require('../validator/joi')
const Reclamation = require('../models/Reclamation')

const getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.findAll();

    res.json({ reclamations });
  } catch (error) {
    console.error('Error fetching reclamations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const createReclamation = async (req, res) => {
  const err = validator(reclamationSchema, req.body)
    if(err){
        res.json(err)
    }
  try {
    

    const { time,objet,content} = req.body;

  
    const reclamation= await Reclamation.create({
      time,
    objet,
    content
     
     });
 

    res.json({ reclamation });
  } catch (error) {
    console.error('Error during reclamation creation:', error);
    res.status(500).json({ error: 'An error occurred while creating the reclamation.' });
  }
};






const acceptReclamation = async (req, res) => {
  const reclamationId = req.params.id;
  try {
    const reclamation = await Reclamation.findByPk(reclamationId);

    if (!reclamation) {
      return res.status(404).json({ error: 'Réclamation non trouvée' });
    }

    reclamation.status = 'acceptée';
    await reclamation.save();

    res.json({ message: 'Réclamation acceptée avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'acceptation de la réclamation :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'acceptation de la réclamation." });
  }
};

const rejectReclamation = async (req, res) => {
  const reclamationId = req.params.id;
  try {
    const reclamation = await Reclamation.findByPk(reclamationId);

    if (!reclamation) {
      return res.status(404).json({ error: 'Réclamation non trouvée' });
    }

    reclamation.status = 'refusée';
    await reclamation.save();

    res.json({ message: 'Réclamation refusée avec succès' });
  } catch (error) {
    console.error('Erreur lors du refus de la réclamation :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors du refus de la réclamation.' });
  }
};



  
  module.exports = {
    createReclamation,
    getAllReclamations,
    validator,
    acceptReclamation,
    rejectReclamation
  };
