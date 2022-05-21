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
    ref: 'Project',
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
  totalHours: {
    type: Number,
    default: 0,
  },
});

timesheetSchema.post(/^find/, async () => {
  await this.populate('tasks');
  const tasksContainer = this.tasks;
  let total = 0;
  // eslint-disable-next-line no-return-assign
  tasksContainer.forEach((task) => total += task.workedHours);
});

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

export default Timesheet;
