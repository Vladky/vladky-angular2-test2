import { User } from "app/models/user";
import { Role } from "app/models/role";

export class UserRole {
    id: number;
    user: User;
    role: Role;
}