import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RECITATIONS_MODULES_API_URL } from '@app/config';
import { Observable } from 'rxjs';
import { IRecitation } from '../models';

@Injectable()
export class RecitationsService {
  private http = inject(HttpClient);

  public addRecitation(recitation: IRecitation): Observable<IRecitation> {
    return this.http.post<IRecitation>(RECITATIONS_MODULES_API_URL, recitation);
  }
}
