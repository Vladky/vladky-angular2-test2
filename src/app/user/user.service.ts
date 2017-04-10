import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { USERS } from "../mock"
import { Observable } from "rxjs/Observable";
import { } from "rxjs/*";
import * as _ from "lodash";
import { Subscriber } from "rxjs/Subscriber";

@Injectable()
export class UserService {
  users: Observable<User[]>;

  constructor() {
    this.users = this.getAll();
  };

  getAll(): Observable<User[]> {
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(USERS);
      observer.complete
    });
  }

  get(id: number): Observable<User> {
    return new Observable(o => {
      o.next(USERS.find(x => x.id == id));
      o.complete();
    });
  }

  create(user: User): Observable<User> {
    this.generateId(user);
    USERS.push(user); return new Observable(o => {
      o.next(user);
      o.complete();
    });
  }

  update(user: User): Observable<User> {
    for (var i in USERS) {
      if (USERS[i].id == user.id) {
        USERS[i] = user;
      }
    }
    return new Observable(o => {
      o.next(user);
      o.complete();
    });
  }

  delete(id: number): Observable<User[]> {
    var u = USERS.find(x => x.id == id);
    var index = USERS.indexOf(u, 0);
    if (index > -1) {
      USERS.splice(index, 1);
    }
    return this.getAll();
  }

  private max(values: number[]): number {
    var max: number;
    max = 0;
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
  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error)
  }
}