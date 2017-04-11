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
    providers: [UserService],
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
        private http: Http
    ) { }

    onselect(user: User): void {
        this.selected = user;
    }
    ngOnInit(): void {
        this.userService.getAll();
        this.userService.users$.subscribe(users => this.users = users);
    }
    gotoDetail(): void {
        // this.router.navigate(['/user-detail', this.selected.id]);
    }
    createNew(): void {
        // this.router.navigate(['/user-new']);
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