import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    email: { type: String },
    password: { type: String },
    active: { type: Boolean },
  },

);

export default mongoose.model('Employee', employeeSchema);
