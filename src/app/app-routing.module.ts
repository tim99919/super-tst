import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import(
          './modules/workers-and-shops/workers-and-shops.module'
          ).then(m => m.WorkersAndShopsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
