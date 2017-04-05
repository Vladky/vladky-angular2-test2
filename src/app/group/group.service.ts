import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { User } from '../models/user';
import { UserGroup } from '../models/usergroup';
import { GROUPS, USER_GROUPS } from "../mock"

@Injectable()
export class GroupService {
  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error)
  }

  constructor() { };

  getAll(): Promise<Group[]> {
    return Promise.resolve(GROUPS);
  }
  get(id: number): Promise<Group> {
    return Promise.resolve(GROUPS.find(x => x.id == id));
  };
  getByUser(user: User): Promise<Group[]> {
    var res: Group[], userGroups: UserGroup;
    res = Array<Group>();
    for (let ug in USER_GROUPS) {
      if (USER_GROUPS[ug].user.id == user.id) {
        res.push(USER_GROUPS[ug].group);
      }
    }
    return Promise.resolve(res);
  };
  create(group: Group): Promise<Group> {
    this.generateId(group);
    GROUPS.push(group);
    return Promise.resolve(group);
  };
  update(group: Group): Promise<Group> {
    for (var i in GROUPS) {
      if (GROUPS[i].id == group.id) {
        GROUPS[i] = group;
      }
    }
    return Promise.resolve(group);
  };
  delete(id: number): Promise<void> {
    GROUPS.filter(x => x.id != id);
    return Promise.resolve();
  };
  deleteUserGroup(group: Group, user: User): Promise<void> {
    var ug = USER_GROUPS.find(x => x.group.id == group.id && x.user.id == user.id);
    var index = USER_GROUPS.indexOf(ug, 0);
    if (index > -1) {
      USER_GROUPS.splice(index, 1);
    }
    return Promise.resolve();
  }
  addUserGroup(group: Group, user: User): Promise<UserGroup> {
    console.log(group);
    var userGroup = new UserGroup();
    userGroup.group = group;
    userGroup.user = user;
    this.generateIdforUserGroup(userGroup);
    USER_GROUPS.push(userGroup);
    return Promise.resolve(userGroup);
  }
  private max(values: number[]): number {
    var max: number;
    max = values[0];
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