import { model, Schema, Document } from 'mongoose';
import { CustomAttribute } from '@/interfaces/app/custom.attribute.interface';
import { CustomAttributeMapping } from '@/interfaces/app/custom.attribute.Mapping.interface';



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
    mapping_id:{
        type: Schema.Types.ObjectId, 
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


const CustomAttributeMappingModel = model<CustomAttributeMapping & Document>('custom_attribute_mapping', CustomAttributeDataSchema);

export default CustomAttributeMappingModel;
