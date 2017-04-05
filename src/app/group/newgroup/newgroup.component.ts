import { Component, OnInit } from '@angular/core';
import { Group } from "app/models/group";
import { GroupService } from "app/group/group.service";
import { GroupsComponent } from "app/group/groups.component";

@Component({
  selector: 'newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.css']
})
export class NewGroupComponent implements OnInit {
  title = "Новая группа"
  group: Group;
  constructor(
    private groupsComponent: GroupsComponent,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.group = new Group();
  }
  save(group: Group) {
    this.groupService.create(group);
    this.close();
  }
  close(): void {
    this.groupsComponent.newGroup = false;
  }

}
