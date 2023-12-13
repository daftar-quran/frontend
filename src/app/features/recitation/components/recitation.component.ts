import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recitation',
  standalone: true,
  template: `
    <h1>Recitation</h1>
  `,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecitationComponent {}
