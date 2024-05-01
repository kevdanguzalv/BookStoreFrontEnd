import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'clientes',
        pathMatch: 'full',
        loadComponent: () =>
          import('./Pages/clientes/clientes.component').then((m) => m.ClientesComponent),
      } ,
      {
        path: 'libros',
        pathMatch: 'full',
        loadComponent: () =>
          import('./Pages/libros/libros.component').then((m) => m.LibrosComponent),
      },
      {
        path: 'pedidos',
        pathMatch: 'full',
        loadComponent: () =>
            import('./Pages/pedidos/pedidos.component').then((m) => m.PedidosComponent),
      },
      {
        path: 'consulta',
        pathMatch: 'full',
        loadComponent: () =>
          import('./Pages/consulta/consulta.component').then((m) => m.ConsultaComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clientes',
      },

];
