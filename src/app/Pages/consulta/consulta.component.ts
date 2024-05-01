import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Clientes, ClientesResponse, ClientesResponseAdd } from '../../Models/Clientes.Model';
import { PedidosService } from '../../Services/Pedidos/pedidos.service';
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

@Component({
  selector: 'app-consulta',
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
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {

  buscarLibro: FormGroup;
  listPedidosRequest : ListPedidosRequest[] = [];

  formData: any = {
      dni: '',
  };
  constructor(private PedidosService: PedidosService, public dialog: MatDialog, private router: Router, private fb: FormBuilder) { 
    this.buscarLibro = this.fb.group({
      dni: ['', Validators.required],
    });
  }

  BuscarPedido()
  {
    this.formData = this.buscarLibro.value;
    //console.log(this.formData);
    //console.log(this.formData.dni);
    

      this.PedidosService.BuscarPedidos(this.formData.dni).subscribe(data =>
        {
          console.log("data");
          console.log(data);

          //this.listPedidosRequest = data;
          this.listPedidosRequest = [];
          //this.listPedidosRequest.push(data) ;
          //this.listPedidosRequest =[...this.listPedidosRequest, data];
          this.listPedidosRequest = this.listPedidosRequest.concat(data);

          console.log("lsit");
          console.log(this.listPedidosRequest);
          //window.location.reload();
        },
        error=>
        {
            console.log(error);  
            
        }
      );
  }
}
