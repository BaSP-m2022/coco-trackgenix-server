/* eslint-disable no-return-assign */
/* eslint-disable no-console */
import mongoose from 'mongoose';

function dateFormat(date) {
  if (!date) return date;
  return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
}

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
    ref: 'Project',
    required: true,
  },
  startDate: {
    type: Date,
    min: () => Date.now(),
    get: dateFormat,
  },
  endDate: {
    type: Date,
    required: true,
    min: () => Date.now(),
    get: dateFormat,
  },
});

export default mongoose.model('Timesheet', timesheetSchema);
