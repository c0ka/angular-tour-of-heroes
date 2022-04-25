import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  // for unmatched segments of the URL
  // instant load module routing: Heroes, Messages
  { 
    // lazy-load module with custom preloading strategy
    path: 'crisis-center', 
    loadChildren: () => import('./crisis-center/crisis-center.module').then( m =>
      m.CrisisCenterModule),
      data: { preload: true }  // <--
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  // fallback route to 404, must be the last
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    // forRoot() returns a module that contains the configured Router service provider
    // and other providers that the routing library requires.
    RouterModule.forRoot( appRoutes, 
      { enableTracing: true,  // <-- debugging only
        preloadingStrategy: SelectivePreloadingStrategyService }) 
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
