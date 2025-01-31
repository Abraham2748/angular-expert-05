import { Component } from '@angular/core';

@Component({
    selector: 'app-contador',
    imports: [],
    templateUrl: './contador.component.html',
    styleUrl: './contador.component.css'
})
export class ContadorComponent {
  contador = 0;

  increase() {
    this.contador++;
  }

  decrease() {
    this.contador--;
  }
}
