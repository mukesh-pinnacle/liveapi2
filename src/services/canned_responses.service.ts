
import { CannedRes } from '@/interfaces/app/canned_response';
import { HttpException } from '@exceptions/HttpException';
import CannedResModel from '@/models/app/canned_response.model';
import { isEmpty } from '@utils/util';
import { ObjectId, Types } from 'mongoose';
import { CannedResponsesDto } from '@/dtos/app/CannedResponses.dto';
//import { Types } from 'mongoose';

class CannedResService {
  public cannedResModel = CannedResModel;
  // find canned responses by account id
  public async findAllCannedRes(accountId: string): Promise<CannedRes[]> {
    console.log("canned services", accountId);

    if (isEmpty(accountId)) throw new HttpException(400, 'Account Id is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    const findbyAccountID: CannedRes[] = await this.cannedResModel.find({ account_id: accountId });
    if (findbyAccountID.length===0) throw new HttpException(409, "Canned Responses doesn't exist");
    return findbyAccountID;
  }
//  get canned responses by id
public async getCannedResById(accountid: string, id: string,): Promise<CannedRes> {
  if (isEmpty(accountid)) throw new HttpException(400, 'Account id is empty');
  if (isEmpty(id)) throw new HttpException(400, 'Canned response id is empty');
  if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account Id is invalid');
  if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Canned response  id is invalid');
  const findSingleCustomattribute: CannedRes = await this.cannedResModel.findOne({ account_id: accountid, _id: id });
  if (!findSingleCustomattribute) throw new HttpException(409, "Canned response id not available");
  return findSingleCustomattribute;
};

  //find by caaned Responses By short_codes
  public async findCannedRespByShort_code(accountId: string, shortcode: string): Promise<CannedRes[]> {
    console.log('inside by Short Code and accountid  == ', shortcode, accountId);
    if (isEmpty(shortcode)) throw new HttpException(400, 'Short_Code is empty');
    const findCannedResByShortCode: CannedRes[] = await this.cannedResModel.find({ $and: [{ account_id: accountId }, { short_code: new RegExp(shortcode, 'i') }] });
    if (!findCannedResByShortCode) throw new HttpException(409, "Short_Code doesn't exist");
    return findCannedResByShortCode;
  }

  //create record
  public async createCannedResp(accountId: Object, cannedData: CannedResponsesDto): Promise<CannedRes> {
    if (isEmpty(cannedData)) throw new HttpException(400, 'Canned Response Data is empty');
    //if(accountId!=cannedData.account_id) throw new HttpException(409, 'account id in body is diffrent ');
    const findCannedRes: CannedRes = await this.cannedResModel.findOne({ short_code: { $regex: new RegExp(cannedData.short_code, "i") }, account_id: accountId });
    if (findCannedRes) throw new HttpException(409, `The short_code :  ${cannedData.short_code}  for account id ${cannedData.account_id} is already exists`);
    const createData={
        "account_id":accountId,
        "short_code":cannedData.short_code,
        "content":cannedData.content
    };
    const createcannedResData: CannedRes = await this.cannedResModel.create(createData);
    return createcannedResData;
  }
  //update record
  public async updateCannedResp(accountId: string, id: string, cannedData: CannedResponsesDto): Promise<CannedRes> {
    if (isEmpty(cannedData)) throw new HttpException(400, 'Canned Response Data is empty');
    if (!Types.ObjectId.isValid(accountId)) throw new HttpException(400, 'Account Id is invalid');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Canned Resp Id is invalid');
    console.log('inside update service===', accountId);
    if (id) {
      const findCannResObjectid: CannedRes = await this.cannedResModel.findOne({ short_code: cannedData.short_code });
      if (findCannResObjectid && findCannResObjectid._id != id) throw new HttpException(409, `This ${cannedData.short_code} already exists`);
      // find other object id which have same short code
    }
    const updateCannedData: CannedRes = await this.cannedResModel.findOneAndUpdate({ $and: [{ account_id: accountId }, { _id: id }] }, { $set: cannedData, updated_at: Date.now() }, { new: true, runValidators: true });
    console.log(updateCannedData);
    if (!updateCannedData) throw new HttpException(409, `short code doen't exist for the account ${accountId}`);
    return updateCannedData;
  }
  // deleted record
  public async deleteCannedResp(accountid: string, id: string): Promise<CannedRes> {
    if (!Types.ObjectId.isValid(accountid)) throw new HttpException(400, 'Account id is invalid');
    if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Canned Response Id is invalid');
    //console.log(teamId);
    const deleteCannedRes: CannedRes = await this.cannedResModel.findOneAndDelete({ $and: [{ account_id: accountid }, { _id: id }] }, { new: true, runValidators: true });
    console.log(deleteCannedRes);

    //findOneAndDelete(localeId);
    if (!deleteCannedRes) throw new HttpException(409, "Canned Responses doesn't exist");
    return deleteCannedRes;
  }

}


export default CannedResService;
