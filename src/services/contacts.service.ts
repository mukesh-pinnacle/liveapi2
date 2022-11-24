import { CreateContactDto } from '@dtos/app/contacts.dto';
import { HttpException } from '@exceptions/HttpException';
import { Contact } from '@interfaces/app/contacts.interface';
import contactsModel from '@models/app/contacts.model';
import { isEmpty } from '@utils/util';
import { Types } from 'mongoose';

class ContactsService {
  public contacts = contactsModel;

  public async findAllContact(): Promise<Contact[]> {
    const contacts: Contact[] = await this.contacts.find();
    return contacts;
  }

  public async findContactById(contactId: string): Promise<Contact> {
    if (isEmpty(contactId)) throw new HttpException(400, 'Contact Id is empty');
    if (!Types.ObjectId.isValid(contactId)) throw new HttpException(400, 'Contact Id is invalid');

    const findContact: Contact = await this.contacts.findOne({ _id: contactId });
    if (!findContact) throw new HttpException(409, "Contact doesn't exist");

    return findContact;
  }

  public async createContact(contactData: CreateContactDto): Promise<Contact> {
    if (isEmpty(contactData)) throw new HttpException(400, 'contactData is empty');

    const findContact: Contact = await this.contacts.findOne({ name: contactData.name });
    if (findContact) throw new HttpException(409, `This name ${contactData.name} already exists`);

    const createcontactData: Contact = await this.contacts.create(contactData);

    return createcontactData;
  }

  public async updateContact(contactId: string, contactData: CreateContactDto): Promise<Contact> {
    if (isEmpty(contactData)) throw new HttpException(400, 'contactData is empty');

    if (contactData.name) {
      const findContact: Contact = await this.contacts.findOne({ name: contactData.name });
      if (findContact && findContact._id.toString() != contactId) throw new HttpException(409, `This name ${contactData.name} already exists`);
    }

    const updateContactById: Contact = await this.contacts.findByIdAndUpdate(contactId, { $set: contactData });
    if (!updateContactById) throw new HttpException(409, "Contact doesn't exist");

    return updateContactById;
  }

  public async deleteContact(contactId: string): Promise<Contact> {
    const deleteContactById: Contact = await this.contacts.findByIdAndDelete(contactId);
    if (!deleteContactById) throw new HttpException(409, "Contact doesn't exist");

    return deleteContactById;
  }

  public async bulkUpload(data): Promise<any> {  
    // return this.contacts.bulkSave(data);
    this.contacts.insertMany(data, function(error) {
      if(error) return false;
      return true;
    });
    // const bulkUploadResult = await this.contacts.bulkWrite(data)
    // return bulkUploadResult;
  }
}

export default ContactsService;
