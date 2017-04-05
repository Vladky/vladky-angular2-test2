import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let users = [
            { "id": 1, "name": "Сергей", "sname": "Иванов", "mname": "Петрович" },
            { "id": 2, "name": "Иван", "sname": "Петров", "mname": "Николаевич" },
            { "id": 3, "name": "Петр", "sname": "Николаев", "mname": "Алексеевич" },
            { "id": 4, "name": "Николай", "sname": "Алексеев", "mname": "Васильевич" },
            { "id": 5, "name": "Алексей", "sname": "Васильев", "mname": "Сергеевич" },
            { "id": 6, "name": "Алиса", "sname": "Васильева", "mname": "Викторовна" },
            { "id": 7, "name": "Василий", "sname": "Сергеев", "mname": "Сергеевич" },
            { "id": 8, "name": "Сергей", "sname": "Сергеев", "mname": "Иванович" },
            { "id": 9, "name": "Виктор", "sname": "Алексеев", "mname": "Петрович" }
        ]
        let groups = [
            { "id": 1, "name": "Группа 1" },
            { "id": 2, "name": "Группа 2" },
            { "id": 3, "name": "Группа 3" },
        ]
        let userGroups = [
            { "id": 1, "user": users.find(x => x.id == 1), "group": groups.find(x => x.id == 1) },
            { "id": 2, "user": users.find(x => x.id == 1), "group": groups.find(x => x.id == 2) },
            { "id": 3, "user": users.find(x => x.id == 2), "group": groups.find(x => x.id == 1) },
            { "id": 4, "user": users.find(x => x.id == 3), "group": groups.find(x => x.id == 3) },
            { "id": 5, "user": users.find(x => x.id == 4), "group": groups.find(x => x.id == 1) },
            { "id": 6, "user": users.find(x => x.id == 4), "group": groups.find(x => x.id == 2) },
            { "id": 7, "user": users.find(x => x.id == 4), "group": groups.find(x => x.id == 3) },
            { "id": 8, "user": users.find(x => x.id == 5), "group": groups.find(x => x.id == 2) },
            { "id": 9, "user": users.find(x => x.id == 6), "group": groups.find(x => x.id == 3) },
            { "id": 10, "user": users.find(x => x.id == 8), "group": groups.find(x => x.id == 1) },
        ]
        return { users, groups, userGroups };
    }
}

