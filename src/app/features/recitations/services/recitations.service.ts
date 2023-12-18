import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RECITATIONS_MODULES_API_URL } from '@app/config';
import { Observable, of } from 'rxjs';
import { IRecitation } from '../models';

@Injectable()
export class RecitationsService {
  private http = inject(HttpClient);

  /**
   * Searches for recitations.
   * @return {Observable<PaginatedApiResponse<IUser>>} An observable of a paginated API response containing the search results.
   */
  public searchRecitations(): Observable<IRecitation[]> {
    return of(generateRecitationData());
    return this.http.get<IRecitation[]>(RECITATIONS_MODULES_API_URL);
  }

  /**
   * Retrieves a recitation with the specified ID.
   * @param {number} idRecitation - The ID of the recitation to retrieve.
   * @return {Observable<IRecitation>} An observable of the recitation with the specified ID.
   */
  public getRecitation(idRecitation: number): Observable<IRecitation> {
    return this.http.get<IRecitation>(
      `${RECITATIONS_MODULES_API_URL}/${idRecitation}`
    );
  }

  /**
   * Adds a new recitation.
   * @param {IRecitation} recitation - The recitation to add.
   * @return {Observable<IRecitation>} An observable of the added recitation.
   */
  public addRecitation(recitation: IRecitation): Observable<IRecitation> {
    return this.http.post<IRecitation>(RECITATIONS_MODULES_API_URL, recitation);
  }

  /**
   * Updates the permissions of a recitation on the server.
   * @param {IRecitationFormGroupValue} recitation - The updated recitation object.
   * @returns {Observable<void>} - An Observable that completes when the update is successful.
   */
  public updateRecitation(recitation: IRecitation): Observable<void> {
    return this.http.patch<void>(RECITATIONS_MODULES_API_URL, recitation);
  }
}

function generateRecitationData(): IRecitation[] {
  const data: IRecitation[] = [];

  for (let i = 1; i <= 22; i++) {
    const recitation: IRecitation = {
      id: i,
      page: Math.floor(Math.random() * 100) + 1, // Random page number between 1 and 100
      date: getRandomDate(),
      sura: `Sura ${i}`,
      tikrar: Math.floor(Math.random() * 30) + 1,
    };

    data.push(recitation);
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
