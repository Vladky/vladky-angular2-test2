import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { USERS } from "../mock"
import { Observable } from "rxjs/Observable";
import { } from "rxjs/*";
import * as _ from "lodash";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";

@Injectable()
export class UserService {
  private url = "http://58ec56937c2be2120024f164.mockapi.io/users";
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public users$ = new Subject<User[]>();
  public users: User[] = [];

  constructor(
    private http: Http,
  ) { };

  getAll(): void {
    this.http.get(this.url, { headers: this.headers })
      .map((resp: Response) => resp.json())
      .subscribe((users: User[]) => {
        this.users = users;
        console.log(this.users);
        this.users$.next(this.users);
      });
  }

  get(id: number): void {
    let newUrl = this.url + "/" + id;
    this.http.get(this.url, { headers: this.headers })
      .map((resp: Response) => resp.json());
  }

  create(user: User): void {
    this.http.post(this.url, JSON.stringify(user), { headers: this.headers })
      .map((resp: Response) => resp.json())
      .subscribe((user: User) => {
        this.users.push(user);
        this.users$.next(this.users);
      })
  }

  update(user: User): void {
    let newUrl = this.url + "/" + user.id;
    this.http.put(newUrl, JSON.stringify(user), { headers: this.headers })
      .map((resp: Response) => resp.json())
      .subscribe((res) => {
        this.getAll();
      })
  }

  delete(id: number): void {
    let newUrl = this.url + "/" + id;
    this.http.delete(newUrl, { headers: this.headers })
      .map((resp: Response) => resp.json())
      .subscribe((user: User) => {
        this.getAll();
      })
  }

  private handleError(error: any): Promise<any> {
    console.log('Error: ', error);
    return Promise.reject(error.message || error)
  }
}