import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RECITATIONS_MODULES_API_URL } from '@app/config';
import { Observable, of } from 'rxjs';
import { IConsolidation } from '../models';

@Injectable()
export class ConsolidationsService {
  private http = inject(HttpClient);

  /**
   * Searches for consolidations.
   * @return {Observable<PaginatedApiResponse<IUser>>} An observable of a paginated API response containing the search results.
   */
  public searchConsolidations(): Observable<IConsolidation[]> {
    return of(generateConsolidationData());
    return this.http.get<IConsolidation[]>(RECITATIONS_MODULES_API_URL);
  }

  /**
   * Retrieves a consolidation with the specified ID.
   * @param {number} idConsolidation - The ID of the consolidation to retrieve.
   * @return {Observable<IConsolidation>} An observable of the consolidation with the specified ID.
   */
  public getConsolidation(idConsolidation: number): Observable<IConsolidation> {
    return this.http.get<IConsolidation>(
      `${RECITATIONS_MODULES_API_URL}/${idConsolidation}`
    );
  }

  /**
   * Adds a new consolidation.
   * @param {IConsolidation} consolidation - The consolidation to add.
   * @return {Observable<IConsolidation>} An observable of the added consolidation.
   */
  public addConsolidation(
    consolidation: IConsolidation
  ): Observable<IConsolidation> {
    return this.http.post<IConsolidation>(
      RECITATIONS_MODULES_API_URL,
      consolidation
    );
  }

  /**
   * Updates the permissions of a consolidation on the server.
   * @param {IConsolidationFormGroupValue} consolidation - The updated consolidation object.
   * @returns {Observable<void>} - An Observable that completes when the update is successful.
   */
  public updateConsolidation(consolidation: IConsolidation): Observable<void> {
    return this.http.patch<void>(RECITATIONS_MODULES_API_URL, consolidation);
  }
}

function generateConsolidationData(): IConsolidation[] {
  const data: IConsolidation[] = [];

  for (let i = 1; i <= 22; i++) {
    const consolidation: IConsolidation = {
      id: i,
      page: Math.floor(Math.random() * 100) + 1, // Random page number between 1 and 100
      date: getRandomDate(),
      sura: `Sura ${i}`,
      tikrar: Math.floor(Math.random() * 30) + 1,
    };

    data.push(consolidation);
  }

  return data;
}

function getRandomDate(): string {
  const year = 2023;
  const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
  const day = Math.floor(Math.random() * 28) + 1; // Assuming all months have 28 days for simplicity

  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
}
