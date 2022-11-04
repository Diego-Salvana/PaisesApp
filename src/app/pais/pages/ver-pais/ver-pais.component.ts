import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
   selector: 'app-ver-pais',
   templateUrl: './ver-pais.component.html',
   styles: [],
})
export class VerPaisComponent implements OnInit {
   pais!: Pais;

   constructor(
      private activatedRoute: ActivatedRoute,
      private paisSvc: PaisService
   ) {}

   ngOnInit(): void {
      this.activatedRoute.params
         .pipe(
            switchMap(({ id }) => this.paisSvc.getPaisPorAlpha(id)),
            tap(console.log)
         )
         .subscribe({
            next: (resp) => {
               this.pais = resp[0];
               console.log(resp[0]);
               console.log(this.pais);
            },
            error: (error) => console.log(error),
         });

      /* Es lo mismo que lo siguiente:

      this.activatedRoute.params.subscribe(({ id }) => {
         this.paisSvc.getPaisPorAlpha(id).subscribe({
            next: (resp) => console.log(resp),
            error: (error) => console.log(error),
         });
      });
      */
   }
}
