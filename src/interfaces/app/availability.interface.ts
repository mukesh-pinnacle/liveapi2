import { ObjectId } from "mongoose";

export interface AvailabilityInt {
    _id: Number;
    signInSignOut_id: ObjectId;
    isAvailable:Number;
    account_id: ObjectId;
    available_time: Date;
    
}