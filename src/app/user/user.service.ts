import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { USERS } from "../mock"
import { Observable } from "rxjs/Observable";
import { } from "rxjs/*";
import * as _ from "lodash";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { EventEmitter } from "events";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UserService {
  private url = "http://58ec56937c2be2120024f164.mockapi.io/users";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public users$ = new Subject<User[]>();

  constructor(
    private http: Http,
  ) {
    this.refresh();
  };

  refresh(): void {
    this.getAll().subscribe(x => {
      console.log(x);
      this.users$.next(x);
    });
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.url, { headers: this.headers })
      .map((resp: Response) => resp.json());
  }

  get(id: number): void {
    let newUrl = this.url + "/" + id;
    this.http.get(this.url, { headers: this.headers })
      .map((resp: Response) => resp.json());
  }

  create(user: User): void {
    this.http.post(this.url, JSON.stringify(user), { headers: this.headers })
      .toPromise();
    this.refresh();
  }

  update(user: User): void {
    let newUrl = this.url + "/" + user.id;
    this.http.put(newUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise();
    this.refresh();
  }

  delete(id: number): void {
    let newUrl = this.url + "/" + id;
    this.http.delete(newUrl, { headers: this.headers })
      .toPromise();
    this.refresh();
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