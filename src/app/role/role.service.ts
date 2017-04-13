import { Injectable } from '@angular/core';
import { Role } from "app/models/role";
import { ROLES, USER_ROLES } from "app/mock";
import { User } from "app/models/user";
import { UserRole } from "app/models/userrole";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Http, Headers, Response } from "@angular/http";

export class UserRoleModel {
  id: number;
  roleId: number;
  userId: number;
  set(userRole: UserRole): void {
    this.id = userRole.id;
    this.userId = userRole.user.id;
    this.roleId = userRole.role.id;
  }
}

@Injectable()
export class RoleService {
  private users: User[] = [];
  private roles: Role[] = [];
  private userRoles: UserRole[] = [];
  public roles$ = new Subject<Role[]>();
  public userRoles$ = new Subject<UserRole[]>();
  private rolesUrl = "http://58ec56937c2be2120024f164.mockapi.io/role";
  private userRolesUrl = "http://58ec56937c2be2120024f164.mockapi.io/userrole";
  private usersUrl = "http://58ec56937c2be2120024f164.mockapi.io/users";
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) { }

  getAll(): void {
    this.http.get(this.usersUrl)
      .map(resp => resp.json())
      .subscribe(res => {
        this.users = res;
      });

    this.http.get(this.rolesUrl, { headers: this.headers })
      .map(resp => resp.json() as Role[])
      .subscribe(data => {
        this.roles = data;
        this.roles$.next(this.roles);
      });

    setTimeout(() => {
      this.http.get(this.userRolesUrl, { headers: this.headers })
        .map(resp => resp.json() as UserRoleModel[])
        .subscribe(data => {
          this.userRoles = [];
          data.forEach(element => {
            let userRole = new UserRole();
            userRole.id = element.id;
            userRole.role = this.roles.find(x => x.id == element.roleId);
            userRole.user = this.users.find(x => x.id == element.userId);
            this.userRoles.push(userRole);
          });
          this.userRoles$.next(this.userRoles);
        })
    }, 200)
  };

  get(id: number): Role {
    return this.roles.find(x => x.id == id);
  }

  getByUser(user: User): Role[] {
    return this.userRoles.filter(x => x.user.id == user.id)
      .map(x => x.role);
  }

  removeUserRole(id: number): void {
    let url = this.userRolesUrl + "/" + id;
    this.http.get(url, { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      });
  };

  addUserRole(userRole: UserRole): void {
    let userRoleModel = new UserRoleModel();
    userRoleModel.set(userRole);
    this.http.post(this.userRolesUrl, JSON.stringify(userRoleModel), { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      });
  }
}
