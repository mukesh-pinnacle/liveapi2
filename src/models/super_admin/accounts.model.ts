import { model, Schema, Document } from 'mongoose';
import { Account } from '@/interfaces/super_admin/accounts.interface';
const accountSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  domain: {
    type: String,
    required: true,
  },
  support_email: {
    type: String,
    required: true,
  },
  locale_id: {
    type: Schema.Types.ObjectId,
  },
  auto_resolve_duration: {
    type: Number,
    required: true,
    default: 1,
  },
  limits: {
    type: Number,
    required: false,
    default: 5,
  },
  is_active: {
    type: Number,
    required: false,
    default: 2,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
const accountModel = model<Account & Document>('Account', accountSchema);
export default accountModel;
