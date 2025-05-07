import { Component, inject, OnInit, signal } from '@angular/core';
import { Task } from './task.model';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { OverdueHighlightDirective } from './overdue-highlight.directive';
import { TaskStatusPipe } from './task-status.pipe';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, OverdueHighlightDirective, TaskStatusPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  tasks = signal<Task[]>([]);
  newTitle = '';
  newDueDate = '';

  todoService = inject(TodoService);

  ngOnInit() {
    this.tasks.set(this.todoService.getTasks());
  }

  addTask() {
    //2025-11-20

    // [2025, 11, 20]
    const [y, m, d] = this.newDueDate.split('-').map((v) => parseInt(v, 10));
    const due = new Date(y, m - 1, d);
    this.todoService.addTask(this.newTitle, due);

    this.tasks.set(this.todoService.getTasks());

    this.newTitle = '';
    this.newDueDate = '';
  }

  toggle(id: number) {
    this.todoService.toggleComplete(id);
    this.tasks.set(this.todoService.getTasks());
  }
}
