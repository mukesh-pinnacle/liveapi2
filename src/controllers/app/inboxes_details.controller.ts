import { NextFunction, Request, Response } from 'express';
import { InboxesDetailsDto } from '@dtos/app/inboxes_details.dto';
import { InboxesDetails } from '@interfaces/app/inboxes_details.interface';
import InboxesDetailsService from '@services/inboxes_details.service';

class InboxesDetailsController {
  public inboxService = new InboxesDetailsService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: InboxesDetails[] = await this.inboxService.findAll();

      res.status(200).json({ data, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;

      const data: InboxesDetails = await this.inboxService.findById(inboxDetailId);

      res.status(200).json({ data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: InboxesDetailsDto = req.body;
      const data: InboxesDetails = await this.inboxService.create(requestData);

      res.status(201).json({ data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const requestData: InboxesDetailsDto = req.body;
      const data: InboxesDetails = await this.inboxService.update(inboxDetailId, requestData);

      res.status(200).json({ data, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxDetailId: string = req.params.id;
      const data: InboxesDetails = await this.inboxService.delete(inboxDetailId);

      res.status(200).json({ data, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default InboxesDetailsController;
