import { Component, OnInit, Input } from '@angular/core';
import { Role } from "app/models/role";
import { User } from "app/models/user";
import { RoleService } from "app/role/role.service";
import { Observable } from "rxjs/Observable";
import { UserRole } from "app/models/userrole";

export class RoleCheckbox {
  role: Role;
  checked: boolean;
}

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  constructor(
    private roleService: RoleService,
  ) { }

  @Input() user: User;
  roles: Role[] = [];
  userRoles: UserRole[] = [];
  selectedRoles: Role[] = [];
  checkboxes: RoleCheckbox[] = [];
  title = "Роли пользователя";

  ngOnInit() {
    this.roleService.getAll();
    this.roleService.roles$.subscribe(x => {
      this.roles = x
      this.fullSelectedRoles();
    });
    this.roleService.userRoles$.subscribe(x => {
      this.userRoles = x.filter(x => x.user.id == this.user.id);
      this.fullSelectedRoles();
    });
  };

  private fullSelectedRoles(): void {
    for (var i = 0; i < this.roles.length; i++) {
      let role = this.roles[i];
      this.checkboxes[i] = new RoleCheckbox();
      this.checkboxes[i].role = role;
      if (this.userRoles.map(x => x.role.id).indexOf(role.id) > -1) {
        this.checkboxes[i].checked = true;
      }
    }
  }

  changed(role: Role, value: boolean) {
    if (value) {
      let userRole = new UserRole();
      userRole.role = role;
      userRole.user = this.user;
      this.roleService.addUserRole(userRole);
    } else {
      let userRole = this.userRoles.find(x => x.role.id == role.id && x.user.id == this.user.id);
      this.roleService.removeUserRole(userRole.id);
    }
    this.fullSelectedRoles();
  }
}
