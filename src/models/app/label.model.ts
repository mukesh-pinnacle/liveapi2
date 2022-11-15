import { model, Schema, Document } from 'mongoose';
import { Label } from '@/interfaces/label.interface';



const LabelSchema: Schema = new Schema({
    
    account_id: { 
        //type:Number,
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    title: {
        type: String, 
        required: true, 
    },
    description: {
        type: String, 
    },
    color : {
        type: String,
        required: true,
    },
    show_on_sid:{
        type:Boolean,
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


const LabelModel = model<Label & Document>('Label', LabelSchema);

export default LabelModel;
