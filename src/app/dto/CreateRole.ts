import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    public rname: string;
}