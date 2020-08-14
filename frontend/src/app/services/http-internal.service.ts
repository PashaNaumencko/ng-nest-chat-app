import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInternalService {

  public apiURL = environment.apiUrl;
  private headers = new HttpHeaders();

  constructor(private httpService: HttpClient) { }

  public getHeaders() {
    return this.headers;
  }

  public getHeader(key: string) {
    return this.headers.get(key);
  }

  public setHeader(key: string, value: string) {
    return this.headers.set(key, value);
  }

  public get<T>(endpoint: string, httpParams?: HttpParams): Observable<T> {
    return this.httpService.get<T>(`${this.apiURL}/api/${endpoint}`, {
      params: httpParams,
      headers: this.headers
    });
  }

  public getFullResponse<T>(endpoint: string, httpParams?: HttpParams): Observable<HttpResponse<T>> {
    return this.httpService.get<T>(`${this.apiURL}/api/${endpoint}`, {
      params: httpParams,
      headers: this.headers,
      observe: 'response'
    });
  }

  public post<T>(endpoint: string, body: Object): Observable<T>  {
    return this.httpService.post<T>(`${this.apiURL}/api/${endpoint}`, body, {
      headers: this.headers
    });
  }

  public postFullResponse<T>(endpoint: string, body: Object): Observable<HttpResponse<T>>  {
    return this.httpService.post<T>(`${this.apiURL}/api/${endpoint}`, body, {
      headers: this.headers,
      observe: 'response'
    });
  }

  public put<T>(endpoint: string, body: Object): Observable<T>  {
    return this.httpService.put<T>(`${this.apiURL}/api/${endpoint}`, body, {
      headers: this.headers
    });
  }

  public putFullResponse<T>(endpoint: string, body: Object): Observable<HttpResponse<T>>  {
    return this.httpService.put<T>(`${this.apiURL}/api/${endpoint}`, body, {
      headers: this.headers,
      observe: 'response'
    });
  }

  public delete<T>(endpoint: string, httpParams?: HttpParams): Observable<T>  {
    return this.httpService.delete<T>(`${this.apiURL}/api/${endpoint}`, {
      params: httpParams,
      headers: this.headers
    });
  }

  public deleteFullResponse<T>(endpoint: string, httpParams?: HttpParams): Observable<HttpResponse<T>>  {
    return this.httpService.delete<T>(`${this.apiURL}/api/${endpoint}`, {
      params: httpParams,
      headers: this.headers,
      observe: 'response'
    });
  }
}
