import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LibrosResponse, LibroAddRequest, Libro} from '../../Models/Libros.Model';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse';
import { ClientesResponse } from '../../Models/Clientes.Model';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private http = inject(HttpClient);

  constructor() { }

    getLibros(): Observable<LibrosResponse>
    {
      return this.http.get<LibrosResponse>('https://localhost:7276/api/Libros');
    }

    postLibros(libro: LibroAddRequest): Observable<LibroAddRequest>
    {
  
      const libroRequest: any = {
        nombres: libro.nombres,
        autor: libro.autor,
        isbn: libro.isbn, 
        status: true
      };
          
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type","application/json");
      headers = headers.append("Accept" , "*/*");
  
      return this.http.post<LibroAddRequest>("https://localhost:7276/api/Libros", libroRequest);
    }

    puttLibros(libro: Libro): Observable<GenericResponse>
    {
      
      const libroRequest: any = {
        nombres: libro.nombres,
        autor: libro.autor,
        isbn: libro.isbn, 
        status: libro.status
      };
          
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type","application/json");
      headers = headers.append("Accept" , "*/*");
  
      return this.http.put<GenericResponse>("https://localhost:7276/api/Libros/"+ libro.id, libroRequest);
    }

    DeleteLibro(id: number): Observable<GenericResponse>
    {
      let headers = new HttpHeaders();
      headers = headers.append("Content-Type","application/json");
      headers = headers.append("Accept" , "*/*");
  
      return this.http.delete<GenericResponse>("https://localhost:7276/api/Libros/"+ id);
    }

    getLibroById(Id: number): Observable<LibrosResponse>
  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    headers = headers.append("Accept" , "*/*");

    
    return this.http.get<LibrosResponse>("https://localhost:7276/api/Libros/"+ Id);
  }
  
}
