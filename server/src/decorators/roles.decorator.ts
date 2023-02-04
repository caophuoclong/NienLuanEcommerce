import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "src/enum/roles.enum";

export const Roles = (...role: Array<RolesEnum>)=> SetMetadata("roles", role)