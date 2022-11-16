import { NextFunction, Request, Response } from 'express';
import { CreateSuperadminDto } from '@/dtos/super_admin/superadmin.dto';
import { Superadmin } from '@/interfaces/super_admin/superadmin.interface';
import superadminService from '@/services/superadmin.service';

class SuperadminController {
  public superadminService = new superadminService();

  public getSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSuperadminData: Superadmin[] = await this.superadminService.findAllSuperadmin();
      res.status(200).json({ data: findAllSuperadminData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSuperadminById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superadminId: string = req.params.id;
      const findOneSuperadminData: Superadmin = await this.superadminService.findSuperadminById(superadminId);

      res.status(200).json({ data: findOneSuperadminData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superadminData: CreateSuperadminDto = req.body;
      const createSuperadminData: Superadmin = await this.superadminService.createSuperadmin(superadminData);

      res.status(201).json({ data: createSuperadminData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superadminId: string = req.params.id;
      const superadminData: CreateSuperadminDto = req.body;
      const updateSuperadminData: Superadmin = await this.superadminService.updateSuperadmin(superadminId, superadminData);

      res.status(200).json({ data: updateSuperadminData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSuperadmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const superadminId: string = req.params.id;
      const isActive: number = parseInt(req.params.isActive);
      const deleteSuperadminData: Superadmin = await this.superadminService.deleteSuperadmin(superadminId, isActive);

      res.status(200).json({ data: deleteSuperadminData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SuperadminController;
