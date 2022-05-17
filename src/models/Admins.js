import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdminModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
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
  active: {
    type: Boolean,
    required: false,
  },

});

export default mongoose.model('Admin', AdminModel);
