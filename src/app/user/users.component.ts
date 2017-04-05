import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user'
import { UserService } from './user.service'
import { UserModalComponent } from './user-modal.component';

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
    ) { }

    onselect(user: User): void {
        this.selected = user;
    }
    ngOnInit(): void {
        this.userService.getAll()
            .then(users => this.users = users);
    }
    gotoDetail(): void {
        // this.router.navigate(['/user-detail', this.selected.id]);
    }
    createNew(): void {
        // this.router.navigate(['/user-new']);
    }
    edit(user: User): void {
        this.editableUser = user;
    }
    newUser(): void {
        this.addForm = true;
    }
    add(user: User): void {
        this.userService.create(user)
            .then(user => {
                // this.users.push(user);
                this.selected = null;
            })
    }
    delete(user: User): void {
        this.userService
            .delete(user.id)
            .then(() => {
                this.users = this.users.filter(h => h !== user);
                if (this.selected === user) {
                    this.selected = null;
                }
            })
    }
    closeEdit(): void {
        this.editableUser = null;
    }
}