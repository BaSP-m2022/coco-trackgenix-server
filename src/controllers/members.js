import Members from '../models/Members';

const getAllMembers = async (req, res) => {
  try {
    const allMembers = await Members.find({}).populate('employee', {
      _id: 1,
    });

    return res.status(200).json({
      msg: 'Status 200',
      data: allMembers,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Status 500: internal server error',
      data: undefined,
      error: true,
    });
  }
};
const getByIdMembers = async (req, res) => {
  try {
    const oneMember = await Members.findById(req.params.id).populate('employee', {
      _id: 1,
    });
    if (oneMember) {
      res.status(200).json({
        msg: 'Status 200',
        data: oneMember,
        error: false,
      });
    } if (!oneMember) {
      res.status(404).json({
        msg: 'Status 404: Member not found',
        data: undefined,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Status 500: internal server error',
      data: undefined,
      error: true,
    });
  }
};

const putMembers = async (req, res) => {
  try {
    const putMember = await Members.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (putMember) {
      res.status(200).json({
        msg: 'Status 200',
        data: putMember,
        error: false,
      });
    } if (!putMember) {
      res.status(404).json({
        msg: 'Status 404: Member not found',
        data: undefined,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Status 500: internal server error',
      data: undefined,
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
    const rta = await AddMember.save();
    return res.status(201).json({
      msg: 'Status 201: Employee created',
      data: rta,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Status 500:internal server error',
      data: undefined,
      error: true,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const del = await Members.findByIdAndDelete(req.params.id);
    if (del) {
      res.status(200).json({
        msg: 'Status 200: Member deleted',
        data: undefined,
        error: false,
      });
    } if (!del) {
      res.status(404).json({
        msg: 'Status 404: Member deleted',
        data: undefined,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Status 500:internal server error',
      data: undefined,
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
