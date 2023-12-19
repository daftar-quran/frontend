import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsolidationsStore } from '../consolidations.store';
import { ConsolidationsService } from '../services/consolidations.service';

@Component({
  selector: 'app-consolidations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
  providers: [ConsolidationsStore, ConsolidationsService],
  template: `
    <router-outlet />
  `,
})
export class ConsolidationsComponent implements OnInit {
  private consolidationsStore = inject(ConsolidationsStore);

  ngOnInit(): void {
    this.consolidationsStore.consolidationsSearch();
  }
}
