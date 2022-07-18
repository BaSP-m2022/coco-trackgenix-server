import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('44ac1ef2978ed2c8622bdfc8'),
    member: mongoose.Types.ObjectId('6289558814ac09a7c65a7c58'),
    project: mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
    startDate: '2020-01-01T00:00:00.000+00:00',
    endDate: '2020-01-07T00:00:00.000+00:00',
    Task: 'Fixing timesheet endpoint',
    workedHours: [0, 5, 6, 2, 0, 0, 8],
    approved: true,
  },
];
