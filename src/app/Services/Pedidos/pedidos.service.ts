import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LibrosResponse, LibroAddRequest, Libro} from '../../Models/Libros.Model';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse';
import { ListPedidosRequest, PedidoRequest } from '../../Models/Pedidos.Models';
import { DatePipe, formatDate } from '@angular/common';
import { tap } from 'rxjs';
import { NotificationService } from './../Notificaciones/notificacion.service';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private http = inject(HttpClient);
  IdLibros : number [] = [];
  constructor(private datePipe: DatePipe, private notificationService: NotificationService) 
  {

   }

  BuscarPedidos(DNI: number): Observable<ListPedidosRequest>
  {
    return this.http.get<ListPedidosRequest>('https://localhost:7276/api/Pedidos?DNI='+ DNI);
  }

  GuardarPedido(IdCliente : number, Libros: Libro[]): Observable<GenericResponse>
  {
    Libros.forEach(item => {
      this.IdLibros.push(item.id);
    });
    
    let PedidosRequest :any = {} ;

    PedidosRequest= {
      fechaPedido: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss'),
      clienteId: IdCliente,
      librosId:  this.IdLibros
    };
  
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    headers = headers.append("Accept" , "*/*");

    return this.http.post<GenericResponse>("https://localhost:7276/api/Pedidos", PedidosRequest, {headers}).pipe(
      tap(() => {
        this.notificationService.setMessage('ok');
      })
    );
 }

}
