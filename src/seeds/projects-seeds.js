import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628cf4a2a7b1b8d0ef02360d'),
  name: 'Lionel Messi',
  description: 'this is the description',
  startDate: '2022',
  clientName: 'rose',
  active: true,
  employees: [{
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
  admins: 'Coco Lobos',
}];
