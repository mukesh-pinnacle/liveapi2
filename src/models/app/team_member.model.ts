import { model, Schema, Document } from 'mongoose';
import { TeamMember } from '@/interfaces/app/team_member.interface';

const TeamMemberSchema: Schema = new Schema({
  account_user_id: {
    //type:Number,
    type: Schema.Types.ObjectId,
    ref: 'AccountUser',
    required: true,
  },
  team_id: {
    //type:Number,
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    // unique: true,
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

const TeamMemberModel = model<TeamMember & Document>('TeamMember', TeamMemberSchema);

export default TeamMemberModel;
