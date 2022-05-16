import superAdminModel from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const AllSuperAdmins = await superAdminModel.find({});
    return res.status(200).json(AllSuperAdmins);
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
    });
  }
};

const getSuperAdminById = async (req, res) => {
    try {
      if (req.params.id) {
        const superAdmin = await superAdminModel.findById({ _id: req.params.id });
        return res.status(200).json(superAdmin);
      }
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    } catch (error) {
      return res.json({
        msg: error,
      });
    }
  };

export default {
  getAllSuperAdmins,
  getSuperAdminById
};
