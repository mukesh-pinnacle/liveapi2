import { model, Schema, Document } from 'mongoose';
import { AccountUser } from '@/interfaces/super_admin/account_users.interface';
const accountUserSchema: Schema = new Schema({
  account_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  is_active: {
    type: Number,
    required: false,
    default: 2,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
});
const accountUserModel = model<AccountUser & Document>('AccountUser', accountUserSchema);
export default accountUserModel;
