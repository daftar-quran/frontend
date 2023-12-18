import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RecitationsSearchTableComponent } from './recitations-search-table/recitations-search-table.component';

@Component({
  selector: 'app-recitations',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RecitationsSearchTableComponent, MatButtonModule],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex justify-end">
        <button mat-raised-button color="primary" (click)="addRecitation()">
          Ajouter une récitation
        </button>
      </div>

      <app-recitations-search-table />
    </div>
  `,
})
export class RecitationsSearchComponent {
  private router = inject(Router);

  public addRecitation(): void {
    void this.router.navigate(['/p/recitations/add']);
  }
}
