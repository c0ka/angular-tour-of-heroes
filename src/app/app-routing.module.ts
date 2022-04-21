import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  // unmatched segments of the URL
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'dashboard', component: DashboardComponent},
  // fallback route to 404
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    // forRoot() returns a module that contains the configured Router service provider
    // and other providers that the routing library requires.
    RouterModule.forRoot( appRoutes, 
                        { enableTracing: true }) // <-- debugging only
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
