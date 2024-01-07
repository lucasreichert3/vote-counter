import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Vote, VoteInput } from '../model/vote'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  constructor(private httpClient: HttpClient) {}

  create(vote: VoteInput): Observable<Vote> {
    return this.httpClient.post<Vote>(`${environment.apiUrl}/vote`, vote)
  }
}
