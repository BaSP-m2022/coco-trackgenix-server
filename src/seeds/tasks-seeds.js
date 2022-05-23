import mongoose from 'mongoose';

// Generate ObjectId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [{
  _id: mongoose.Types.ObjectId('62891835d4e286802a02756e'),
  description: 'task description',
  workedHours: '20',
  date: Date.now(),
}];
