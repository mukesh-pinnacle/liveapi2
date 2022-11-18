import { model, Schema, Document } from 'mongoose';
import { CustomAttribute } from '@/interfaces/app/custom.attribute.interface';



const CustomAttributeDataSchema: Schema = new Schema({
    custom_attribute_id: {
        type: Schema.Types.ObjectId, 
        ref: 'custom_attributes',
        require: true
    },
    account_id: { 
        //type:Number,
        type: Schema.Types.ObjectId, 
        ref: 'accounts',
        required: true, 
    },
    contact_id:{
        type: Schema.Types.ObjectId, 
        ref: 'contacts',
    },
    conversation_id: {
        type: Schema.Types.ObjectId, 
        ref: 'conversation',
    },
});


const CustomAttributeMappingModel = model<CustomAttribute & Document>('custom_attribute_data', CustomAttributeDataSchema);

export default CustomAttributeMappingModel;
