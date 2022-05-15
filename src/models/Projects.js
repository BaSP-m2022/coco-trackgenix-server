import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  starDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  clientName: { type: String, required: true },
  active: { type: Boolean, required: true },
  employees: [{
    id: { type: String, required: true },
    role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
    rate: { type: String, required: true },
  }],
  admins: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('project', projectSchema);
