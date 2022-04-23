import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';

const routes: Routes = [
  { path: '', component: CrisisCenterComponent,
    children: [
      { path: '', component: CrisisListComponent,
        // the router reuses components by default here
        children: [
          { path: ':id', component: CrisisDetailComponent },
          { path: '', component: CrisisCenterHomeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
