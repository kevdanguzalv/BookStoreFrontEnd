export interface ClientesResponse {
    data: Clientes[];
    success: boolean;
    errorMessage: string | null;
  }
  
  export interface Clientes {
    id: number;
    nombres: string;
    apellidos: string;
    dni: string;
    edad: number;
    status: boolean;
  }

  export interface ClientesResponseAdd {
    data: number;
    success: boolean;
    errorMessage: string | null;
  }

