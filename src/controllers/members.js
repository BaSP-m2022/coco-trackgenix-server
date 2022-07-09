import Members from '../models/Members';

const getAllMembers = async (req, res) => {
  try {
    const allMembers = await Members.find({}).populate('employee', {
      _id: 1,
      firstName: 1,
      lastName: 1,
    });
    if (!allMembers) {
      return res.status(400).json({
        message: 'Members list is empty',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Members list displayed correctly',
      data: allMembers,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error, impossible to get all members',
      data: error,
      error: true,
    });
  }
};
const getByIdMembers = async (req, res) => {
  try {
    const oneMember = await Members.findById(req.params.id).populate(
      'employee',
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
      },
    );
    if (oneMember) {
      res.status(200).json({
        message: 'The member has been found!',
        data: oneMember,
        error: false,
      });
    }
    if (!oneMember) {
      res.status(404).json({
        message: 'The member with the ID has been not found.',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const putMembers = async (req, res) => {
  try {
    const putMember = await Members.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (putMember) {
      res.status(200).json({
        message: 'Member has been updated!',
        data: putMember,
        error: false,
      });
    }
    if (!putMember) {
      res.status(404).json({
        message: 'Member not found',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error, member not updated',
      data: error,
      error: true,
    });
  }
};

const addMembers = async (req, res) => {
  try {
    const AddMember = new Members({
      employee: req.body.employee,
      role: req.body.role,
      rate: req.body.rate,
    });
    const newMember = await AddMember.save();
    return res.status(201).json({
      message: 'Member has been created',
      data: newMember,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error, member not created',
      data: undefined,
      error: true,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const memberDeleted = await Members.findByIdAndDelete(req.params.id);
    if (memberDeleted) {
      res.status(200).json({
        message: 'The member has been successfully deleted',
        data: undefined,
        error: false,
      });
    }
    if (!memberDeleted) {
      res.status(404).json({
        message: 'The member id to delete is not found',
        data: undefined,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error, member not deleted',
      data: error,
      error: true,
    });
  }
};

export default {
  getAllMembers,
  getByIdMembers,
  putMembers,
  addMembers,
  deleteMember,
};
