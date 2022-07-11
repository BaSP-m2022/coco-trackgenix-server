import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 120,
    lowercase: true,
  },
});

export default mongoose.model('Task', taskSchema);
