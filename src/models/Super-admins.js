import mongoose from 'mongoose';

const { Schema } = mongoose;

const SuperAdminModel = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Superadmin', SuperAdminModel);
