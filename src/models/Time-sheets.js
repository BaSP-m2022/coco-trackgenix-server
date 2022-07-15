/* eslint-disable no-return-assign */
/* eslint-disable no-console */
import mongoose from 'mongoose';

function dateFormat(date) {
  if (!date) return date;
  return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
}

const timesheetSchema = new mongoose.Schema({
  member: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Member',
    required: true,
  },
  projectId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    get: dateFormat,
  },
  endDate: {
    type: Date,
    required: true,
    get: dateFormat,
  },
  Task: {
    type: String,
    required: true,
  },
  workedHours: {
    type: [Number],
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('Timesheet', timesheetSchema);
