import { NextFunction, Request, Response } from 'express';
import { AvailabilityDto } from '@dtos/app/availability.dto';
import { AvailabilityInt } from '@interfaces/app/availability.interface';
import AvailabiltyService from '@services/availability.service';

class AvailabilityController {
    public availabiltyService = new AvailabiltyService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestData: AvailabilityDto = req.body;
            const accountID: string = req.params.accountid;
            const data: AvailabilityInt = await this.availabiltyService.createAvailability(accountID, requestData);
            res.status(201).json({ data, message: 'Availability created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    };

    // public update = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const workingHrID: string = req.params.id;
    //         const requestData: SigninSignoutDto = req.body;
    //         const accountID: string = req.params.accountid;
    //         const data: SigninSignoutInt = await this.signinsignoutService.updateSigninSignout(workingHrID, accountID, requestData);
    //         res.status(200).json({ data, message: 'Signin-Signout updated', statusCode: 201 });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountID: string = req.params.accountid
            const data: AvailabilityInt[] = await this.availabiltyService.findAll(accountID);
            res.status(200).json({ data, message: 'Availability findAll', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workinghrID: string = req.params.id;
            const accountID: string = req.params.accountid
            const data: AvailabilityInt = await this.availabiltyService.findById(accountID, workinghrID);
            res.status(200).json({ data, message: 'Availability By Id', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };

}

export default AvailabilityController;
