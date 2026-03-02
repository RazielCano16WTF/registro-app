export interface Registro {
  id?: number;
  nombre: string;
  fechaNacimiento: string;
  correoElectronico: string;
  sexo: 'M' | 'F';
  hobbies: string[];
}

export interface FormErrors {
  nombre?: string;
  fechaNacimiento?: string;
  correoElectronico?: string;
  sexo?: string;
}
