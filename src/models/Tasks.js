import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 120,
  },
});

export default mongoose.model('Task', taskSchema);
