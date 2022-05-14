const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  description: String,
  date: Date,
  task: mongoose.SchemaTypes.ObjectId,
  validate: Boolean,
  employee: mongoose.SchemaTypes.ObjectId,
  projectId: mongoose.SchemaTypes.ObjectId,
  projectManager: mongoose.SchemaTypes.ObjectId,
  role: String,
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
