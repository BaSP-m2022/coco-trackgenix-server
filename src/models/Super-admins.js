import mongoose from 'mongoose';

const { Schema } = mongoose;

const SuperAdminModel = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
});

export default mongoose.model('Superadmin', SuperAdminModel);
