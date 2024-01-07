import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { ListData } from '../../../@shared/model/response'
import { Pauta, PautaInput, PautaSessionStatus } from '../model/pauta'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PautaService {
  constructor(private httpClient: HttpClient) {}

  getAll(
    page = 0,
    size = 10,
    sessionStatus = PautaSessionStatus.OPEN,
    category?: string
  ): Observable<ListData<Pauta>> {
    const params: {
      page: number
      size: number
      sessionStatus: PautaSessionStatus
      category?: string
    } = { page, size, sessionStatus }

    if (category) {
      params.category = category
    }
    return this.httpClient.get<ListData<Pauta>>(`${environment.apiUrl}/pauta`, {
      params
    })
  }

  create(pauta: PautaInput): Observable<Pauta> {
    return this.httpClient.post<Pauta>(`${environment.apiUrl}/pauta`, pauta)
  }

  getById(id: string): Observable<Pauta> {
    return this.httpClient.get<Pauta>(`${environment.apiUrl}/pauta/${id}`)
  }
}
