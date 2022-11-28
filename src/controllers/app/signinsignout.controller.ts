import { NextFunction, Request, Response } from 'express';
import { SigninSignoutDto } from '@dtos/app/signinsignout.dto';
import { SigninSignoutInt } from '@interfaces/app/signinsignout.interface';
import SigninSignoutService from '@services/signinsignout.service';

class SigninSignoutController {
    public signinsignoutService = new SigninSignoutService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestData: SigninSignoutDto = req.body;
            const accountID: string = req.params.accountid;
            const data: SigninSignoutInt = await this.signinsignoutService.createSigninSingout(accountID, requestData);
            res.status(201).json({ data, message: 'Signin-Signout created', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workingHrID: string = req.params.id;
            const requestData: SigninSignoutDto = req.body;
            const accountID: string = req.params.accountid;
            const data: SigninSignoutInt = await this.signinsignoutService.updateSigninSignout(workingHrID, accountID, requestData);
            res.status(200).json({ data, message: 'Signin-Signout updated', statusCode: 201 });
        } catch (error) {
            next(error);
        }
    };

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountID: string = req.params.accountid
            const data: SigninSignoutInt[] = await this.signinsignoutService.findAll(accountID);
            res.status(200).json({ data, message: 'Signin-Signout findAll', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workinghrID: string = req.params.id;
            const accountID: string = req.params.accountid
            const data: SigninSignoutInt = await this.signinsignoutService.findById(accountID, workinghrID);
            res.status(200).json({ data, message: 'findOne', statusCode: 200 });
        } catch (error) {
            next(error);
        }
    };

}

export default SigninSignoutController;
