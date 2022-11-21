import { NextFunction, Request, Response } from 'express';
import { InboxesDetailsDto } from '@dtos/app/inboxes_details.dto';
import { InboxesDetails } from '@interfaces/app/inboxes_details.interface';
import InboxesDetailsService from '@services/inboxes_details.service';

class InboxesDetailsController {
  public inboxService = new InboxesDetailsService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string= req.params.accountid;
      const data: InboxesDetails[] = await this.inboxService.findAll(accountId);
      res.status(200).json({ data, message: 'findAll Inboxes Details ' });
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const accountId: string= req.params.accountid;
      const data: InboxesDetails = await this.inboxService.findById(inboxDetailId, accountId);

      res.status(200).json({ data, message: 'findOne Inboxes Details' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: InboxesDetailsDto = req.body;
      const accountId: string=req.params.accountid;
      const data: InboxesDetails = await this.inboxService.createInboxDetails(accountId, requestData);
      res.status(201).json({ data, message: 'Inboxes Details Created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string=req.params.accountid;
      const inboxDetailId: string = req.params.id;
      const requestData: InboxesDetailsDto = req.body;
      const data: InboxesDetails = await this.inboxService.update(accountId, inboxDetailId, requestData);
      res.status(200).json({ data, message: ' Inboxes Details updated' });
    } catch (error) {
      next(error);
    }
  };

  // public delete = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const inboxDetailId: string = req.params.id;
  //     const data: InboxesDetails = await this.inboxService.delete(inboxDetailId);

  //     res.status(200).json({ data, message: 'deleted Inboxes Details' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default InboxesDetailsController;
