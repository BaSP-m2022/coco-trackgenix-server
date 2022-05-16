const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  task: String,
  validate: {
    type: Boolean,
    required: true,
  },
  projectId: String,
  employee: {
    name: String,
    role: {
      type: String,
      required: true,
      enum: ['DEV', 'TL', 'PM', 'QA'],
    },
  },
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
