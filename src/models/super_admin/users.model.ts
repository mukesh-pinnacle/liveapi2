import { model, Schema, Document } from 'mongoose';
import { User } from '@/interfaces/super_admin/users.interface';
const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: false,
  },
  is_active: {
    type: Number,
    default: 2,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
