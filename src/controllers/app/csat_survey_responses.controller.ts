import { CsatSurveyResponsesDto } from "@/dtos/app/csat_survey_responses.dto";
import { CsatSurveyResponsesInt } from "@/interfaces/app/csat_survey_responses.interface";
import CsatSurveyResponsesService from "@/services/csat_survey_responses.service";
import { NextFunction, Request, Response } from "express";

class CsatSurveyResponsesController {
    public csatSurveyResponsesService = new CsatSurveyResponsesService();
    //create Custom Attribute for contact / conversation
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const csatsurveyData: CsatSurveyResponsesDto = req.body;
            const accountId: string =req.params.accountid;
            const createCustomAttributeData: CsatSurveyResponsesInt = await this.csatSurveyResponsesService.createCsat_Survey(accountId, csatsurveyData);
            res.status(201).json({ data: createCustomAttributeData, message: 'Custom Attribute created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }
    //get custom attribute by id
    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const id: string = req.params.id;
            // console.log("hello from notes controller");
            const findNoteData: CsatSurveyResponsesInt = await this.csatSurveyResponsesService.getCsat_SurveyById(accountid, id);
            res.status(200).json({ data: findNoteData, message: 'find Custom Attribute By ID', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }

    // get All Custom attribute by Account id
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const findCustomAttributeData: CsatSurveyResponsesInt[] = await this.csatSurveyResponsesService.getCsat_SurveyByAccountId(accountid);
            res.status(200).json({ data: findCustomAttributeData, message: 'find CustomAttribute by Account', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }
    
    // update Custom Attribute By Object ID
    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const accountId: string =req.params.accountid;
            const customAtttributeData: CsatSurveyResponsesDto = req.body;
            const updateCustomAttribute: CsatSurveyResponsesInt = await this.csatSurveyResponsesService.updateCsat_Survey(accountId, id, customAtttributeData);
            res.status(200).json({ data: updateCustomAttribute, message: 'Update Custom Attribute', statusCode: 200 });

        } catch (error) {
            next(error);
        }
    }
    // delete Label By Object ID
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const Id: string = req.params.id;
          const accountId:string=req.params.accountid;
          const deleteNoteData: CsatSurveyResponsesInt = await this.csatSurveyResponsesService.deleteCsat_Survey(accountId,Id);
          console.log(Id);
          res.status(200).json({ data: deleteNoteData, message: 'delete Custom Attribute', statusCode: 200 });
        } catch (error) {
          next(error);
        }
      };

}
export default CsatSurveyResponsesController;