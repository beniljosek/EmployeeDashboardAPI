import { getConnection, Repository } from "typeorm";
import { Role } from "../entities/Role";

export class RoleRepository extends Repository<Role> {
    public async createRole( roleDetails: Role) {
        const roleConnection = getConnection().getRepository(Role);
        const savedDetails = await roleConnection.save(roleDetails);
        return savedDetails;
    }

    public async getAllRoles() {
        const roleRepo = getConnection().getRepository(Role);
        return roleRepo.findAndCount();
    }

    public async updateRole(roleId : string, roleDetails : any) {
        const roleRepo = getConnection().getRepository(Role);
        const updatedRoleDetails = await roleRepo.update({ rid: roleId, deletedAt: null }, {
            rname: roleDetails.roleName
        });
        return updatedRoleDetails;
    }

    public async softDeleteRoleByID(roleId : string) {
        const roleRepo = getConnection().getRepository(Role);
        return roleRepo.softDelete({
            rid : roleId
        });
    }
}