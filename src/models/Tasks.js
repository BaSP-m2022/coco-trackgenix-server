import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
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
