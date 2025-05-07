import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks() {
    return [...this.tasks];
  }

  addTask(title: string, dueDate: Date) {
    this.tasks.push({
      id: this.nextId++,
      title,
      dueDate,
      completed: false,
    });
  }

  toggleComplete(id: number) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }
}
