import { model, Schema, Document } from 'mongoose';
import { CsatSurveyResponsesInt  } from '@/interfaces/app/csat_survey_responses.interface';



const CsatSurveySchema: Schema = new Schema({
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        require: true
    },
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    message_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Message',
        required: true, 
    },
    contact_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Contact',
        required: true,
    },
    assigned_agent_id:{
        type: Schema.Types.ObjectId, 
        ref: 'Agent',
        required: true,
    },
    rating:{
        type: Number,
        require: true,
    },
    feedback_message:{
        type: String,
        //require: true,
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


const CsatSurveyModel = model<CsatSurveyResponsesInt & Document>('Csat_Survey_Response', CsatSurveySchema);

export default CsatSurveyModel;
