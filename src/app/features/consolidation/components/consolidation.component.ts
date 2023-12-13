import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-consolidation',
  standalone: true,
  template: `
    <h1>Consolidation</h1>
  `,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsolidationComponent {}
