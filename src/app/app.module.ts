import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { UsersComponent } from './user/users.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService,  } from './in-memory-data.service';
import { UserModalComponent } from './user/user-modal.component';
import { GroupsComponent } from './group/groups.component';
import { GroupService } from './group/group.service';
import { NewuserComponent } from './user/newuser.component';
import { NewUserGroupComponent } from './group/newusergroup/newusergroup.component';
import { NewGroupComponent } from './group/newgroup/newgroup.component';
import { EditGroupComponent } from './group/editgroup/editgroup.component';
import { RolesComponent } from './role/roles.component';
import { RoleService } from './role/role.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserModalComponent,
    GroupsComponent,
    NewuserComponent,
    NewUserGroupComponent,
    NewGroupComponent,
    EditGroupComponent,
    RolesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent],
  providers: [UserService, GroupService, RoleService]
})
export class AppModule { }
