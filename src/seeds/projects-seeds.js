import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
    name: 'Lionel Messi',
    description: 'this is the description',
    starDate: 2022,
    clientName: 'rose',
    active: true,
    members: [
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a46'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a44'),
    ],
    pm: mongoose.Types.ObjectId('6283b662e53ed4c648db8a49'),
    createdAt: 2022,
    updatedAt: 2022,
  },
  {
    _id: mongoose.Types.ObjectId('6283b662e53ed4c648db8b45'),
    name: 'Trackgenix',
    description: 'this is the description',
    starDate: 2022,
    clientName: 'rose',
    active: true,
    members: [
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a46'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a44'),
    ],
    pm: mongoose.Types.ObjectId('6283b662e53ed4c648db8a49'),
    createdAt: 2022,
    updatedAt: 2022,
  },
  {
    _id: mongoose.Types.ObjectId('628cf4a2a7b1b8d0ef02360d'),
    name: 'Lionel Messi',
    description: 'this is the description',
    startDate: '2022',
    clientName: 'rose',
    active: true,
    members: [{
      object: {
        role: 'PM',
        rate: '42',
        id: '1',
      },
      object2: {
        role: 'TL',
        rate: '101',
        id: '2',
      },
      object3: {
        role: 'TL',
        rate: '164',
        id: '3',
      },
    }],
    pm: mongoose.Types.ObjectId('6283b662e53ed4c648db8a49'),
  },
];
