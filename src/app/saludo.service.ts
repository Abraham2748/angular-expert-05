import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaludoService {
  constructor() {}

  obtenerSaludo(nombre: string): string {
    return `Hello, ${nombre}!`;
  }

  obtenerDatos(): Observable<number[]> {
    // Llamada a un servicio externo
    return of([4, 5, 6]);
  }
}
