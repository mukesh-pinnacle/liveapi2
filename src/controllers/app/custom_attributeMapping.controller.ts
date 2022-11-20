import { CustomAttributeMappingDto } from "@/dtos/app/custom_attributeMapping.dto";
import { CustomAttributeMapping } from "@/interfaces/app/custom.attribute.Mapping.interface";
import CustomAttributeMappingService from "@/services/custom.attribute.mapping.service";
import { NextFunction, Request, Response } from "express";
import { stringify } from "querystring";
class CustomAttributeMappingController {
     public customAttributeMappingService = new CustomAttributeMappingService();
    //create Custom Attribute for contact / conversation
    public createCustomAttrMapping = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customAtttrMappData: CustomAttributeMappingDto = req.body;
            const accountId: string =req.params.accountid;
            const createCustomAttributeMap: CustomAttributeMapping = await this.customAttributeMappingService.createMapping(accountId, customAtttrMappData);
            res.status(201).json({ data: createCustomAttributeMap, message: 'Custom Attribute Mapping created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    }
    //get custom attribute by id
    public getCustomAttributMapById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const id: string = req.params.id;
            // console.log("hello from notes controller");
            const findNoteData: CustomAttributeMapping = await this.customAttributeMappingService.getCustomAttributMapById(accountid, id);
            res.status(200).json({ data: findNoteData, message: 'find Custom Attribute Mapping By ID', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }

    // get All Custom attribute by Account id
    public getCustomAttributMappingByAccountId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountid = req.params.accountid;
            const findCustomAttributeData: CustomAttributeMapping[] = await this.customAttributeMappingService.getCustomAttributMappingByAccountId(accountid);
            res.status(200).json({ data: findCustomAttributeData, message: 'find CustomAttribute by Account', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    }
    
    // update Custom Attribute By Object ID
    public updateCustomAttributeMapping = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const accountId: string =req.params.accountid;
            const customAtttributeMapData: CustomAttributeMappingDto = req.body;
            const updateCustomAttribute: CustomAttributeMapping = await this.customAttributeMappingService.updateCustomAttributeMap(accountId, id, customAtttributeMapData);
            res.status(200).json({ data: updateCustomAttribute, message: 'Update Custom Attribute', statusCode: 200 });

        } catch (error) {
            next(error);
        }
    }
    // delete Label By Object ID
    public deleteCustomAttributeMap = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const Id: string = req.params.id;
          const accountId:string=req.params.accountid;
          const deleteCustomAttrinuteMapData: CustomAttributeMapping = await this.customAttributeMappingService.deleteCustomAttributeMap(accountId,Id);
          console.log(Id);
          res.status(200).json({ data: deleteCustomAttrinuteMapData, message: 'delete Cuteom Attribute Map', statusCode: 200 });
        } catch (error) {
          next(error);
        }
      };

}
export default CustomAttributeMappingController;