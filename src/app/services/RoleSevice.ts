import { plainToClass } from "class-transformer";
import { Role } from "../entities/Role";
import { RoleRepository } from "../repository/RoleRepository";

export class RoleService {
    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async createRole( roleInput: any) {
        const roleData = plainToClass(Role, {
            rname: roleInput.rname,
            // description: "KeyValue Training"
        });
        const savedDetails = await this.roleRepository.createRole(roleData);
        return savedDetails;
    }

    public async getAllRoles() {
        return this.roleRepository.getAllRoles();
    }

    public async updateRole(roleId : string, roleDetails : any) {
        const updatedRole = await this.roleRepository.updateRole(roleId, roleDetails);
    }

    public async deleteRole(roleId : string) {
        return this.roleRepository.softDeleteRoleByID(roleId);
    }
}