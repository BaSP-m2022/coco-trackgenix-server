const timeSheets = require('../models/Time-sheets');

const getByOne = async (req, res) => {
  try {
    const oneTimeSheet = await timeSheets.find({ _id: req.params.id });
    res.status(200).json({
      message: 'TimeSheet fetched successfully',
      data: oneTimeSheet,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Inexistent TimeSheet',
      data: 'undefined',
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const allTimeSheets = await timeSheets.find({});
    res.status(200).json({
      message: 'TimeSheets fetched successfully',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      message: 'There are no timeSheets',
      data: 'undefined',
      error: true,
    });
  }
};

export default { getByOne, getAll };
