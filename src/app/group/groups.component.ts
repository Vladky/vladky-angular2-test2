import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from "../models/user";
import { Group } from "../models/group";
import { GroupService } from "../group/group.service";

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  title = "Группы пользователя";
  @Input() user: User;
  groups: Group[];
  newUserGroup = false;
  newGroup = false;
  editGroup = false;
  selectedGroup: Group;
  constructor(
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.groupService.getByUser(this.user)
      .then(gropus => {
        this.groups = gropus
      });
  }

  delete(group: Group, user: User): void {
    this.groupService.deleteUserGroup(group, user)
      .then(() => {
        var g = this.groups.find(x => x.id == group.id);
        var index = this.groups.indexOf(g, 0);
        if (index > -1) {
          this.groups.splice(index, 1);
        }
      });
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
