import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  clientName: { type: String, required: true },
  active: { type: Boolean, required: true },
  members: {
    type: Map,
    of: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Member',
    },
    required: true,
  },
  pm: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Employee',
  },
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
