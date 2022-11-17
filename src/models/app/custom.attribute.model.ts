import { model, Schema, Document } from 'mongoose';
import { CustomAttribute } from '@/interfaces/app/custom.attribute.interface';



const CustomAttributeSchema: Schema = new Schema({
    display_name: {
        type: String,
        require: true
    },
    key:{
        type: String,
        require: true,
    },
    display_type: {
        type: Number,
        require: true,
        // type ===> 1 :Text, 2 : Number, 3: Link, 4 : Date, 5: checkBox;
    },
    mode:{
        type:Number,
        require: true,
        //mode == > 1 : Conversation, 2 : Contact
    },
    description: {
        type: String, 
    },
    account_id: { 
        //type:Number,
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    is_active:{
        type: Number,
        require: true,
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


const CustomAttributeModel = model<CustomAttribute & Document>('custom_attribute', CustomAttributeSchema);

export default CustomAttributeModel;
