export interface LibrosResponse {
    data: Libro[];
    success: boolean;
    errorMessage: string | null;
  }
  
  export interface Libro {
    id: number;
    nombres: string;
    autor: string;
    isbn: string;
    status: boolean;
  }

  export interface LibroAddRequest {
    nombres: string;
    autor: string;
    isbn: string;
    status: boolean;
  }