import { AbstractController } from "../util/rest/controller";
import { Router, NextFunction, Response, request } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateRoleDto } from "../dto/CreateRole";
import HttpException from "../exception/HttpException";
import { RoleService } from "../services/RoleSevice";

class RoleController extends AbstractController {
    constructor(
        private roleService: RoleService
    ) {
        super(`${APP_CONSTANTS.apiPrefix}/role`);
        this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.post(
            `${this.path}/`,
            this.asyncRouteHandler(this.createRole)
        );

        this.router.get(
            `${this.path}/`,
            this.asyncRouteHandler(this.getAllRoles)
        );

        this.router.put(
            `${this.path}/`,
            this.asyncRouteHandler(this.updateRole)
        );

        this.router.delete(
            `${this.path}/`,
            this.asyncRouteHandler(this.deleteRole)
        );
    } 

    private createRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
          try {
            const data = await this.roleService.createRole(request.body);
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime,'OK')
            );
          } catch (err) {
            //   throw new HttpException(400, "Failed to create role");
              next(err);
          }
        
      }

      private getAllRoles = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        try {
            const data = await this.roleService.getAllRoles();
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime,'OK')
            );
          } catch (err) {
              next(err);
          }
      }

      private updateRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
          const data = await this.roleService.updateRole(request.body.roleId, request.body);
          response.status(201).send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
      }
    
      private deleteRole = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
          const data = await this.roleService.deleteRole(request.body.roleId);
          response.status(201).send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
      }
      
}

export default RoleController;