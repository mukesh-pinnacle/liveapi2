import { LabelDto } from "@/dtos/app/label.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Label } from "@/interfaces/app/label.interface";
import LabelModel from "@/models/app/label.model";
import { isEmpty } from "@/utils/util";
import { Types } from "mongoose";


class LabelService {
    public labelModel = LabelModel;
    //create record
    public async createLabel(accountid: string, labelData: LabelDto): Promise<Label> {
       console.log("Label Services", accountid);
       if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(labelData)) throw new HttpException(400, 'Label Data is empty');
        const findLabel: Label = await this.labelModel.findOne( {$and:[{ title: { $regex: new RegExp(labelData.title, "i") }, account_id: accountid}]} );
            
        if (findLabel) throw new HttpException(409, `The Label : ${labelData.title}  for account ${labelData.account_id} is already exists`);
        const createLabelData: Label = await this.labelModel.create(labelData);
        return createLabelData;
    };
    //get Notes
    public async findLabel(accountid: string, id: string, ): Promise<Label[]> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(id)) throw new HttpException(400, 'User Id is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Label Id is invalid');
        const findLabel: Label[] = await this.labelModel.find({ account_id: accountid, _id: id });
        if (!findLabel) throw new HttpException(409, "Label not available");
        return findLabel;
    };

    public async getLabelBYAccountId(accountid: string): Promise<Label[]> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        const findLabelByAccountid: Label[] = await this.labelModel.find({ account_id: accountid });
        if (!findLabelByAccountid) throw new HttpException(409, "Label not available");
        return findLabelByAccountid;
    };
    
    //update record
    public async updateLabel(accountId: string, id: string, labelData: LabelDto): Promise<Label> {
        if (isEmpty(labelData)) throw new HttpException(400, 'Label Data is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Label ID is invalid');
       // console.log('inside Label Update service===', id);

       const findLabel: Label = await this.labelModel.findOne( {$and:[{ title: { $regex: new RegExp(labelData.title, "i") }, account_id: accountId}]} );    
        if (findLabel) throw new HttpException(409, `The Label : ${labelData.title}  for account ${labelData.account_id} is already exists`);
         const updateLabelById: Label = await this.labelModel.findByIdAndUpdate(id, { $set: labelData, updated_at: Date.now() }, { new: true, runValidators: true });
       // console.log(updateLabelById);
        if (!updateLabelById) throw new HttpException(409, "Label doesn't exist");
        return updateLabelById;
        
    }
    // deleted record
    public async deleteLabel(accountId:string, Id: string): Promise<Label> {
        const deleteNoteById: Label = await this.labelModel.findOneAndDelete({$and:[{_id:Id},{account_id:accountId}]});
        //findOneAndDelete(localeId);
        if (!deleteNoteById) throw new HttpException(409, "Label doesn't exist");
        return deleteNoteById;
    }

}
export default LabelService;