import { Component, OnInit, Input, Inject } from '@angular/core';
import { UsersComponent } from './users.component';
import { User } from '../models/user'

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user: User;
  title: string;
  old: User;
  constructor(
    private usersComponent: UsersComponent,
  ) { }

  ngOnInit() {
    this.title = this.user.sname + " " + this.user.name + " " + this.user.mname;
    this.old = new User();
    this.old.name = this.user.name;
    this.old.mname = this.user.mname;
    this.old.sname = this.user.sname;
  }

  closeEdit(): void {
    this.user.mname = this.old.mname;
    this.user.name = this.old.name;
    this.user.sname = this.old.sname;
    this.usersComponent.closeEdit();
  }
  save(user: User): void {
    this.usersComponent.edit(user);
    this.usersComponent.closeEdit();
  }
}
