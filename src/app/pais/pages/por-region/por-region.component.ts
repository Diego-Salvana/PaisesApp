import { Component } from '@angular/core';

import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
   selector: 'app-por-region',
   templateUrl: './por-region.component.html',
   styles: [],
})
export class PorRegionComponent {
   regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
   regionActiva: string = '';
   error = { hayError: false, codigo: 0, message: '' };
   paises: Pais[] = [];

   constructor(private paisSvc: PaisService) {}

   activarRegion(region: string) {
      if (region === this.regionActiva) return;

      this.regionActiva = region;

      this.buscar(region);
   }

   buscar(region: string) {
      this.paises = [];
      this.error.hayError = false;

      this.paisSvc.buscarRegion(region).subscribe({
         next: (resp) => (this.paises = resp),
         error: (err) => {
            this.paises = [];

            this.error.hayError = true;
            this.error.codigo = err.status;
            this.error.message = err.error.message;
         },
      });
   }
}
