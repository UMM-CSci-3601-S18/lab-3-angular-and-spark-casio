import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('User list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          id: "58895985a22c04e761776d54",
          owner: "Blanche",
          status: false,
          body: "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
          category: "software design"
        },
        {
          id: "58895985c1849992336c219b",
          owner: "Fry",
          status: false,
          body: "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
          category: "video games"
        },
        {
          id: "58895985847a6c1445ec4048",
          owner: "Barry",
          status: true,
          body: "Deserunt velit reprehenderit deserunt sunt excepteur sit eu eiusmod in voluptate aute minim mollit. Esse aliqua esse officia do proident non consequat non mollit.",
          category: "homework"
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ UserListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains an owner named \'Blanche\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });

  it('contains an owner named \'Fry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Fry')).toBe(true);
  });

  it('does not contain an owner named \'Rudolph\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Rudolph')).toBe(false);
  });

  /*
  it('has two users that are 37 years old', () => {
    expect(TodoList.users.filter((user: User) => user.age === 37).length).toBe(2);
  });
  it('user list filters by name', () => {
    expect(userList.filteredUsers.length).toBe(3);
    userList.userName = 'a';
    const a: Observable<User[]> = userList.refreshUsers();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(userList.filteredUsers.length).toBe(2));
  });

  it('user list filters by age', () => {
    expect(userList.filteredUsers.length).toBe(3);
    userList.userAge = 37;
    const a: Observable<User[]> = userList.refreshUsers();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(userList.filteredUsers.length).toBe(2));
  });

  it('user list filters by name and age', () => {
    expect(userList.filteredUsers.length).toBe(3);
    userList.userAge = 37;
    userList.userName = 'i';
    const a: Observable<User[]> = userList.refreshUsers();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(userList.filteredUsers.length).toBe(1));
  });
  */

});
