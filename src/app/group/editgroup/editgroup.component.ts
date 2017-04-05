import { Component, OnInit, Input } from '@angular/core';
import { Group } from "app/models/group";
import { GroupsComponent } from "app/group/groups.component";
import { GroupService } from "app/group/group.service";

@Component({
  selector: 'editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditGroupComponent implements OnInit {
  title = "Редактировать группу";
  @Input() group: Group;
  old: Group;
  constructor(
    private groupsComponent: GroupsComponent,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.old = new Group();
    this.old.name = this.group.name;
    this.old.id = this.group.id;
  }

  save(group: Group): void {
    this.groupService.update(group);
    this.groupsComponent.editGroup = false;
  }
  close(group: Group): void {
    console.log(this.old);
    this.group.name = this.old.name;
    this.group.id = this.old.id;
    this.groupsComponent.editGroup = false;
  }

}
