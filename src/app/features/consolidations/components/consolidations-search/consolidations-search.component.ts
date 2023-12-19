import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ConsolidationsSearchTableComponent } from './consolidations-search-table/consolidations-search-table.component';

@Component({
  selector: 'app-consolidations',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConsolidationsSearchTableComponent, MatButtonModule],
  template: `
    <app-consolidations-search-table />
  `,
})
export class ConsolidationsSearchComponent {
  private router = inject(Router);

  public addConsolidation(): void {
    void this.router.navigate(['/p/consolidations/add']);
  }
}
