import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Clientes, ClientesResponse, ClientesResponseAdd } from '../../Models/Clientes.Model';
import { PedidosService } from '../../Services/Pedidos/pedidos.service';
import { LibrosService } from '../../Services/Libros/libros.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormGroup, FormBuilder,AbstractControl,FormControl,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { ClientesEdiarRequest, ClientesRequest } from '../../Models/ClientesReques';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ListPedidosRequest} from '../../Models/Pedidos.Models';
import { ClientesService } from '../../Services/Clientes/clientes.service';
import { Libro } from '../../Models/Libros.Model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule, MatTableModule
    
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  DniCliente: FormGroup;
  IdLibro : FormGroup;
  listPedidosRequest : ListPedidosRequest[] = [];
  DatosCLiente : FormGroup;
  cliente? : any;
  IdCliente : number = 0;
  libros: Libro[] = [];

  constructor(private PedidosService: PedidosService
            , public dialog: MatDialog
            , private router: Router
            , private fb: FormBuilder
            , private clientesService: ClientesService
            , private librosService: LibrosService  
          ){ 
    this.DniCliente = this.fb.group({
      id: ['', Validators.required],
    });

    this.IdLibro = this.fb.group({
      IdLibro: ['', Validators.required],
    });

    this.DatosCLiente = this.fb.group({
     
      id:  [{value: '', disabled: true}],
      nombres: [{value: '', disabled: true}],
      apellidos: [{value: '', disabled: true}],
      dni: [{value: '', disabled: true}],
      edad: [{value: 0, disabled: true}],
      status: [{value: true, disabled: true}]
    });
  }

  BuscarCliente(Id: any)
  {
    this.clientesService.getClienteById(Id.id).subscribe(data => {
       this.cliente = data.data;
       this.IdCliente = this.cliente.id;
        this.DatosCLiente = this.fb.group({
     
          id:  [{value: this.cliente.id, disabled: true}],
          nombres: [{value:this.cliente.nombres, disabled: true}],
          apellidos: [{value: this.cliente.apellidos, disabled: true}],
          dni: [{value: this.cliente.dni, disabled: true}],
          edad: [{value: this.cliente.edad, disabled: true}],
          status: [{value: this.cliente.status, disabled: true}]
        });
      });
  }

  BuscarLibro(IdLibro: any)
  {
    console.log(IdLibro);
    this.librosService.getLibroById(IdLibro.IdLibro).subscribe(data => {
      console.log(data.data);
      //this.libros = data.data;
      this.libros = this.libros.concat(data.data);

      console.log(this.IdCliente);
      console.log(this.libros);
      

     });
  }

  GuardarPedido()
  {
    this.PedidosService.GuardarPedido(this.IdCliente, this.libros).subscribe(data => {
      
          console.log(data);
          this.libros = [];
          this.DniCliente = this.fb.group({
            id: ['', Validators.required],
          });
      
          this.IdLibro = this.fb.group({
            IdLibro: ['', Validators.required],
          });
      
          this.DatosCLiente = this.fb.group({
           
            id:  [{value: '', disabled: true}],
            nombres: [{value: '', disabled: true}],
            apellidos: [{value: '', disabled: true}],
            dni: [{value: '', disabled: true}],
            edad: [{value: 0, disabled: true}],
            status: [{value: true, disabled: true}]
          });
          //window.location.reload();

     },error=>
      {
          console.log(error);          
      }); 
  }

}
