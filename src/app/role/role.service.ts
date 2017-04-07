import { Injectable } from '@angular/core';
import { Role } from "app/models/role";
import { ROLES, USER_ROLES } from "app/mock";
import { User } from "app/models/user";
import { UserRole } from "app/models/userrole";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RoleService {

  constructor() { }
  getAll(): Observable<Role> {
    return new Observable(o => {
      for (let role of ROLES) {
        o.next(role);
      }
      o.complete();
    });
  }
  get(id: number): Observable<Role> {
    return new Observable(o => o.next(ROLES.find(x => x.id == id)));
  }
  getByUser(user: User): Observable<Role> {
    var res: Role[], userRole: UserRole;
    res = Array<Role>();
    for (let ur in USER_ROLES) {
      if (USER_ROLES[ur].user.id == user.id) {
        res.push(USER_ROLES[ur].role);
      }
    }
    console.log(res);
    return new Observable(o => {
      for (let r of res) {
        o.next(r);
      }
      o.complete();
    });
  }
  removeUserRole(user: User, role: Role): Observable<void> {
    var userRole = USER_ROLES.find(x => x.role == role && x.user == user);
    var index = USER_ROLES.indexOf(userRole, 0);
    if (index > -1) {
      USER_ROLES.splice(index, 1);
    }
    return new Observable<void>(o => {
      o.complete();
    });
  }
  addUserRole(role: Role, user: User): Observable<UserRole> {
    var userRole = new UserRole();
    userRole.role = role;
    userRole.user = user;
    this.generateId(userRole);
    USER_ROLES.push(userRole);
    return new Observable(o => {
      o.next(userRole);
      o.complete();
    });
  }
  private max(values: number[]): number {
    var max: number;
    max = 0;
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
