import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Clientes, ClientesResponse, ClientesResponseAdd } from '../../Models/Clientes.Model';
import { ClientesService } from '../../Services/Clientes/clientes.service';
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


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [MatButtonModule, MatTableModule,  MatDialogModule,MatIconModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Clientes[] = [];

  constructor(private clientesService: ClientesService, public dialog: MatDialog, private router: Router) { }
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(data => {
      //console.log(data.data);
      this.clientes = data.data;
      //console.log( this.clientes);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  EditarCliente(Cliente : Clientes) {
    const dialogRef = this.dialog.open(EditarClienteClass, {data: Cliente });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  InactivarCliente(Cliente : Clientes) {
    //console.log(Cliente);
    this.clientesService.DeleteClientes(Cliente).subscribe(data =>
      {
        console.log(data)
        window.location.reload();
      },
      error=>
      {
          console.log(error);          
      }
    );

    
  }

}
// cuadro de dialogo para ingresar un nuevo cliente
@Component({
  selector: 'AddCliente',
  templateUrl: '/src/app/Pages/clientes/AddCliente.html',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    
  ],
})
export class DialogContentExampleDialog {
  AddClienteForm: FormGroup;
  private http = inject(HttpClient);
  Id: number = 0;
  formData: ClientesEdiarRequest = {
    id:0,
    nombres: '',
    apellidos: '',
    dni: '',
    edad: 0,
    status: true
  };

  constructor(private fb: FormBuilder, private clientesService: ClientesService, private router: Router) {
    // Crea el formulario con los campos correspondientes
    this.AddClienteForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      edad: [null, Validators.required]
      
    });
    
  }

  AddCliente() 
  {
    console.log("entro");
      this.formData = this.AddClienteForm.value;
    this.formData.status = true;
    console.log(this.formData);

      this.clientesService.postClientes(this.formData).subscribe(data =>
        {
          console.log(data)
          window.location.reload();
        },
        error=>
        {
            console.log(error);     
            //window.location.reload();     
        }
      );

      
  }
}

// cuadro de dialogo para ingresar editar un cliente
@Component({
  selector: 'EditarCliente',
  templateUrl: '/src/app/Pages/clientes/EditarCliente.html',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    
  ],
})
export class EditarClienteClass {
  EditarClienteForm: FormGroup;
  private http = inject(HttpClient);
  Id: number = 0;
  formData: ClientesEdiarRequest = {
    id: 0,
    nombres: '',
    apellidos: '',
    dni: '',
    edad: 0,
    status: true
  };

  constructor(private fb: FormBuilder, private clientesService: ClientesService, private router: Router, @Inject(MAT_DIALOG_DATA) public cliente: Clientes) {
    // Crea el formulario con los campos correspondientes
    this.EditarClienteForm = this.fb.group({
      //id: [cliente.id, Validators.required],
      id: [{value: cliente.id, disabled: true}],
      nombres: [cliente.nombres, Validators.required],
      apellidos: [cliente.apellidos, Validators.required],
      dni: [cliente.dni, Validators.required],
      edad: [cliente.edad, Validators.required],
      status: [cliente.status, Validators.required]
    });
    this.Id = cliente.id;
  }

  EditarCliente() 
  {
    this.formData = this.EditarClienteForm.value;
    this.formData.id = this.Id;

    //console.log(this.formData);

      this.clientesService.putClientes(this.formData).subscribe(data =>
        {
          console.log(data)
          window.location.reload();
        },
        error=>
        {
            console.log(error); 
            //window.location.reload();         
        }
      );

      
  }

}