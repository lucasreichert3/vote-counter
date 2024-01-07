import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Session, SessionInput } from '../model/session'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private httpClient: HttpClient) {}

  create(session: SessionInput): Observable<Session> {
    return this.httpClient.post<Session>(
      `${environment.apiUrl}/session`,
      session
    )
  }

  getById(id: string): Observable<Session> {
    return this.httpClient.get<Session>(`${environment.apiUrl}/session/${id}`)
  }
}
