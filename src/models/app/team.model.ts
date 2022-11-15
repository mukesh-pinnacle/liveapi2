import { model, Schema, Document } from 'mongoose';
import { Team } from '@/interfaces/app/team.interface';

const TeamSchema: Schema = new Schema({
  account_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  allow_auto_assign: {
    type: Number,
  },
  is_active: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const TeamModel = model<Team & Document>('Team', TeamSchema);

export default TeamModel;
