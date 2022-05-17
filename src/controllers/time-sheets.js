const timeSheets = require('../models/Time-sheets');

const getByOne = async (req, res) => {
  try {
    const oneTimeSheet = await timeSheets.find({ _id: req.params.id });
    if (oneTimeSheet) {
      res.status(200).json({
        message: 'TimeSheet fetched successfully',
        data: oneTimeSheet,
        error: false,
      });
    }
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        message: `TimeSheets with id ${req.params.id} not found`,
        data: undefined,
        error: false,
        status: 404,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        data: error,
        error: true,
        status: 500,
      });
    }
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
    res.status(500).json({
      message: 'There are no timeSheets',
      data: undefined,
      error: true,
      status: 500,
    });
  }
};

export default { getByOne, getAll };
