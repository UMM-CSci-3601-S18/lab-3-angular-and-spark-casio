import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => Observable.of([
        {
          id: "588959856281bee16d844dc8",
          owner: "Barry",
          status: false,
          body: "In nostrud tempor velit nisi eiusmod aute cillum id amet. Ullamco sit velit ea officia.",
          category: "groceries"
        },
        {
          id: "58895985858afcb1a0105483",
          owner: "Workman",
          status: true,
          body: "Est sit laboris aliqua deserunt Lorem labore nulla consequat ullamco in ullamco. Est reprehenderit enim aute esse velit.",
          category: "video games"
        },
        {
          id: "588959855bc0e6c7c26b5619",
          owner: "Fry",
          status: true,
          body: "Excepteur velit adipisicing minim ad labore et consectetur officia sunt. Officia Lorem consectetur ad duis.",
          category: "homework"
        }
      ].find(todo => todo.id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Barry by ID', () => {
    todoComponent.setId('588959856281bee16d844dc8');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Barry');
    expect(todoComponent.todo.category).toBe('groceries');
  });

  it('returns undefined for Rudolph', () => {
    todoComponent.setId('Rudolph');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
