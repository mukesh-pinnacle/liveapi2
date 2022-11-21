import { NextFunction, Request, Response } from 'express';
import { InboxesShiftDetailsDto } from '@dtos/app/inboxes_shift_details.dto';
import { InboxesShiftDetails } from '@interfaces/app/inboxes_shift_details.interface';
import InboxesShiftDetailsService from '@services/inboxes_shift_details.service';

class InboxesShiftDetailsController {
  public inboxShiftDetailService = new InboxesShiftDetailsService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string =req.params.accountid;
      const data: InboxesShiftDetails[] = await this.inboxShiftDetailService.findAllInboxShiftDetails(accountId);
      
      res.status(200).json({ data, message: 'findAll Inbox Shift Details',statusCode: 200});
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const accountid: string =req.params.accountid;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.findInboxShiftDetailsById(accountid, inboxDetailId);
      res.status(200).json({ data, message: 'findOne Inbox Shift Details', statusCode: 200 });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: InboxesShiftDetailsDto = req.body;
      const accountid: string =req.params.accountid;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.createInboxShiftDetails(accountid , requestData);
      res.status(201).json({ data, message: 'Inbox Shift Details created', statusCode: 201});
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const requestData: InboxesShiftDetailsDto = req.body;
      const accountid: string =req.params.accountid;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.updateInboxShiftDetails(accountid, inboxDetailId, requestData);

      res.status(200).json({ data, message: 'Inbox Shift Details updated', statusCode: 201});
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const accountid: string =req.params.accountid;
      const data: InboxesShiftDetails = await this.inboxShiftDetailService.deleteInboxShiftDetails(accountid, inboxDetailId);
      res.status(200).json({ data, message: 'Inbox Shift Details deleted', statusCode: 201  });
    } catch (error) {
      next(error);
    }
  };
}

export default InboxesShiftDetailsController;
