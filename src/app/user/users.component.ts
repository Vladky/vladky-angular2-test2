import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user'
import { UserService } from './user.service'
import { UserModalComponent } from './user-modal.component';
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Http } from "@angular/http";

@Component({
    selector: 'users',
    providers: [],
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
    title = 'Пользователи';
    users: User[];
    selected: User;
    editableUser: User;
    addForm = false;
    constructor(
        private userService: UserService,
        private http: Http,
        private us: UserService
    ) { }

    onselect(user: User): void {
        this.selected = user;
    }
    ngOnInit(): void {
        this.userService.getAll();
        this.userService.users$.subscribe(users => {
            this.users = users;
            // console.log(this.users[0].constructor.name);
        });
    }
    edit(user: User): void {
        this.editableUser = _.clone(user);
    }
    newUser(): void {
        this.addForm = true;
    }
    add(user: User): void {
        this.userService.create(user)
    }
    delete(user: User): void {
        this.userService.delete(user.id)
    }
    closeEdit(): void {
        this.editableUser = null;
    }
}