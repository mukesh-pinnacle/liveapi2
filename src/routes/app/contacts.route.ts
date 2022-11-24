import { Router } from 'express';
import ContactsController from '@controllers/app/contacts.controller';
import { CreateContactDto } from '@dtos/app/contacts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import validateObjectId from '@/middlewares/validate_id.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class ContactsRoute implements Routes {
  public path = '/contacts';
  public router: Router = Router();
  public contactsController = new ContactsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.contactsController.getContacts);
    this.router.get(`${this.path}/:id`, [validateObjectId, authMiddleware], this.contactsController.getContactById);
    this.router.post(`${this.path}`, validationMiddleware(CreateContactDto, 'body'), this.contactsController.createContact);
    this.router.put(`${this.path}/:id`, [validateObjectId, validationMiddleware(CreateContactDto, 'body', true)], this.contactsController.updateContact);
    this.router.delete(`${this.path}/:id`, [validateObjectId], this.contactsController.deleteContact);
    this.router.post(`${this.path}/bulk-upload`, this.contactsController.bulkUpload);
  }
}

export default ContactsRoute;
