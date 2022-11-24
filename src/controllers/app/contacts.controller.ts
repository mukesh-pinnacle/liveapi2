import { NextFunction, Request, Response } from 'express';
import { CreateContactDto } from '@dtos/app/contacts.dto';
import { Contact } from '@interfaces/app/contacts.interface';
import ContactsService from '@services/contacts.service';
//import { moveFileFunction, removeFile } from '@/custom/secure';
import { parse } from 'csv-parse';
import * as fs from "fs";

class ContactsController {
    public ContactService = new ContactsService();

    public getContacts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllContactsData: Contact[] = await this.ContactService.findAllContact();

            res.status(200).json({ data: findAllContactsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getContactById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contactId: string = req.params.id;

            const findOneContactData: Contact = await this.ContactService.findContactById(contactId);

            res.status(200).json({ data: findOneContactData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createContact = async (req: any, res: Response, next: NextFunction) => {
        try {
            const contactData: CreateContactDto = req.body;

            // if (req.files) {
            //     if (req.files.file_url) {
            //         req.body.file_url = await moveFileFunction(req.files.file_url, `contact/`);
            //     }
            // }
            const createContactData: Contact = await this.ContactService.createContact(contactData);

            res.status(201).json({ data: createContactData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateContact = async (req: any, res: Response, next: NextFunction) => {
        try {
            const contactId: string = req.params.id;
            const contactData: CreateContactDto = req.body;

            // if (req.files) {
            //     if(req.files.file_url){
            //         req.body.file_url = await moveFileFunction(req.files.file_url, `contact/`);
            //     }
            //     if(contactData.file_url){
            //         await removeFile(contactData.file_url);
            //     }
            // }

            const updateContactData: Contact = await this.ContactService.updateContact(contactId, contactData);

            res.status(200).json({ data: updateContactData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const contactId: string = req.params.id;
            const deleteContactData: Contact = await this.ContactService.deleteContact(contactId);

            res.status(200).json({ data: deleteContactData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };

    public bulkUpload = async (req: any, res: Response, next: NextFunction) => {
        try {
            const columns = [
                'id',
                'name',
                'email',
                'pubsub_token',
                'additional_attributes',
                'identifier',
                'custom_attributes',
                'phone_number'
            ];
            if (!req.files.csv_file) return res.status(400).json({ error: "csv file is required" });

            const { tempFilePath, name: file_name } = req.files.csv_file;
            
            const fileContent = fs.readFileSync(tempFilePath, { encoding: 'utf-8' });
            // fs.readSync
            parse(fileContent, {
                delimiter: ',',
                columns,
                fromLine: 2,
            }, async (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: error.message });
                }
                // console.log("Result", result);
                const account_id = "63372c907f358c5d9a4fb8d1"; // need to get from auth
                const dataToInsert = result.map((row) => {
                    const { name, email, pubsub_token, additional_attributes, identifier, custom_attributes, phone_number } =  row;
                    return { name, email, pubsub_token, additional_attributes, identifier, custom_attributes, phone_number, account_id, file_name };
                })
                const insertResult = await this.ContactService.bulkUpload(dataToInsert);
                if (!insertResult) return res.status(500).json({ data: null, message: "unable to upload.. Please try again" });
                return res.status(200).json({ data: null, message: 'uploaded successfully' });
            });
            // res.status(200).json({ result: true });
        } catch (error) {
            next(error);
        }
    }
}

export default ContactsController;
