import { model, Schema, Document } from 'mongoose';
import { SigninSignoutInt } from '@interfaces/app/signinsignout.interface';

const signinsignoutSchema: Schema = new Schema({
   
    account_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true, 
    },
    user_id:{
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        require: true,
    },
    signin_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    signout_at: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const SigninSignoutModel = model<SigninSignoutInt & Document>('signinsignout', signinsignoutSchema);

export default SigninSignoutModel;