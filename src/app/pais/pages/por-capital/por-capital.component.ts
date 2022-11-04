import { Component } from '@angular/core';

import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
   selector: 'app-por-capital',
   templateUrl: './por-capital.component.html',
   styles: [],
})
export class PorCapitalComponent {
   termino: string = '';
   hayError: boolean = false;
   paises: Pais[] = [];

   constructor(private paisSvc: PaisService) {}

   buscar(term: string) {
      this.hayError = false;
      this.termino = term;

      this.paisSvc.buscarCapital(term).subscribe({
         next: (resp) => (this.paises = resp),
         error: () => {
            this.hayError = true;
            this.paises = [];
         },
      });
   }
}
