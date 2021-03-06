import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sites-list',
        loadChildren: () => import('../sites-list/sites-list.module').then(m => m.SitesListPageModule)
      },
      {
        path: 'info-site/:id',
        loadChildren: () => import('../info-site/info-site.module').then( m => m.InfoSitePageModule)
      },
      {
        path: 'map-sites',
        loadChildren: () => import('../map-sites/map-sites.module').then(m => m.MapSitesPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/sites-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sites-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
