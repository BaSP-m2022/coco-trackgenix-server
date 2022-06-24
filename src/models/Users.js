import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

export default mongoose.model('Users', UserSchema);
