const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    description: String,
    date: Date,
    task: String,
    validate: Boolean,
    projectId: String,
    employee: {
      name: String,
      role: {
        type: String,
        enum: ['DEV', 'TL', 'PM', 'QA'],
      },
    },
  });

module.exports = mongoose.model('Timesheet', timesheetSchema);