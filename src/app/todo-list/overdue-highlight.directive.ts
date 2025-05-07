import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Task } from './task.model';

@Directive({
  selector: '[appOverdueHighlight]',
})
export class OverdueHighlightDirective implements OnInit, OnChanges {
  @Input({
    required: true,
    alias: 'appOverdueHighlight',
  })
  task!: Task;

  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.updateHighlight();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.updateHighlight();
    }
  }

  private updateHighlight() {
    const overdue = !this.task.completed && this.isOverdue(this.task.dueDate);
    this.elementRef.nativeElement.classList[overdue ? 'add' : 'remove'](
      'overdue'
    );
  }

  private isOverdue(dueDate: Date) {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const due = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate()
    );
    const diffDays = Math.floor(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays < 0;
  }
}
