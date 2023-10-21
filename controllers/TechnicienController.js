const bcrypt = require('bcrypt');
const { technicienIdSchema} = require('../validator/joi')
const {Technicien,User} = require('../models')


// const getTechniciens = async (req, res) => {
  
// };



const getAllTechniciens = async (req, res) => {
  try {
    const techniciens = await Technicien.findAll({
      include: [
        {
          model: User
        }
      ]
    });

    res.json({ techniciens });
  } catch (error) {
    console.error('Error fetching techniciens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOneById = async (req, res) => {
  const technicienId = req.params.id;

  try {
    const technicien = await Technicien.findOne({
      where: { id: technicienId },
      include: [
        {
          model: User
        }
      ]
    });

    if (!technicien) {
      return res.status(404).json({ error: 'Technicien not found' });
    }

    res.json({ technicien });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the technicien.' });
  }
};



const updateTechnicien = async (req, res) => {
  const technicienId = req.params.id;
  const { error, value } = technicienIdSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const technicien = await Technicien.findByPk(technicienId);

    if (!technicien) {
      return res.status(404).json({ error: 'technicien not found' });
    }

    const updatedTechnicien = await technicien.update({
      disponibility: value.disponibility,
      speciality: value.speciality
    });

    const user = await User.findByPk(technicien.userId);

    if (!user) {
      console.error('Associated user not found for technicien ID:', technicienId);
    } else {
      const { email, password, first_name, last_name, picture, role } = value;
      if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await user.update({
        email,
        password: hashedPassword,
        first_name,
        last_name,
        picture,
        role
      });
    }

    res.json({ technicien: updatedTechnicien, user });
  } catch (error) {
    console.error('Error updating technicien and associated user:', error);
    res.status(500).json({ error: 'An error occurred while updating the technicien and user.' });
  }
};

  
  module.exports = {
    
    getAllTechniciens,
    getOneById,
    updateTechnicien,
   
    
  };
