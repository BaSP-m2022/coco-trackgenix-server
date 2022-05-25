import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  clientName: { type: String, required: true },
  active: { type: Boolean, required: true },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Members',
  }],
  admins: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
