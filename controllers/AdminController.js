
const bcrypt = require('bcrypt');

const {Admin,User} = require('../models')



async function addNewAdmin(req ,res){

     const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

    const{ first_name,last_name , email ,password,picture , role} = req.body

    console.log(req.body);

    try {
        if (!password) {
          return res.status(400).json({ error: 'Password is required.' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);


        const Users = await User.create({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            picture ,
            role,
            admins: {}
          },{include : [User.Admin]});
      

          if(Users){
            

            console.log(Users.id);
            const admin = await Admin.create({ userId: Users.id })

            res.json({ Users});

            console.log('Admin added successfully');


          }else  {
            (error)
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'An error occurred while adding new admin.' });
          }
          
        } catch (error) {
          console.error('Error during registration:', error);
          res.status(500).json({ error: 'An error occurred while adding new admin.' });
        }

}


async function getAdmins(req, res) {
  try {
    const admins = await Admin.findAll();
    // res.json(admins);
  } catch (error) {
    console.error('Error while fetching admins:', error);
    res.status(500).json({ error: 'An error occurred while getting admins.' });
  }
}



async function getOneAdmin(req, res) {
  const adminId = req.params.id; 

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    console.error('Error while fetching admin:', error);
    res.status(500).json({ error: 'An error occurred while getting admin.' });
  }
}




async function updateAdmin(req, res) {
  const adminId = req.params.id; 
  const { first_name, last_name, email, password, picture, role } = req.body;

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

   
    admin.first_name = first_name;
    admin.last_name = last_name;
    admin.email = email;
    admin.password = password;
    admin.picture = picture;
    admin.role = role;
    

    
    await admin.save();

    res.json(admin);
  } catch (error) {
    console.error('Error while updating admin:', error);
    res.status(500).json({ error: 'An error occurred while updating admin.' });
    res.status(500).json({ error: 'An error occurred while updating admin.' });
  }
}



module.exports = {addNewAdmin ,getAdmins ,getOneAdmin ,updateAdmin}