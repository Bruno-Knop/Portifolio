import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'home',
        children:[
          {
            path: '',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'table',
        children:[
          {
            path: '',
            loadChildren: () => import('../table/table.module').then( m => m.TablePageModule)
          }
        ]
      },
      {
        path: 'dashboard',
        children:[
          {
            path: '',
            loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
          }
        ]
      },

      {
        path: '',
        redirectTo: '/main/home',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
