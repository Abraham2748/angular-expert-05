import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //disparamos el ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should render no tasks initially', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toEqual(0);
  });
  it('should add and display a new task when submitted', () => {
    component.newTitle = 'New task';
    const todayString = new Date().toISOString().substring(0, 10);
    component.newDueDate = todayString;

    component.addTask();
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toEqual(1);
    expect(items[0].nativeElement.textContent).toContain('New task');
  });
  it('should toggle task.completed when task is clicked', () => {
    component.newTitle = 'Test toggle';
    component.newDueDate = new Date().toISOString().substring(0, 10);
    component.addTask();
    fixture.detectChanges();

    const li = fixture.debugElement.query(By.css('li'));
    li.nativeElement.click();
    fixture.detectChanges();

    const statusElement = fixture.debugElement.query(
      By.css('.task-status')
    ).nativeElement;

    expect(statusElement.textContent).toEqual('✅ Tarea completada');
  });
});
