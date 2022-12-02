import { model, Schema, Document } from 'mongoose';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';
const superadminSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: false,
  },
  is_active: {
    type: Number,
    default: 1,
  },
  is_subsuperAdmin:{
    type: Number,
    default: 0,  // if superadmin =0  sub super admin 1
    required: false,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
const superadminModel = model<Superadmin & Document>('Superadmin', superadminSchema);
export default superadminModel;
