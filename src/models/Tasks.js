import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 120,
    lowercase: true,
  },
  created: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

export default mongoose.model('Task', taskSchema);
