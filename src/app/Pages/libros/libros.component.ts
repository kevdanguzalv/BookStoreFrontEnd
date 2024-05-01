import { Component, Inject, inject } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { LibrosResponse, Libro, LibroAddRequest } from '../../Models/Libros.Model';
import { LibrosService } from '../../Services/Libros/libros.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientesRequest } from '../../Models/ClientesReques';
import { ClientesService } from '../../Services/Clientes/clientes.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {
  libros: Libro[] = [];

  constructor(private librosService: LibrosService,   private router: Router,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.librosService.getLibros().subscribe(data => {
      //console.log(data.data);
      this.libros = data.data;
      //console.log( this.libros);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  EditarLibro(libro : Libro) {
    
    const dialogRef = this.dialog.open(EditarLibroClass, {data: libro });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  InactivarLibro(libro : Libro) {
    console.log(libro);
    this.librosService.DeleteLibro(libro.id).subscribe(data =>
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

@Component({
  selector: 'AddLibro',
  templateUrl: '/src/app/Pages/libros/AddLibro.html',
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
  AddLibroForm: FormGroup;
  private http = inject(HttpClient);

  formData: LibroAddRequest = {
    nombres: '',
    autor: '',
    isbn: '',
    status: true
  };

  constructor(private fb: FormBuilder, private librosService: LibrosService, private router: Router) {
    // Crea el formulario con los campos correspondientes
    this.AddLibroForm = this.fb.group({
      nombres: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      status: true
      
    });
  }

  AddLibro() 
  {
    
    this.formData = this.AddLibroForm.value;
    this.formData.status = true;
    

      this.librosService.postLibros(this.formData).subscribe(data =>
        {
          window.location.reload();
        },
        error=>
        {
            console.log(error);  
            
        }
      );
      

  }
}

@Component({
  selector: 'EditarCliente',
  templateUrl: '/src/app/Pages/libros/EditarLibro.html',
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
export class EditarLibroClass {
  EditarLibroForm: FormGroup;
  private http = inject(HttpClient);
  Id: number = 0;
  formData: Libro = {
    id: 0,
    nombres: '',
    autor: '',
    isbn: '',
    status: true
  };

  constructor(private fb: FormBuilder, private librosService: LibrosService, private router: Router, @Inject(MAT_DIALOG_DATA) public libro: Libro) {
    // Crea el formulario con los campos correspondientes

    this.EditarLibroForm = this.fb.group({
      
      id: [{value: libro.id, disabled: true}],
      nombres: [libro.nombres, Validators.required],
      autor: [libro.autor, Validators.required],
      isbn: [libro.isbn, Validators.required],
      status: [libro.status, Validators.required]
    });
    this.Id = this.libro.id;
  }

  EditarLibro() 
  {

    this.formData = this.EditarLibroForm.value;
    this.formData.id = this.Id;
    
      this.librosService.puttLibros(this.formData).subscribe(data =>
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
