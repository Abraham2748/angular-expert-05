import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(task: Task) {
    if (task.completed) {
      return '✅ Tarea completada';
    }

    const msPerDay = 1000 * 60 * 60 * 24;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((due.getTime() - today.getTime()) / msPerDay);

    if (diffDays < 0) {
      return '❗ Tarea Atrasada';
    }

    if (diffDays === 0) {
      return '📅 Completar Hoy!';
    }

    if (diffDays === 1) {
      return '🔜 Tarea para Mañana';
    }

    return '⏳ Faltan ' + diffDays + ' días';
  }
}
