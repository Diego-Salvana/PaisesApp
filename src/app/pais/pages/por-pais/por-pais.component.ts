import { Component } from '@angular/core';

import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
   selector: 'app-por-pais',
   templateUrl: './por-pais.component.html',
   styles: [
      `
         li {
            cursor: pointer;
         }
      `,
   ],
})
export class PorPaisComponent {
   termino: string = '';
   hayError: boolean = false;
   paises: Pais[] = [];

   paisesSugeridos: Pais[] = [];

   constructor(private paisSvc: PaisService) {}

   buscar(term: string) {
      this.hayError = false;
      this.termino = term;
      this.paisesSugeridos = [];
      setTimeout(() => (this.paisesSugeridos = []), 401);

      this.paisSvc.buscarPais(term).subscribe({
         next: (resp) => {
            this.paises = resp;
            console.log(this.paises);
         },
         error: (error) => {
            console.log(error);
            this.hayError = true;
         },
      });
   }

   sugerencias(termino: string) {
      this.hayError = false;
      this.termino = termino;

      if (termino.trim() === '') {
         this.paisesSugeridos = [];
         return;
      }

      this.paisSvc.buscarPais(termino).subscribe({
         next: (resp) => (this.paisesSugeridos = resp.splice(0, 5)),
         error: () => (this.paisesSugeridos = []),
      });
   }
}
