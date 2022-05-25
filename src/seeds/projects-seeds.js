import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
    name: 'Lionel Messi',
    description: 'this is the description',
    starDate: 2022,
    clientName: 'rose',
    active: true,
    employees: [
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a46'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a44'),
    ],
    admins: 'Coco Lobos',
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
    employees: [
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a46'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a45'),
      mongoose.Types.ObjectId('6283b662e53ed4c648db8a44'),
    ],
    admins: 'Coco Lobos',
    createdAt: 2022,
    updatedAt: 2022,
  },
];
