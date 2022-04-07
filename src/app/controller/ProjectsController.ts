import { AbstractController } from "../util/rest/controller";
import { Router, NextFunction, Response } from "express";
import { ProjectsService } from "../services/ProjectsService";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateProjectDto } from "../dto/CreateProjects";
import HttpException from "../exception/HttpException";

class ProjectsController extends AbstractController {
    constructor(
        private projectsService: ProjectsService
    ) {
        super(`${APP_CONSTANTS.apiPrefix}/projects`);
        this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.post(
            `${this.path}`,
            validationMiddleware(CreateProjectDto, APP_CONSTANTS.body),
            this.createProject
        );
    } 

    private createProject = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
          try {
            const data = await this.projectsService.createProject(request.body);
            response.send(
                this.fmt.formatResponse(data, Date.now() - request.startTime,'OK')
            );
          } catch (err) {
              throw new HttpException(400, "Failed to create project");
              next(err);
          }
        
      }
}

export default ProjectsController;