const superAdmins = require('../data/super-admins.json');

module.exports = {
  getAllSuperAdmins(req, res) {
    res.status(200).json({
      data: superAdmins,
    });
  },

  getOneSuperAdmin(req, res) {
    const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));

    if (found) {
      res.json(superAdmins.filter((superAdmin) => superAdmin.id === parseInt(req.params.id, 10)));
    } else {
      res.status(400).json({ msg: `No superAdmin with the id of ${req.params.id}` });
    }
  },
};
