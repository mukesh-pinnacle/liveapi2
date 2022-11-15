import { model, Schema, Document } from 'mongoose';
import { Locale } from '@/interfaces/super_admin/locale.interface';

const LocaleSchema: Schema = new Schema({
  lng: {
    type: String,
    unique: true,
    required: true,
  },
  is_active: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const LocleModel = model<Locale & Document>('Locale', LocaleSchema);

export default LocleModel;
