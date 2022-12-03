import { NextFunction, Request, Response } from 'express';
import { SubSuperAdminDetailsInt } from '@/interfaces/super_admin/subsuperadmindetails.interface';
import SubSuperAdminDetailsService from '@/services/subsuperadminDetails.service';
//import { SubSuperAdminSetailsDto } from '@/dtos/super_admin/subsuperadmin_details.dto';
import { CreateSuperadminDto } from '@/dtos/super_admin/superadmin.dto';
import { CreateSubSuperAdmin } from '@/dtos/super_admin/createSubSuperAdmin.dto';

class SubSuperAdminDetailController {
    public subsuperadminDetailsService = new SubSuperAdminDetailsService();

    //   public getSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const findAllSuperadminData: Superadmin[] = await this.superadminService.findAllSuperadmin();
    //       res.status(200).json({ data: findAllSuperadminData, message: 'findAll' });
    //     } catch (error) {
    //       next(error);
    //     }
    //   };

    //   public getSuperadminById = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const superadminId: string = req.params.id;
    //       const findOneSuperadminData: Superadmin = await this.superadminService.findSuperadminById(superadminId);

    //       res.status(200).json({ data: findOneSuperadminData, message: 'findOne' });
    //     } catch (error) {
    //       next(error);
    //     }
    //   };

    public createSubSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subsuperadminData = req.body;
            const createSuperadminData  = await this.subsuperadminDetailsService.createSuperadmin(subsuperadminData);
            res.status(201).json({ data: createSuperadminData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    //   public updateSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const superadminId: string = req.params.id;
    //       const superadminData: CreateSuperadminDto = req.body;
    //       const updateSuperadminData: Superadmin = await this.superadminService.updateSuperadmin(superadminId, superadminData);

    //       res.status(200).json({ data: updateSuperadminData, message: 'updated' });
    //     } catch (error) {
    //       next(error);
    //     }
    //   };

    //   public deleteSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       const superadminId: string = req.params.id;
    //       const isActive: number = parseInt(req.params.isActive);
    //       const deleteSuperadminData: Superadmin = await this.superadminService.deleteSuperadmin(superadminId, isActive);

    //       res.status(200).json({ data: deleteSuperadminData, message: 'deleted' });
    //     } catch (error) {
    //       next(error);
    //     }
    //   };
}

export default SubSuperAdminDetailController;
