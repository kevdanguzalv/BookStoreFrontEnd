import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClientesResponse} from '../../Models/Clientes.Model';
import { Observable } from 'rxjs/internal/Observable';
import { ClientesEdiarRequest, ClientesRequest } from '../../Models/ClientesReques';
import { GenericResponse } from '../../Models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);
 resp?: ClientesResponse;
  constructor() { }

  getClientes(): Observable<ClientesResponse>
  {
    return this.http.get<ClientesResponse>('https://localhost:7276/api/Clientes');
  }
  postClientes(cliente: ClientesRequest): Observable<ClientesResponse>
  {

    const clienteRequest: any = {
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      dni: cliente.dni.toString(), // Convertir a string si es necesario
      edad: cliente.edad,
      status: cliente.status
    };

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    headers = headers.append("Accept" , "*/*");

    return this.http.post<ClientesResponse>("https://localhost:7276/api/Clientes", clienteRequest);
  }

  putClientes(cliente: ClientesEdiarRequest): Observable<GenericResponse>
  {

    const clienteRequest: any = {
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      dni: cliente.dni.toString(), // Convertir a string si es necesario
      edad: cliente.edad,
      status: cliente.status
    };

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    headers = headers.append("Accept" , "*/*");

    return this.http.put<GenericResponse>("https://localhost:7276/api/Clientes/"+ cliente.id, clienteRequest);
  }

  DeleteClientes(cliente: ClientesEdiarRequest): Observable<GenericResponse>
  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    headers = headers.append("Accept" , "*/*");

    return this.http.delete<GenericResponse>("https://localhost:7276/api/Clientes/"+ cliente.id);
  }

  getClienteById(Id: number): Observable<ClientesResponse>
  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    headers = headers.append("Accept" , "*/*");

    
    return this.http.get<ClientesResponse>("https://localhost:7276/api/Clientes/"+ Id);
  }
}
