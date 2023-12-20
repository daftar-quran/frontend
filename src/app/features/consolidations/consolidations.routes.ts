import { Route } from '@angular/router';
import { ConsolidationsComponent } from './components/consolidations.component';
import { ConsolidationsSearchComponent } from './components/consolidations-search/consolidations-search.component';

export default [
  {
    path: '',
    component: ConsolidationsComponent,
    children: [
      {
        path: '',
        component: ConsolidationsSearchComponent,
      },
    ],
  },
] as Route[];
