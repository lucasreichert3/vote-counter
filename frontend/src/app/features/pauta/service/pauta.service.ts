import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ListData } from '../../../@shared/model/response';
import { Pauta } from '../model/pauta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PautaService {
  constructor(private httpClient: HttpClient) {}

  getAll(page = 0, size = 10): Observable<ListData<Pauta>> {
    return this.httpClient.get<ListData<Pauta>>(`${environment.apiUrl}/pauta`, {
      params: { page, size },
    });
  }
}
