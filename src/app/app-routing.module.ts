import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "", children: [
          {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
          {path: "", loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule)},
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
