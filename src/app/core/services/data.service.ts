import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataModel } from '../../models/data.model';  // Asegúrate de tener este modelo definido

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080';  // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getAllData(): Observable<DataModel[]> {
    return this.http.get<DataModel[]>(this.apiUrl);
  }

  getDataById(id: number): Observable<DataModel> {
    return this.http.get<DataModel>(`${this.apiUrl}/${id}`);
  }

  createData(data: DataModel): Observable<DataModel> {
    return this.http.post<DataModel>(this.apiUrl, data);
  }

  updateData(id: number, data: DataModel): Observable<DataModel> {
    return this.http.put<DataModel>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
