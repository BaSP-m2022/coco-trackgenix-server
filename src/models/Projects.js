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
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee',
      },
      role: {
        type: String,
        required: true,
        enum: ['DEV', 'QA', 'TL'],
      },
      rate: { type: Number, required: true },
    },
  ],
  pm: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Employee',
  },
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
