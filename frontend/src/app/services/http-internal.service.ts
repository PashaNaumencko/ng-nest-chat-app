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
  private params = new HttpParams();

  constructor(private httpService: HttpClient) { }

  public getHeaders(): HttpHeaders {
    return this.headers;
  }

  public getHeader(key: string): string {
    return this.headers.get(key);
  }

  public setHeader(key: string, value: string): HttpHeaders {
    return this.headers.set(key, value);
  }

  public getParams(): HttpParams {
    return this.params;
  }

  public getParam(key: string): string {
    return this.params.get(key);
  }

  public setParam(key: string, value: string): HttpParams {
    return this.params.set(key, value);
  }

  public get<T>(endpoint: string): Observable<T> {
    return this.httpService.get<T>(`${this.apiURL}/api/${endpoint}`, {
      params: this.params,
      headers: this.headers
    });
  }

  public getFullResponse<T>(endpoint: string): Observable<HttpResponse<T>> {
    return this.httpService.get<T>(`${this.apiURL}/api/${endpoint}`, {
      params: this.params,
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
      params: this.params,
      headers: this.headers
    });
  }

  public deleteFullResponse<T>(endpoint: string): Observable<HttpResponse<T>>  {
    return this.httpService.delete<T>(`${this.apiURL}/api/${endpoint}`, {
      params: this.params,
      headers: this.headers,
      observe: 'response'
    });
  }
}
