/**
 * resolver to get the data needed by the target component
 * get data in route phase instead of in component render phase
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { mergeMap, Observable, of, take, EMPTY } from 'rxjs';

import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService implements Resolve<Crisis>{

  constructor(private cs: CrisisService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Crisis> | Observable<never> {
    const id = route.paramMap.get('id')!

    return this.cs.getCrisis(id).pipe(
      take(1),
      mergeMap( crisis => {
        if (crisis) {
          return of(crisis)
        } else {
          this.router.navigate(['/crisis-center'])
          return EMPTY
        }
      })
    )
  }
}
