import { model, Schema, Document } from 'mongoose';
import { Role } from '@interfaces/super_admin/roles.interface';

const roleSchema: Schema = new Schema({
  role: {
    type: String,
    required: true,
  },
  is_active: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const roleModel = model<Role & Document>('Roles', roleSchema);

export default roleModel;
