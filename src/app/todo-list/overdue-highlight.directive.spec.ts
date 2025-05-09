import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { OverdueHighlightDirective } from './overdue-highlight.directive';
import { Task } from './task.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [OverdueHighlightDirective],
  template: `<div [appOverdueHighlight]="task">Test</div>`,
})
class TestHostComponent {
  task!: Task;
}

describe('OverdueHighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let divElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, OverdueHighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    divElement = fixture.nativeElement.querySelector('div');
  });

  it("should add 'overdue' class on init when task is overdue and not completed", () => {
    hostComponent.task = {
      id: 1,
      title: 'Overdue task',
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      completed: false,
    };
    fixture.detectChanges(); //execute ngOnInit
    expect(divElement.classList).toContain('overdue');
  });
  it("should not add 'overdue' class if task is not overdue", () => {
    hostComponent.task = {
      id: 2,
      title: 'Future task',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      completed: false,
    };
    fixture.detectChanges(); //execute ngOnInit
    expect(divElement.classList).not.toContain('overdue');
  });
  it("should not add 'overdue' class if task is completed", () => {
    hostComponent.task = {
      id: 3,
      title: 'Future task',
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      completed: true,
    };
    fixture.detectChanges(); //execute ngOnInit
    expect(divElement.classList).not.toContain('overdue');
  });
  it("should update 'overdue' class when the task input changes", () => {
    hostComponent.task = {
      id: 4,
      title: 'Overdue task',
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      completed: false,
    };
    fixture.detectChanges(); //execute ngOnInit
    expect(divElement.classList).toContain('overdue');

    const newTask: Task = {
      id: 5,
      title: 'Future task',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      completed: false,
    };
    hostComponent.task = newTask;

    const directiveInstance = fixture.debugElement
      .query(By.directive(OverdueHighlightDirective))
      .injector.get(OverdueHighlightDirective) as OverdueHighlightDirective;

    const changes: SimpleChanges = {
      task: new SimpleChange(null, newTask, false),
    };

    directiveInstance.ngOnChanges(changes);

    fixture.detectChanges();
    expect(divElement.classList).not.toContain('overdue');
  });
});
