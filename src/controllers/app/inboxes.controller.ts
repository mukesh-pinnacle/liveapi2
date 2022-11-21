import { NextFunction, Request, Response } from 'express';
import { InboxesDto } from '@dtos/app/inboxes.dto';
import { Inboxes } from '@interfaces/app/inboxes.interface';
import InboxesService from '@services/inboxes.service';

class InboxesController {
  public inboxService = new InboxesService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId: string = req.params.accountid;
      const findAllInboxesData: Inboxes[] = await this.inboxService.findAllInboxes(accountId);
      res.status(200).json({ data: findAllInboxesData, message: 'find All Inboxes' });
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxId: string = req.params.id;
      const accountId: string = req.params.accountid;
      const findOneInboxData: Inboxes = await this.inboxService.findInboxById(inboxId, accountId);

      res.status(200).json({ data: findOneInboxData, message: 'findOne Inbox' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxData: InboxesDto = req.body;
      const accountId: string = req.params.accountid;
      const createInboxData: Inboxes = await this.inboxService.createInbox(accountId, inboxData);
      res.status(201).json({ data: createInboxData, message: 'Inbox created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxId: string = req.params.id;
      const inboxData: InboxesDto = req.body;
      const accountId: string = req.params.accountid;
      const updateInboxData: Inboxes = await this.inboxService.updateInbox(inboxId, accountId, inboxData);
      res.status(200).json({ data: updateInboxData, message: 'Inbox updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inboxId: string = req.params.id;
      const accountId: string = req.params.accountid;
      const deleteInboxData: Inboxes = await this.inboxService.deleteInbox(inboxId, accountId);
      res.status(200).json({ data: deleteInboxData, message: 'Inbox deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default InboxesController;
