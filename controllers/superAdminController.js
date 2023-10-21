const bcrypt = require('bcrypt');
const {User, SuperAdmin} = require('../models');

register = async (req, res) => {
    const first_name = "Super";
    const last_name = "ADMIN";
    const picture = "SuperAdmin.png";
    const email = "superadmin@gmail.com";
    const password = await bcrypt.hash("superadmin", 10); ;
    const role = "superadmin";

    try {
        const user = await User.create({
            first_name,
            last_name,
            picture ,
            email,  
            password,
            role
        }, {
            include : [User.SuperAdmin]
        });

        if(user){
          console.log(user.id)
          var superAdmin = await SuperAdmin.create({ userId: user.id })

        }else  {
          (error)
          console.error('Error during registration:', error);
          res.status(500).json({ error: 'An error occurred while adding new SuperAdmin.' });
        }
        
        res.json({superAdmin})
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
}

module.exports = { register }

