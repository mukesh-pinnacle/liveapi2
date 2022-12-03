import { model, Schema, Document } from 'mongoose';
import { SubSuperAdminDetailsInt } from '@/interfaces/super_admin/subsuperadmindetails.interface';
const subsuperadminDetailsSchema: Schema = new Schema({

    company_name: {
        type: String,
       required: true,
    },
    business_description: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
  
    mobile_no: {
        type: Number,
        require: true,
    },
    superAdmin_id: {
        type: Schema.Types.ObjectId,
        ref: "superadmins",
    },
    branch: {
        type: String,
        required: true,
    },
    is_active: {
        type: Number,
        default: 1,
    },
    
    expiry_on: {
        type: Date,
        required: false,
        default: Date.now(),
    },
    activated_on: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    remark: {
        type: String,
        required: false,
    },
});
const subSuperAdminDetailModel = model<SubSuperAdminDetailsInt & Document>('subsuperadminDetail', subsuperadminDetailsSchema);
export default subSuperAdminDetailModel;
