import { TestBed } from '@angular/core/testing';

import { SaludoService } from './saludo.service';
import { of } from 'rxjs';

describe('SaludoService', () => {
  let service: SaludoService;

  const obtenerDatosMock = {
    obtenerDatos: () => of([1, 2, 3]),
    obtenerSaludo: (nombre: string) => `Hello, ${nombre}!`,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SaludoService,
          useValue: obtenerDatosMock,
        },
      ],
    });
    service = TestBed.inject(SaludoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a greeting using obtenerSaludo function', () => {
    const name = 'John';
    const expected = `Hello, ${name}!`;
    const result = service.obtenerSaludo(name);
    expect(result).toEqual(expected);
  });

  it('should return an array of numbers using obtenerDatos function', (done) => {
    service.obtenerDatos().subscribe((data) => {
      console.log('data', data);
      expect(data).toEqual([1, 2, 3]);
      done();
    });
  });
});
