import { NextFunction, Request, Response } from 'express';
import { InboxesDto } from '@dtos/app/inboxes.dto';
import { Inboxes } from '@interfaces/app/inboxes.interface';
import InboxesService from '@services/inboxes.service';

class InboxesController {
  public inboxService = new InboxesService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllInboxesData: Inboxes[] = await this.inboxService.findAllInboxes();

      res.status(200).json({ data: findAllInboxesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxId: string = req.params.id;

      const findOneInboxData: Inboxes = await this.inboxService.findInboxById(inboxId);

      res.status(200).json({ data: findOneInboxData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxData: InboxesDto = req.body;
      const createInboxData: Inboxes = await this.inboxService.createInbox(inboxData);

      res.status(201).json({ data: createInboxData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxId: string = req.params.id;
      const inboxData: InboxesDto = req.body;
      const updateInboxData: Inboxes = await this.inboxService.updateInbox(inboxId, inboxData);

      res.status(200).json({ data: updateInboxData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxId: string = req.params.id;
      const deleteInboxData: Inboxes = await this.inboxService.deleteInbox(inboxId);

      res.status(200).json({ data: deleteInboxData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default InboxesController;
