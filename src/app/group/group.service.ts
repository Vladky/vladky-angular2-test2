import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { User } from '../models/user';
import { UserGroup } from '../models/usergroup';
import { GROUPS, USER_GROUPS } from "../mock"
import { Observable } from "rxjs/Observable";

@Injectable()
export class GroupService {
  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error)
  }

  constructor() { };

  getAll(): Observable<Group> {
    return new Observable(o => {
      for (let g of GROUPS)
        o.next(g);
    });
  }
  get(id: number): Observable<Group> {
    return new Observable(o => {
      o.next(GROUPS.find(x => x.id == id))
      o.complete();
    });
  };
  getByUser(user: User): Observable<Group> {
    var res: Group[], userGroups: UserGroup;
    res = Array<Group>();
    for (let ug in USER_GROUPS) {
      if (USER_GROUPS[ug].user.id == user.id) {
        res.push(USER_GROUPS[ug].group);
      }
    }
    return new Observable(o => {
      for (let r of res) {
        o.next(r);
      }
      o.complete();
    });
  };
  create(group: Group): Observable<Group> {
    this.generateId(group);
    GROUPS.push(group);
    return new Observable(o => {
      o.next(group);
      o.complete();
    });
  };
  update(group: Group): Observable<Group> {
    for (var i in GROUPS) {
      if (GROUPS[i].id == group.id) {
        GROUPS[i] = group;
      }
    }
    return new Observable(o => o.next(group));
  };
  delete(id: number): Observable<void> {
    GROUPS.filter(x => x.id != id);
    return new Observable<void>(o => {
      o.complete();
    });
  };
  deleteUserGroup(group: Group, user: User): Observable<void> {
    var ug = USER_GROUPS.find(x => x.group.id == group.id && x.user.id == user.id);
    var index = USER_GROUPS.indexOf(ug, 0);
    if (index > -1) {
      USER_GROUPS.splice(index, 1);
    }
    return new Observable<void>(o => {
      o.complete();
    });
  }
  addUserGroup(group: Group, user: User): Observable<UserGroup> {
    console.log(group);
    var userGroup = new UserGroup();
    userGroup.group = group;
    userGroup.user = user;
    this.generateIdforUserGroup(userGroup);
    USER_GROUPS.push(userGroup);
    return new Observable(o => {
      o.next(userGroup)
      o.complete();
    });
  }
  private max(values: number[]): number {
    var max: number;
    max = 0;
    for (let v in values) {
      if (values[v] > max) max = values[v];
    }
    return max;
  }
  private generateId(group: Group): void {
    var ids: number[];
    ids = GROUPS.map(x => x.id);
    var id = this.max(ids);
    group.id = id + 1;
  }
  private generateIdforUserGroup(userGroup: UserGroup): void {
    var ids: number[];
    ids = USER_GROUPS.map(x => x.id);
    var id = this.max(ids);
    userGroup.id = id + 1;
  }
}