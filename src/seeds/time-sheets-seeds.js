import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('628974188a9db559c45ac090'),
    tasks: [
      mongoose.Types.ObjectId('62894fba185b418d96264052'),
      mongoose.Types.ObjectId('62894fba185b418d96264042'),
      mongoose.Types.ObjectId('62894fba185b418d9626405f'),
    ],
    employeeId: mongoose.Types.ObjectId('62829bb99a4848a298b128d8'),
    projectId: mongoose.Types.ObjectId('6281c03e12eea3082f4cf758'),
    startDate: '2022-12-05T00:00:00.000+00:00',
    endDate: '2022-07-07T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628974188a9db559c45ac190'),
    tasks: [
      mongoose.Types.ObjectId('62894fba185b418d96264152'),
      mongoose.Types.ObjectId('62894fba185b418d96264442'),
      mongoose.Types.ObjectId('62894fba185b418d9626435f'),
    ],
    employeeId: mongoose.Types.ObjectId('62829bb99a4848a298b125d8'),
    projectId: mongoose.Types.ObjectId('6281c03e12eea3082f4cf158'),
    startDate: '2022-12-05T00:00:00.000+00:00',
    endDate: '2022-07-07T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628974188a9db559c45ac096'),
    tasks: [
      mongoose.Types.ObjectId('62894fba185b418d96264057'),
      mongoose.Types.ObjectId('62894fba185b418d96264046'),
      mongoose.Types.ObjectId('62894fba185b418d9626405a'),
    ],
    employeeId: mongoose.Types.ObjectId('62829bb99a4848a298b128d4'),
    projectId: mongoose.Types.ObjectId('6281c03e12eea3082f4cf754'),
    startDate: '2022-12-05T00:00:00.000+00:00',
    endDate: '2022-07-07T00:00:00.000+00:00',
  },
];
