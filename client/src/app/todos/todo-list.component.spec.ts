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

describe('Todo list', () => {

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

  it('doesn\'t contain an owner named \'Rudolph\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Rudolph')).toBe(false);
  });

  it('contains a todo with the status true', () => {
    expect(todoList.todos.some((todo: Todo) => todo.status === true)).toBe(true);
  });

  it('contains a category named \'software design\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.category === 'software design')).toBe(true);
  });

  it('contains a category named \'video games\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.category === 'video games')).toBe(true);
  });

  it('contains a category named \'homework\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.category === 'homework')).toBe(true);
  });

  it('has two todos whose statuses are false', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.status === false).length).toBe(2);
  });

  it('contains only one category named \'homework\'', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === 'homework').length).toBe(1);
  });

  it('todo list filters by owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'y';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoCategory = 'o';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(3));
  });

  it('todo list filters by status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "complete";
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by category and status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = "incomplete";
    todoList.todoCategory = 'g';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by owner and body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'y';
    todoList.todoBody = 's';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  return this.filteredTodos;
});

describe('Misbehaving Todo List', () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
      getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
      // stub UserService for test purposes
      todoListServiceStub = {
        getTodos: () => Observable.create(observer => {
          observer.error('Error-prone observable');
        })
      };

      TestBed.configureTestingModule({
        imports: [FormsModule, CustomModule],
        declarations: [TodoListComponent],
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

    it('generates an error if we don\'t set up a TodoListService', () => {
      // Since the observer throws an error, we don't expect todos to be defined.
      expect(todoList.todos).toBeUndefined();
    });
  });
