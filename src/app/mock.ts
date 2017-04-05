import { User } from './models/user';
import { Group } from './models/group';
import { Role } from './models/role';
import { UserGroup } from "./models/usergroup";
import { UserRole } from "app/models/userrole";

export const USERS: User[] = [
    { id: 1, name: "Сергей", sname: "Иванов", mname: "Петрович" },
    { id: 2, name: "Иван", sname: "Петров", mname: "Николаевич" },
    { id: 3, name: "Петр", sname: "Николаев", mname: "Алексеевич" },
    { id: 4, name: "Николай", sname: "Алексеев", mname: "Васильевич" },
    { id: 5, name: "Алексей", sname: "Васильев", mname: "Сергеевич" },
    { id: 6, name: "Алиса", sname: "Васильева", mname: "Викторовна" },
    { id: 7, name: "Василий", sname: "Сергеев", mname: "Сергеевич" },
    { id: 8, name: "Сергей", sname: "Сергеев", mname: "Иванович" },
    { id: 9, name: "Виктор", sname: "Алексеев", mname: "Петрович" }
]

export const GROUPS: Group[] = [
    { id: 1, name: "Группа 1" },
    { id: 2, name: "Группа 2" },
    { id: 3, name: "Группа 3" },
]
export const USER_GROUPS: UserGroup[] = [
    { id: 1, user: USERS[0], group: GROUPS[0] },
    { id: 2, user: USERS[0], group: GROUPS[1] },
    { id: 3, user: USERS[0], group: GROUPS[2] },
    { id: 4, user: USERS[1], group: GROUPS[1] },
    { id: 5, user: USERS[1], group: GROUPS[2] },
    { id: 6, user: USERS[2], group: GROUPS[0] },
    { id: 7, user: USERS[3], group: GROUPS[1] },
    { id: 8, user: USERS[4], group: GROUPS[0] },
    { id: 9, user: USERS[4], group: GROUPS[2] },
    { id: 10, user: USERS[5], group: GROUPS[0] },
    { id: 11, user: USERS[6], group: GROUPS[0] },
    { id: 12, user: USERS[6], group: GROUPS[1] },
    { id: 13, user: USERS[6], group: GROUPS[2] },
    { id: 14, user: USERS[7], group: GROUPS[2] },
    { id: 15, user: USERS[8], group: GROUPS[0] },
    { id: 16, user: USERS[8], group: GROUPS[1] },
]

export const ROLES: Role[] = [
    { id: 1, name: "Роль 1" },
    { id: 2, name: "Роль 2" },
    { id: 3, name: "Роль 3" },
    { id: 4, name: "Роль 4" },
    { id: 5, name: "Роль 5" },
]

export const USER_ROLES: UserRole[] = [
    { id: 1, user: USERS[0], role: ROLES[0] },
    { id: 2, user: USERS[0], role: ROLES[1] },
    { id: 3, user: USERS[1], role: ROLES[2] },
    { id: 4, user: USERS[1], role: ROLES[3] },
    { id: 5, user: USERS[1], role: ROLES[1] },
    { id: 6, user: USERS[2], role: ROLES[4] },
    { id: 7, user: USERS[2], role: ROLES[2] },
    { id: 8, user: USERS[3], role: ROLES[0] },
    { id: 9, user: USERS[4], role: ROLES[2] },
    { id: 10, user: USERS[4], role: ROLES[4] },
    { id: 11, user: USERS[4], role: ROLES[3] },
    { id: 12, user: USERS[4], role: ROLES[1] },
    { id: 13, user: USERS[5], role: ROLES[2] },
    { id: 14, user: USERS[5], role: ROLES[1] },
    { id: 15, user: USERS[6], role: ROLES[3] },
    { id: 16, user: USERS[6], role: ROLES[4] },
    { id: 17, user: USERS[7], role: ROLES[2] },
    { id: 18, user: USERS[7], role: ROLES[1] },
    { id: 19, user: USERS[8], role: ROLES[3] },
    { id: 20, user: USERS[8], role: ROLES[0] },
]