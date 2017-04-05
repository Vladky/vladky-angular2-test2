import { Component, OnInit, Input } from '@angular/core';
import { Role } from "app/models/role";
import { User } from "app/models/user";
import { RoleService } from "app/role/role.service";

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
  roles: Role[];
  selectedRoles: Role[];
  checkboxes: RoleCheckbox[];
  title = "Роли пользователя";

  ngOnInit() {
    this.checkboxes = [];
    this.roleService.getAll()
      .then(x => {
        this.roles = x;
        for (var i = 0; i < this.roles.length; i++) {
          this.checkboxes[i] = new RoleCheckbox();
          this.checkboxes[i].role = this.roles[i];
          this.roleService.getByUser(this.user)
            .then(x => {
              this.selectedRoles = x;
              var ids = x.map(x => x.id);
              for (var i = 0; i < this.checkboxes.length; i++) {
                if (ids.indexOf(this.checkboxes[i].role.id) > -1) {
                  this.checkboxes[i].checked = true;
                }
              }
            });
        };
      });
  }

  changed(role: Role, value: boolean) {
    console.log("changed");
    console.log(role);
    console.log(value);
    if (value) {
      this.roleService.addUserRole(role, this.user);
    } else {
      this.roleService.removeUserRole(this.user, role);
    }
  }
}
