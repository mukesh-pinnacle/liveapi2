import { LabelDto } from "@/dtos/app/label.dto";
import { Label } from "@/interfaces/app/label.interface";
import LabelService from "@/services/label.service";
import { NextFunction, Request, Response } from "express";
import { stringify } from "querystring";
class LabelController {
    public labelService = new LabelService();
    //create Notes for contact 
    public createLabel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const labelData: LabelDto = req.body;
            const accountId: string =req.params.accountid;
            const createLabelData: Label = await this.labelService.createLabel(accountId, labelData);
            res.status(201).json({ data: createLabelData, message: 'Label created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }
    public getLabel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const id: string = req.params.id;
            // console.log("hello from notes controller");
            const findNoteData: Label[] = await this.labelService.findLabel(accountid, id);
            res.status(200).json({ data: findNoteData, message: 'findLabel', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }

    public getLabelBYAccountId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const findNoteData: Label[] = await this.labelService.getLabelBYAccountId(accountid);
            res.status(200).json({ data: findNoteData, message: 'findLabel', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }
    
    // update Notes By Object ID
    public updateLabel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const accountId: string =req.params.accountid;
            const labelData: LabelDto = req.body;
            const updateLabel: Label = await this.labelService.updateLabel(accountId, id, labelData);
            res.status(200).json({ data: updateLabel, message: 'UpdateLabel', statusCode: 200 });

        } catch (error) {
            next(error);
        }
    }
    // delete Label By Object ID
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const Id: string = req.params.id;
          const accountId:string=req.params.accountid;
          const deleteNoteData: Label = await this.labelService.deleteLabel(accountId,Id);
          console.log(Id);
          res.status(200).json({ data: deleteNoteData, message: 'deleteLabel', statusCode: 200 });
        } catch (error) {
          next(error);
        }
      };

}
export default LabelController;