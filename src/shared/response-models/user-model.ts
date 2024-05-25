import {UserEntity} from "../../modules/users/user.entity";
import {EUserRoles} from "../../modules/users/utils/enums/e-user-roles";

export class UserModel {
    id: number;
    email: string;
    username: string;
    role: EUserRoles;
}