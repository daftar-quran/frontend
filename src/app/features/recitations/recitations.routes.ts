import { Route } from '@angular/router';
import { RecitationsComponent } from './components/recitations.component';
import { RecitationsSearchComponent } from './components/recitations-search/recitations-search.component';
// import { RecitationAddComponent } from './components/recitation-add/recitation-add.component';
// import { RecitationViewComponent } from './components/recitation-view/recitation-view.component';

export default [
  {
    path: '',
    component: RecitationsComponent,
    children: [
      {
        path: '',
        component: RecitationsSearchComponent,
      },
      // {
      //   path: 'add',
      //   component: RecitationAddComponent,
      //   data: {
      //     accessPermissions: [PermissionType.WRITE],
      //   },
      // },
      // {
      //   path: ':idrecitation',
      //   component: RecitationViewComponent,
      // },
    ],
  },
] as Route[];
