import { HttpErrorResponse } from '@angular/common/http';

export interface IQlError {
  status?: number | null;
  message?: string | null;
  messageToShow?: string | null;
}

export class QlErrorClass implements IQlError {
  status: number | null;
  message: string | null;
  messageToShow: string | null;

  constructor(error: HttpErrorResponse | null = null) {
    this.status = error ? error.status : null;
    this.message = error ? error.message : null;
    this.messageToShow = null;
  }
}
