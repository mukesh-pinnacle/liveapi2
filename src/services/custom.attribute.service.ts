import LabelController from "@/controllers/app/label.controller";
import { CustomAttributeDto } from "@/dtos/app/custom_attribute.dto";
import { LabelDto } from "@/dtos/app/label.dto";
import { HttpException } from "@/exceptions/HttpException";
import { CustomAttribute } from "@/interfaces/app/custom.attribute.interface";
import { Label } from "@/interfaces/app/label.interface";
import CustomAttributeModel from "@/models/app/custom.attribute.model";
import { isEmpty } from "@/utils/util";
import { Types } from "mongoose";

class CustomAttributeService {
    public customAttribute = CustomAttributeModel;
    //create record
    public async createCustomAttribute(accountId: string, customAtttributeData: CustomAttributeDto): Promise<CustomAttribute> {
        console.log("Custom Attribute Services", accountId);
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(customAtttributeData)) throw new HttpException(400, 'Custom Attribute Data is empty');
        const findcustomAttribute: CustomAttribute = await this.customAttribute.findOne({ $and: [{ display_name: { $regex: new RegExp(customAtttributeData.display_name, "i") }, account_id: accountId }] });
        //console.log("service ==  > ",findcustomAttribute);
        if (findcustomAttribute) throw new HttpException(409, `The Custom Attribute : ${customAtttributeData.display_name}  for account ${accountId} is already exists`);
        const createData = {
            "account_id": accountId,
            "display_name": customAtttributeData.display_name,
            "key": customAtttributeData.key,
            "display_type": customAtttributeData.display_type,
            "mode": customAtttributeData.mode,
            "description": customAtttributeData.description,
            "is_active": 1
        };
        const getCustomAttributeData: CustomAttribute = await this.customAttribute.create(createData);
        return getCustomAttributeData;
    };
    //get Notes
    public async getCustomAttributById(accountid: string, id: string,): Promise<CustomAttribute> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(id)) throw new HttpException(400, 'custome attribute is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Custom Attribute id is invalid');
        const findSingleCustomattribute: CustomAttribute = await this.customAttribute.findOne({ account_id: accountid, _id: id });
        if (!findSingleCustomattribute) throw new HttpException(409, "custom Attribute not available");
        return findSingleCustomattribute;
    };

    public async getCustomAttributByAccountId(accountid: string): Promise<CustomAttribute[]> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        const findCustomAttributeByAccountid: CustomAttribute[] = await this.customAttribute.find({ account_id: accountid }).sort( { _id : -1} );;
        if (!findCustomAttributeByAccountid) throw new HttpException(409, "Custom Attribute not available");
        return findCustomAttributeByAccountid;
    };

    //update record
    public async updateCustomAttribute(accountId: string, id: string, customAtttributeData: CustomAttributeDto): Promise<CustomAttribute> {
        if (isEmpty(customAtttributeData)) throw new HttpException(400, 'custom Attribute update Data is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Custom attribute object ID is invalid');
       const findOneCustomAttribute: CustomAttribute = await this.customAttribute.findOne({ display_name: { $regex: new RegExp(customAtttributeData.display_name, "i") },account_id: accountId });
        if(findOneCustomAttribute.display_name==customAtttributeData.display_name)
        throw new HttpException(409, `The Display name : ${customAtttributeData.display_name}  for account ${accountId} is already exists`);
       // console.log("check===>",findOneCustomAttribute);
        const updateCustomAttributeData: CustomAttribute=await this.customAttribute.findOneAndUpdate({_id:id, account_id:accountId},
            {$set:{display_name: customAtttributeData.display_name, key: customAtttributeData.key,
                 display_type: customAtttributeData.display_type, 
                 mode:customAtttributeData.mode,
                description:customAtttributeData.description,
                is_active: customAtttributeData.is_active,
                updated_at: Date.now()
            }},
            { new : true, runValidators: true}
            );
    
        //console.log(updateCustomAttributeData);
        return updateCustomAttributeData;
    }
    // deleted record
    public async deleteCustomAttribute(accountId: string, Id: string): Promise<CustomAttribute> {
        //const deleteCustomAttr: CustomAttribute = await this.customAttribute.findOneAndupdate({ $and: [{ _id: Id }, { account_id: accountId }] });
        const deleteCustomAttr: CustomAttribute = await this.customAttribute.findByIdAndUpdate(
            Id,
            { $set: { is_active: 0, updated_at: Date.now() } },
            { new: true, runValidators: true },
          );
        //findOneAndDelete(localeId);
        if (!deleteCustomAttr) throw new HttpException(409, "Custom Attribute doesn't exist");
        return deleteCustomAttr;
    }

}
export default CustomAttributeService;