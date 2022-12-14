import { NextFunction, Request, Response } from 'express';
import { WorkingHoursDto } from '@dtos/app/working_hours.dto';
import { WorkingHours } from '@interfaces/app/working_hours.interface';
import WorkingHoursService from '@services/working_hours.service';

class WorkingHoursController {
  public workingHoursService = new WorkingHoursService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountID: string=req.params.accountid
      const data: WorkingHours[] = await this.workingHoursService.findAllWorkingHours(accountID);
      res.status(200).json({ data, message: 'findAll', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workinghrID: string = req.params.id;
      const accountID: string= req.params.accountid
      const data: WorkingHours = await this.workingHoursService.findWorkingHoursById(accountID, workinghrID);

      res.status(200).json({ data, message: 'findOne', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: WorkingHoursDto = req.body;
      const accountID : string = req.params.accountid;
      const data: WorkingHours = await this.workingHoursService.createWorkingHours(accountID, requestData);
      res.status(201).json({ data, message: 'Working_Hours created', statusCode: 201  });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workingHrID: string = req.params.id;
      const requestData: WorkingHoursDto = req.body;
      const accountID: string=req.params.accountid;
      const data: WorkingHours = await this.workingHoursService.updateWorkingHours(workingHrID, accountID, requestData);
      res.status(200).json({ data, message: 'updated', statusCode: 201  });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workingHrID: string = req.params.id;
      const accaccountID: string= req.params.accountid;
      const data: WorkingHours = await this.workingHoursService.deleteWorkingHours(accaccountID , workingHrID);

      res.status(200).json({ data, message: 'deleted', statusCode: 201 });
    } catch (error) {
      next(error);
    }
  };
}

export default WorkingHoursController;
