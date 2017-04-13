import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from "../models/user";
import { Group } from "../models/group";
import { GroupService } from "../group/group.service";
import { UserGroup } from "app/models/usergroup";

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  title = "Группы пользователя";
  @Input() user: User;
  groups: Group[] = [];
  userGroups: UserGroup[] = [];
  newUserGroup = false;
  newGroup = false;
  editGroup = false;
  selectedGroup: Group;
  constructor(
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    console.log(this.user);
    this.groupService.getAll();
    this.groupService.userGroups$.subscribe(
      userGroups => {
        this.userGroups = userGroups;
        this.groups = userGroups.filter(userGroup => userGroup.user.id == this.user.id).map(x => x.group);
      });
  }

  delete(group: Group, user: User): void {
    let userGroup = this.userGroups.find(x => x.user.id == user.id && x.group.id == group.id);
    this.groupService.deleteUserGroup(userGroup.id);
  }

  addUserGroup(): void {
    this.newUserGroup = true;
  }
  addGroup(): void {
    this.newGroup = true;
  }
  edit(group): void {
    this.selectedGroup = group;
    this.editGroup = true;
  }

}
