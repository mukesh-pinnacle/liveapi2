
import { CustomAttributeMappingDto } from "@/dtos/app/custom_attributeMapping.dto";
import { HttpException } from "@/exceptions/HttpException";
import { CustomAttribute } from "@/interfaces/app/custom.attribute.interface";
import { CustomAttributeMapping } from "@/interfaces/app/custom.attribute.Mapping.interface";
import CustomAttributeMappingModel from "@/models/app/custom.atrribute.mapping.model";
import { isEmpty } from "@/utils/util";
import { Types } from "mongoose";

class CustomAttributeMappingService {
    public customAttributeMapping = CustomAttributeMappingModel;
    //create record
    public async createMapping(accountId: string, customAtttributeMapData: CustomAttributeMappingDto): Promise<CustomAttributeMapping> {
        console.log("Custom Attribute Mapping Services", accountId);
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(customAtttributeMapData)) throw new HttpException(400, 'Custom Attribute Mapping Data is empty');
        const findcustomAttrMap: CustomAttributeMapping = await this.customAttributeMapping.findOne(
            { $and: [{ custom_attribute_id:customAtttributeMapData.custom_attribute_id, account_id: accountId }] });
        //console.log("service ==  > ",findcustomAttribute);
        if (findcustomAttrMap) throw new HttpException(409, `The Custom Attribute Mapping : ${customAtttributeMapData.custom_attribute_id}  for account ${accountId} is already exists`);
        const createData = {
            "account_id": accountId,
            "custom_attribute_id": customAtttributeMapData.custom_attribute_id,
            "mapping_id": customAtttributeMapData.mapping_id,
            "is_active": customAtttributeMapData.is_active
        };
        const getCustomAttrMapData: CustomAttributeMapping = await this.customAttributeMapping.create(createData);
        return getCustomAttrMapData;
    };
    //get Notes
    public async getCustomAttributMapById(accountid: string, id: string,): Promise<CustomAttributeMapping> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(id)) throw new HttpException(400, 'Caustom Attrinute Mapping is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Custom Attribute Mapping id is invalid');
        const findSingleCustomattributeMap: CustomAttributeMapping = await this.customAttributeMapping.findOne({ account_id: accountid, _id: id });
        if (!findSingleCustomattributeMap) throw new HttpException(409, "Custom Attribute Mapping not available");
        return findSingleCustomattributeMap;
    };

    public async getCustomAttributMappingByAccountId(accountid: string): Promise<CustomAttributeMapping[]> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        const findCustomAttrMapByAccountid: CustomAttributeMapping[] = await this.customAttributeMapping.find({ account_id: accountid }).sort( { _id : -1} );;
        if (!findCustomAttrMapByAccountid) throw new HttpException(409, "Custom Attribute Mapping not available");
        return findCustomAttrMapByAccountid;
    };

    //update record
    public async updateCustomAttributeMap(accountId: string, id: string, customAtttributeMapData: CustomAttributeMappingDto): Promise<CustomAttributeMapping> {
        if (isEmpty(customAtttributeMapData)) throw new HttpException(400, 'custom Attribute update Data is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Custom attribute object ID is invalid');
       const findOneCustomAttributemap: CustomAttributeMapping = await this.customAttributeMapping.findOne({ _id: id ,account_id: accountId });
       
        const updateCustomAttributemapData: CustomAttributeMapping=await this.customAttributeMapping.findOneAndUpdate({_id:id, account_id:accountId},
            {$set:{
                mapping_id:customAtttributeMapData.mapping_id,
                is_active: customAtttributeMapData.is_active,
                updated_at: Date.now()
            }},
            { new : true, runValidators: true}
            );
        //console.log(updateCustomAttributeData);
        return updateCustomAttributemapData;
    }
    // deleted record
    public async deleteCustomAttributeMap(accountId: string, Id: string): Promise<CustomAttributeMapping> {
        //const deleteCustomAttr: CustomAttribute = await this.customAttribute.findOneAndupdate({ $and: [{ _id: Id }, { account_id: accountId }] });
        const deleteCustomAttrMap: CustomAttributeMapping = await this.customAttributeMapping.findByIdAndUpdate(
            Id,
            { $set: { is_active: 0, updated_at: Date.now() } },
            { new: true, runValidators: true },
          );
        //findOneAndDelete(localeId);
        if (!deleteCustomAttrMap) throw new HttpException(409, "Custom Attribute Map doesn't exist");
        return deleteCustomAttrMap;
    }

}
export default CustomAttributeMappingService;