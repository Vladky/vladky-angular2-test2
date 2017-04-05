import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/user";
import { Group } from "app/models/group";
import { GroupService } from "app/group/group.service";
import { GroupsComponent } from "app/group/groups.component";

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
    this.groupService.getAll()
      .then(res => {
        this.groups = res;
        this.group = this.groups[0];
      });
    this.userFullName = this.user.sname + " " + this.user.name + " " + this.user.mname;
  }

  changeGroup(id: number): void {
    this.groupService.get(id)
      .then(x => this.group = x);
  }

  close(): void {
    this.groupsComponent.newUserGroup = false;
  }

  save(): void {
    this.groupService.addUserGroup(this.group, this.user)
      .then(x => {
        this.groupsComponent.groups.push(x.group);
      })
    this.close();
  }

}
