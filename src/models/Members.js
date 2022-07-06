import mongoose from 'mongoose';

const { Schema } = mongoose;

const MemberSchema = new Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    role: { type: String, required: true, enum: ['DEV', 'QA', 'PM'] },
    rate: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Members', MemberSchema);
