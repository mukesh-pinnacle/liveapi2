import { NextFunction, Request, Response } from 'express';
import { CannedResponsesDto } from '@dtos/app/CannedResponses.dto';
//import { Team } from '@interfaces/team.interface';
import CannedResService from '@services/canned_responses.service';
import { CannedRes } from '@/interfaces/app/canned_response';

class CannedResController {
    public cannedResService = new CannedResService();

    // get All Canned Responses by Account ID
    public getCannedResByAcID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cannedresbyaccid = req.params.accountId;
            const findAllCannedResBYAcID: CannedRes[] = await this.cannedResService.findAllCannedRes(cannedresbyaccid);
            res.status(200).json({ data: findAllCannedResBYAcID, message: 'findAll', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };
    //get canned responses by shortcode
    public getCannedRespByShort_code = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cannedresbyaccid = req.params.accountId;
            const shortcode: string = req.params.shortcode;
            console.log("hello from short code controller");
            
            const findcannedResData: CannedRes[] = await this.cannedResService.findCannedRespByShort_code(cannedresbyaccid, shortcode);
            res.status(200).json({ data: findcannedResData, message: 'find', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };
    
    // create Canned Responses
    public createCannedResp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cannedData: CannedResponsesDto = req.body;
            const accountId: string =req.params.accountId;
            console.log("canned Controller ==>", cannedData)
            const createCannedRespData: CannedRes = await this.cannedResService.createCannedResp(accountId, cannedData);
            res.status(201).json({ data: createCannedRespData, message: 'created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    };
    //update language
    public updateCannedResp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountId;
            const id: string = req.params.id;
            const CannedData: CannedResponsesDto = req.body;
            console.log('inside update  == ', accountid);
            const updateCannedData: CannedRes = await this.cannedResService.updateCannedResp(accountid, id, CannedData);
            res.status(200).json({ data: updateCannedData, message: 'updated', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };
    //delete language
    public deleteCannedRes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountId;
            const id: string = req.params.id;
            const deleteCannedData: CannedRes = await this.cannedResService.deleteCannedResp(accountid, id);
            res.status(200).json({ data: deleteCannedData, message: 'deleted', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };

}

export default CannedResController;
