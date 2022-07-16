import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  clientName: { type: String, required: true },
  active: { type: Boolean, required: true },
  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Member',
    },
  ],
  pm: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Member',
  },
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
