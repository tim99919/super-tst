import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkersAndShopsPageComponent} from './workers-and-shops-page/workers-and-shops-page.component';


const routes: Routes = [
  {
    path: '',
    component: WorkersAndShopsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersAndShopsRoutingModule {
}
