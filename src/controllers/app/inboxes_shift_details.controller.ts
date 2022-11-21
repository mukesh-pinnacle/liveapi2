import { NextFunction, Request, Response } from 'express';
import { InboxesShiftDetailsDto } from '@dtos/app/inboxes_shift_details.dto';
import { InboxesShiftDetails } from '@interfaces/app/inboxes_shift_details.interface';
import InboxesShiftDetailsService from '@services/inboxes_shift_details.service';

class InboxesShiftDetailsController {
  public inboxShiftDetailService = new InboxesShiftDetailsService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: InboxesShiftDetails[] = await this.inboxShiftDetailService.findAll();

      res.status(200).json({ data, message: 'findAll',statusCode: 200});
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;

      const data: InboxesShiftDetails = await this.inboxShiftDetailService.findById(inboxDetailId);

      res.status(200).json({ data, message: 'findOne', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: InboxesShiftDetailsDto = req.body;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.create(requestData);

      res.status(201).json({ data, message: 'created', statusCode: 201});
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const requestData: InboxesShiftDetailsDto = req.body;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.update(inboxDetailId, requestData);

      res.status(200).json({ data, message: 'updated', statusCode: 201});
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.delete(inboxDetailId);

      res.status(200).json({ data, message: 'deleted', statusCode: 201  });
    } catch (error) {
      next(error);
    }
  };
}

export default InboxesShiftDetailsController;
