import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecitationsStore } from '../recitations.store';
import { RecitationsService } from '../services/recitations.service';

@Component({
  selector: 'app-recitations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
  providers: [RecitationsStore, RecitationsService],
  template: `
    <router-outlet />
  `,
})
export class RecitationsComponent {}
