const Timesheets = require('../models/Time-sheets');

const getByOne = async (req, res) => {
    try {
        const OneTimeSheet = await Timesheets.find({_id: req.params.id});
        res.status(200).json({ 
            message: 'TimeSheet fetched successfully',
            data: OneTimeSheet,
            error: false
        });
    } catch (error) {
        res.status(404).json({ 
            message: 'Inexistent TimeSheet',
            data: '',
            error: true
        });
    }
}

const getAll = async (req, res) => {
    try {
        const AllTimeSheets = await Timesheets.find({});
        res.status(200).json({ 
            message: 'TimeSheets fetched successfully',
            data: AllTimeSheets,
            error: false
        });
    } catch (error) {
        res.status(404).json({ 
            message: 'There are no timeSheets',
            data: '',
            error: true
        });
    }   
}

export default {getByOne, getAll};