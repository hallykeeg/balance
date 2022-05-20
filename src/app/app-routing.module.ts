import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';

import { BalanceComponent } from './components/balance/balance.component';
import { LiveComponent } from './components/live/live.component';
import { NavComponent } from './components/nav/nav.component';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path:'balance',component:BalanceComponent},
  {path:'live', component:LiveComponent},
  {path:'about', component:AboutComponent},
  {path: '',   redirectTo: '/balance', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
