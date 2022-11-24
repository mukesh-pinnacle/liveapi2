
import { CsatSurveyResponsesDto } from "@/dtos/app/csat_survey_responses.dto";
import { HttpException } from "@/exceptions/HttpException";
import { CsatSurveyResponsesInt } from "@/interfaces/app/csat_survey_responses.interface";
import CsatSurveyModel from "@/models/app/csat_survey_responses.model";
import { isEmpty } from "@/utils/util";
import { Types } from "mongoose";

class CsatSurveyResponsesService {
    public csatSurveyModel = CsatSurveyModel;
    //create record
    public async createCsat_Survey(accountId: string, csatsurveyData: CsatSurveyResponsesDto): Promise<CsatSurveyResponsesInt> {
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
        if (isEmpty(csatsurveyData)) throw new HttpException(400, 'Csat_Survey Data is empty');
        const findcustomAttribute: CsatSurveyResponsesInt = await this.csatSurveyModel.findOne({ $and: [{ display_name: { $regex: new RegExp(customAtttributeData.display_name, "i") }, account_id: accountId }] });
        //console.log("service ==  > ",findcustomAttribute);
        if (findcustomAttribute) throw new HttpException(409, `The Custom Attribute : ${customAtttributeData.display_name}  for account ${accountId} is already exists`);
        const createData = {
           
        };
        const getCustomAttributeData: CsatSurveyResponsesInt = await this.csatSurveyModel.create(createData);
        return getCustomAttributeData;
    };
    //get custom attribute responses
    public async getCsat_SurveyById(accountid: string, id: string,): Promise<CsatSurveyResponsesInt> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (isEmpty(id)) throw new HttpException(400, 'custome attribute is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Custom Attribute id is invalid');
        const findSingleCustomattribute: CsatSurveyResponsesInt = await this.csatSurveyModel.findOne({ account_id: accountid, _id: id });
        if (!findSingleCustomattribute) throw new HttpException(409, "custom Attribute not available");
        return findSingleCustomattribute;
    };

    public async getCsat_SurveyByAccountId(accountid: string): Promise<CsatSurveyResponsesInt[]> {
        if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
        const findCustomAttributeByAccountid: CsatSurveyResponsesInt[] = await this.csatSurveyModel.find({ account_id: accountid }).sort({ _id: -1 });
        if (findCustomAttributeByAccountid.length === 0) throw new HttpException(409, `Custom Attribute not available ${accountid}`);
        return findCustomAttributeByAccountid;
    };

    //update record
    public async updateCsat_Survey(accountId: string, id: string, customAtttributeData: CsatSurveyResponsesDto): Promise<CsatSurveyResponsesInt> {
        if (isEmpty(customAtttributeData)) throw new HttpException(400, 'custom Attribute update Data is empty');
        if (isEmpty(accountId)) throw new HttpException(400, 'Account id is empty');
        if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Custom attribute object ID is invalid');
        const findOneCustomAttribute: CsatSurveyResponsesInt = await this.csatSurveyModel.findOne({ display_name: { $regex: new RegExp(customAtttributeData.display_name, "i") }, account_id: accountId });
        if (findOneCustomAttribute.display_name == customAtttributeData.display_name)
            throw new HttpException(409, `The Display name : ${customAtttributeData.display_name}  for account ${accountId} is already exists`);
        // console.log("check===>",findOneCustomAttribute);
        const updateCustomAttributeData: CsatSurveyResponsesInt = await this.csatSurveyModel.findOneAndUpdate({ _id: id, account_id: accountId },
            {
                $set: {
                    display_name: customAtttributeData.display_name, key: customAtttributeData.key,
                    display_type: customAtttributeData.display_type,
                    mode: customAtttributeData.mode,
                    description: customAtttributeData.description,
                    is_active: customAtttributeData.is_active,
                    updated_at: Date.now()
                }
            },
            { new: true, runValidators: true }
        );

        //console.log(updateCustomAttributeData);
        return updateCustomAttributeData;
    }
    // deleted record
    public async deleteCsat_Survey(accountId: string, Id: string): Promise<CsatSurveyResponsesInt> {
        //const deleteCustomAttr: CustomAttribute = await this.customAttribute.findOneAndupdate({ $and: [{ _id: Id }, { account_id: accountId }] });
        const deleteCustomAttr: CsatSurveyResponsesInt = await this.csatSurveyModel.findByIdAndUpdate(
            Id,
            { $set: { is_active: 0, updated_at: Date.now() } },
            { new: true, runValidators: true },
        );
        //findOneAndDelete(localeId);
        if (!deleteCustomAttr) throw new HttpException(409, "Custom Attribute doesn't exist");
        return deleteCustomAttr;
    }

}
export default CsatSurveyResponsesService;