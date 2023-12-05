import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="h-full w-full">
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayoutComponent {}
