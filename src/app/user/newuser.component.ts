import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { UsersComponent } from "app/user/users.component";
import { UserService } from "app/user/user.service";

@Component({
  selector: 'newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  title="Новый пользователь";
  user: User;
  constructor(
    private userComponent: UsersComponent,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = new User();
  }
  close(): void {
    this.userComponent.addForm = false;
  }
  save(user: User): void {
    this.userService.create(user);
    this.close();
  }
}
