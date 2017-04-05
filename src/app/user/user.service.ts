import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { USERS } from "../mock"

@Injectable()
export class UserService {
  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error)
  }

  constructor() { };

  getAll(): Promise<User[]> {
    return Promise.resolve(USERS);
  }
  get(id: number): Promise<User> {
    return Promise.resolve(USERS.find(x => x.id == id));
  };
  create(user: User): Promise<User> {
    this.generateId(user);
    USERS.push(user);
    return Promise.resolve(user);
  };
  update(user: User): Promise<User> {
    for (var i in USERS) {
      if (USERS[i].id == user.id) {
        USERS[i] = user;
      }
    }
    return Promise.resolve(user);
  };
  delete(id: number): Promise<void> {
    USERS.filter(x => x.id != id);
    return Promise.resolve();
  };

  private max(values: number[]): number {
    var max: number;
    max = values[0];
    for (let v in values) {
      if (values[v] > max) max = values[v];
    }
    return max;
  }
  private generateId(user: User): void {
    var ids: number[];
    ids = USERS.map(x => x.id);
    var id = this.max(ids);
    user.id = id + 1;
  }
}