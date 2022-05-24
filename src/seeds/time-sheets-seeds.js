import mongoose from 'mongoose';

export default [{
  data: [
    {
      _id: mongoose.Types.ObjectId('628974188a9db559c45ac090'),
      tasks: [
        {
          description: 'other task',
          workedHours: 15,
          date: '2021-12-05T03:00:00.000Z',
        },
        {
          description: 'making some coffee',
          workedHours: 30,
          date: '2021-12-05T03:00:00.000Z',
        },
      ],
      employeeId: {
        firstName: 'bruno',
        lastName: 'ramirez',
        email: 'esteban@gmail.com',
      },
      projectId: {
        name: 'Ricardo Dosko',
        admins: 'Lucas Rendo',
      },
      startDate: '2022-12-05T00:00:00.000Z',
      endDate: '2022-07-07T00:00:00.000Z',
      totalHours: 0,
      __v: 0,
    },
  ],
}];
