const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
  description: String,
  date: Date,
  task: String,
  validation: Boolean,
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
