import { CustomAttributeDto } from "@/dtos/app/custom_attribute.dto";
import { CustomAttribute } from "@/interfaces/app/custom.attribute.interface";
import CustomAttributeService from "@/services/custom.attribute.service";
import { NextFunction, Request, Response } from "express";
import { stringify } from "querystring";
class CustomAttributeController {
    public customAttributeService = new CustomAttributeService();
    //create Custom Attribute for contact / conversation
    public createCustomAttribute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customAtttributeData: CustomAttributeDto = req.body;
            const accountId: string =req.params.accountid;
            const createCustomAttributeData: CustomAttribute = await this.customAttributeService.createLabel(accountId, customAtttributeData);
            res.status(201).json({ data: createCustomAttributeData, message: 'Custom Attribute created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }
    //get custom attribute by id
    public getCustomAttributById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const id: string = req.params.id;
            // console.log("hello from notes controller");
            const findNoteData: CustomAttribute = await this.customAttributeService.getCustomAttributById(accountid, id);
            res.status(200).json({ data: findNoteData, message: 'findLabel', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }

    // get All Custom attribute by Account id
    public getCustomAttributByAccountId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const findCustomAttributeData: CustomAttribute[] = await this.customAttributeService.getCustomAttributByAccountId(accountid);
            res.status(200).json({ data: findCustomAttributeData, message: 'find CustomAttribute by Account', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }
    
    // update Custom Attribute By Object ID
    public updateCustomAttribute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const accountId: string =req.params.accountid;
            const customAtttributeData: CustomAttribute = req.body;
            const updateCustomAttribute: CustomAttribute = await this.customAttributeService.updateCustomAttribute(accountId, id, customAtttributeData);
            res.status(200).json({ data: updateCustomAttribute, message: 'Update Custom Attribute', statusCode: 200 });

        } catch (error) {
            next(error);
        }
    }
    // // delete Label By Object ID
    // public delete = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const Id: string = req.params.id;
    //       const accountId:string=req.params.accountid;
    //       const deleteNoteData: Label = await this.labelService.deleteLabel(accountId,Id);
    //       console.log(Id);
    //       res.status(200).json({ data: deleteNoteData, message: 'deleteLabel', statusCode: 200 });
    //     } catch (error) {
    //       next(error);
    //     }
    //   };

}
export default CustomAttributeController;