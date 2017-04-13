import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/user";
import { Group } from "app/models/group";
import { GroupService } from "app/group/group.service";
import { GroupsComponent } from "app/group/groups.component";
import { UserGroup } from "app/models/usergroup";

@Component({
  selector: 'newusergroup',
  templateUrl: './newusergroup.component.html',
  styleUrls: ['./newusergroup.component.css']
})
export class NewUserGroupComponent implements OnInit {
  @Input() user: User;
  title = "Добавить пользователя в группу";
  userFullName: string;
  groups: Group[];
  group: Group;
  constructor(
    private groupService: GroupService,
    private groupsComponent: GroupsComponent,
  ) { }

  ngOnInit() {
    this.groups = [];
    this.groupService.getAll();
    this.groupService.groups$.subscribe(x => {
      this.groups = x
      if (this.groups.length > 0) {
        this.group = this.groups[0];
      }
    });
    this.userFullName = this.user.sname + " " + this.user.name + " " + this.user.mname;

  }

  changeGroup(id: number): void {
    this.group = this.groupService.get(id);
  }

  close(): void {
    this.groupsComponent.newUserGroup = false;
  }

  save(): void {
    let userGroup = new UserGroup();
    userGroup.group = this.group;
    userGroup.user = this.user;
    this.groupService.addUserGroup(userGroup);
    this.close();
  }

}
