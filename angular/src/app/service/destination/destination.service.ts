import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  destinationsSubject = new BehaviorSubject<any>({
    destinations: [],
    loading: false,
    newDestination: null,
  });

  private apiUrl = 'http://localhost:5454';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  getDestinations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/api/destination`, { headers }).pipe(
      tap((destinations) => {
        const currentState = this.destinationsSubject.value;
        this.destinationsSubject.next({ ...currentState, destinations });
      })
    );
  }

  createDestination(destination: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post<any>(`${this.apiUrl}/api/destination`, destination, { headers })
      .pipe(
        tap((newDestination) => {
          const currentState = this.destinationsSubject.value;
          this.destinationsSubject.next({
            ...currentState,
            destinations: [newDestination, ...currentState.destinations],
          });
        })
      );
  }

  updateDestination(destination: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/api/destination/${destination.id}`, destination, { headers })
      .pipe(
        tap((updatedDestination) => {
          const currentState = this.destinationsSubject.value;
          const updatedDestinations = currentState.destinations.map((item: any) =>
            item.id === updatedDestination.id ? updatedDestination : item
          );
          this.destinationsSubject.next({
            ...currentState,
            destinations: updatedDestinations,
          });
        })
      );
  }

  likeDestination(destinationId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/api/destination/${destinationId}/like`, {}, { headers })
      .pipe(
        tap((updatedDestination) => {
          const currentState = this.destinationsSubject.value;
          const updatedDestinations = currentState.destinations.map((item: any) =>
            item.id === updatedDestination.id ? updatedDestination : item
          );
          this.destinationsSubject.next({
            ...currentState,
            destinations: updatedDestinations,
          });
        })
      );
  }

  deleteDestination(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/destination/${id}`, {
      headers,
    }).pipe(
      tap((deletedDestination)=>{
        const currentState=this.destinationsSubject.value;
        const updatedDestinations=currentState.destinations.filter((item:any)=>item.id!==id)
        this.destinationsSubject.next({...currentState,destinations:updatedDestinations})
      })
    );
  }
}
