import { model, Schema, Document } from 'mongoose';
import { Team } from '@interfaces/team.interface';
import { CannedRes } from '@/interfaces/canned_response';



const CannedResSchema: Schema = new Schema({
    
    account_id: { 
        //type:Number,
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    short_code: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
  

});


const CannedResModel = model<CannedRes & Document>('CannedResponse', CannedResSchema);

export default CannedResModel;
