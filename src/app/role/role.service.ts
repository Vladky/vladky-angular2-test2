import { Injectable } from '@angular/core';
import { Role } from "app/models/role";
import { ROLES, USER_ROLES } from "app/mock";
import { User } from "app/models/user";
import { UserRole } from "app/models/userrole";

@Injectable()
export class RoleService {

  constructor() { }
  getAll(): Promise<Role[]> {
    return Promise.resolve(ROLES);
  }
  get(id: number): Promise<Role> {
    return Promise.resolve(ROLES.find(x => x.id == id));
  }
  getByUser(user: User): Promise<Role[]> {
    var res: Role[], userRole: UserRole;
    res = Array<Role>();
    for (let ur in USER_ROLES) {
      if (USER_ROLES[ur].user.id == user.id) {
        res.push(USER_ROLES[ur].role);
      }
    }
    return Promise.resolve(res);
  }
  removeUserRole(user: User, role: Role): Promise<void> {
    var userRole = USER_ROLES.find(x => x.role == role && x.user == user);
    var index = USER_ROLES.indexOf(userRole, 0);
    if (index > -1) {
      USER_ROLES.splice(index, 1);
    }
    return Promise.resolve();
  }
  addUserRole(role: Role, user: User): Promise<UserRole> {
    var userRole = new UserRole();
    userRole.role = role;
    userRole.user = user;
    this.generateId(userRole);
    USER_ROLES.push(userRole);
    return Promise.resolve(userRole);
  }
  private max(values: number[]): number {
    var max: number;
    max = values[0];
    for (let v in values) {
      if (values[v] > max) max = values[v];
    }
    return max;
  }
  private generateId(userRole: UserRole): void {
    var ids: number[];
    ids = USER_ROLES.map(x => x.id);
    var id = this.max(ids);
    userRole.id = id + 1;
  }
}
