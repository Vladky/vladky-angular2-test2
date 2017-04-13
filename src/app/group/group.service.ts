import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { User } from '../models/user';
import { UserGroup } from '../models/usergroup';
import { GROUPS, USER_GROUPS } from "../mock"
import { Observable } from "rxjs/Observable";
import { Http, Headers, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";

export class UserGroupModel {
  set(userGroup: UserGroup): void {
    this.id = userGroup.id;
    this.groupId = userGroup.group.id;
    this.userId = userGroup.user.id
  }
  id: number;
  groupId: number;
  userId: number;
}

@Injectable()
export class GroupService {
  private groups: Group[];
  public groups$: Subject<Group[]> = new Subject();
  private userGroups: UserGroup[];
  public userGroups$: Subject<UserGroup[]> = new Subject();
  private GroupsUrl = "http://58ec56937c2be2120024f164.mockapi.io/group";
  private UsersUrl = "http://58ec56937c2be2120024f164.mockapi.io/users";
  private UserGroupsUrl = "http://58ec56937c2be2120024f164.mockapi.io/usergroup";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private users: User[] = [];

  constructor(
    private http: Http
  ) { };

  getAll(): void {
    this.http.get(this.UsersUrl)
      .map(resp => resp.json())
      .subscribe(res => {
        this.users = res;
      });

    this.http.get(this.GroupsUrl, { headers: this.headers })
      .map(resp => resp.json() as Group[])
      .subscribe(data => {
        this.groups = data;
        this.groups$.next(this.groups);
      });

    setTimeout(() => {
      this.http.get(this.UserGroupsUrl, { headers: this.headers })
        .map(resp => resp.json() as UserGroupModel[])
        .subscribe(data => {
          this.userGroups = [];
          data.forEach(element => {
            let userGroup = new UserGroup();
            userGroup.id = element.id;
            userGroup.group = this.groups.find(x => x.id == element.groupId);
            userGroup.user = this.users.find(x => x.id == element.userId);
            this.userGroups.push(userGroup);
          });
          this.userGroups$.next(this.userGroups);
        })
    }, 200)
  }

  get(id: number): Group {
    return this.groups.find(x => x.id == id);
  };

  getByUser(user: User): Group[] {
    return this.userGroups.filter(x => x.user.id == user.id)
      .map(x => x.group);
  };

  create(group: Group): void {
    this.http.post(this.GroupsUrl, JSON.stringify(group), { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      })
  };

  update(group: Group): void {
    console.log(group);
    let url = this.GroupsUrl + "/" + group.id;
    this.http.put(url, JSON.stringify(group), { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      })
  };

  delete(id: number): void {
    let url = this.GroupsUrl + "/" + id;
    this.http.delete(url, { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      })
  };
  deleteUserGroup(id: number): void {
    let url = this.UserGroupsUrl + "/" + id;
    this.http.delete(url, { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      })
  }
  addUserGroup(userGroup: UserGroup): void {
    let userGroupModel = new UserGroupModel();
    userGroupModel.set(userGroup);
    this.http.post(this.UserGroupsUrl, JSON.stringify(userGroupModel), { headers: this.headers })
      .map(resp => resp.json())
      .subscribe(data => {
        this.getAll();
      })
  }
  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error)
  }
}