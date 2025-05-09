import { TaskStatusPipe } from './task-status.pipe';
import { Task } from './task.model';

describe('TaskStatusPipe', () => {
  let pipe: TaskStatusPipe;

  beforeEach(() => {
    pipe = new TaskStatusPipe();

    //Fijamos la fecha actual para hacer tests determinantes
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2025-05-16T12:00:00'));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('debería mostrar "✅ Tarea completada" si task.completed es true', () => {
    const task: Task = {
      id: 1,
      title: 'Tarea',
      dueDate: new Date(),
      completed: true,
    };
    const resultado = pipe.transform(task);
    expect(resultado).toEqual('✅ Tarea completada');
  });

  it('debería mostrar "❗ Tarea Atrasada" si task.dueDate fue ayer o antes', () => {
    const yesterday = new Date('2025-05-15T12:00:00');
    const task: Task = {
      id: 2,
      title: 'Tarea atrasada',
      dueDate: yesterday,
      completed: false,
    };
    const resultado = pipe.transform(task);
    expect(resultado).toEqual('❗ Tarea Atrasada');
  });

  it('debería mostrar "📅 Completar Hoy!" si task.dueDate es hoy', () => {
    const today = new Date('2025-05-16T12:00:00');
    const task: Task = {
      id: 3,
      title: 'Tarea para hoy',
      dueDate: today,
      completed: false,
    };
    const resultado = pipe.transform(task);
    expect(resultado).toEqual('📅 Completar Hoy!');
  });
  it('debería mostrar "🔜 Tarea para Mañana" si task.dueDate es mañana', () => {
    const tomorrow = new Date('2025-05-17T12:00:00');
    const task: Task = {
      id: 4,
      title: 'Tarea para mañana',
      dueDate: tomorrow,
      completed: false,
    };
    const resultado = pipe.transform(task);
    expect(resultado).toEqual('🔜 Tarea para Mañana');
  });
  it('debería mostrar "⏳ Faltan N días" si task.dueDate es mas mayor a mañana', () => {
    const inFiveDays = new Date('2025-05-21T12:00:00');
    const task: Task = {
      id: 5,
      title: 'Tarea futura',
      dueDate: inFiveDays,
      completed: false,
    };
    const resultado = pipe.transform(task);
    expect(resultado).toEqual('⏳ Faltan 5 días');
  });
});
