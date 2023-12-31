import { Route } from '@angular/router';
import { RecitationsComponent } from './components/recitations.component';
import { RecitationFormComponent } from './components/recitations-form/recitation-form.component';

export default [
  {
    path: '',
    component: RecitationsComponent,
    children: [
      {
        path: '',
        component: RecitationFormComponent,
      },
    ],
  },
] as Route[];
