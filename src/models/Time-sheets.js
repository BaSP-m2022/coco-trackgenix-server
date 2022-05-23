import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  tasks: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Task',
  },
  employeeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Employee',
    required: true,
  },

  projectId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'project',
    required: true,
    immutable: true,
  },
  startDate: {
    type: Date,
    min: () => Date.now(),
  },
  endDate: {
    type: Date,
    required: true,
    min: () => Date.now(),
  },
});

export default mongoose.model('Timesheet', timesheetSchema);
