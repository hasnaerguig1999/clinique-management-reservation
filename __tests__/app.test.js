const { getAdmins } = require('../controllers/AdminController')
const { getAllTechniciens } = require('../controllers/TechnicienController')
const { getTechniciens } = require('../controllers/TechnicienController');




describe('getAdmins', () => {
    it('should run without errors', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
  
      await getAdmins(req, res);
    });
  });




// describe('getTechniciens', () => {
//   it('should retrieve all techniciens', async () => {
//     const req = {};
//     const res = {
//       json: jest.fn(),
//       status: jest.fn(),
//     };

//     await getAllTechniciens(req, res);

//     // Vérifie que res.status n'a pas été appelé avec le code d'erreur 500
//     expect(res.status).not.toHaveBeenCalledWith(500);

//     // Vérifie que res.json a été appelé avec des données de techniciens fictives (à adapter en fonction de vos besoins)
//     expect(res.json).toHaveBeenCalledWith({
//       techniciens: [
//         {
//           id: 2,
//           disponibility: 'true',
//           speciality: 'froid',
//           userId: 1,
//         },
        
        
//       ]
//     });
//   });
// });








  