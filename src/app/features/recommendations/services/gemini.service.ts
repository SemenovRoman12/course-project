import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GEMINI_API_URL} from '@features/recommendations/services/gemini-api-url.token';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly http = inject(HttpClient);
  private readonly geminiApiUrl = inject(GEMINI_API_URL);

  public post<T, D>(data?: D): Observable<T> {
    return this.http.post<T>(`${this.geminiApiUrl}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      "Content-Type": "application/json",
    };

    return new HttpHeaders(headersConfig);
  }
}
