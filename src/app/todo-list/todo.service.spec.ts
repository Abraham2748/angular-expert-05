import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

fdescribe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    todoService = TestBed.inject(TodoService);
  });

  it('should start with no tasks', () => {
    expect(todoService.getTasks()).toEqual([]);
  });

  it('should add a new task with correct properties', () => {
    todoService.addTask('Comprar leche', new Date('2025-06-01'));
    const tasks = todoService.getTasks();
    expect(tasks.length).toEqual(1);
    expect(tasks[0]).toEqual(
      jasmine.objectContaining({
        id: 1,
        title: 'Comprar leche',
        completed: false,
      })
    );
    expect(tasks[0].dueDate).toEqual(new Date('2025-06-01'));
  });

  it('should toggle the completed state of a task', () => {
    todoService.addTask('Enviar correo', new Date());
    const original = todoService.getTasks()[0];
    todoService.toggleComplete(original.id);

    const toggled = todoService.getTasks()[0];

    expect(toggled).not.toBe(original);
    expect(toggled.id).toEqual(original.id);
    expect(toggled.completed).not.toEqual(original.completed);
  });
});
