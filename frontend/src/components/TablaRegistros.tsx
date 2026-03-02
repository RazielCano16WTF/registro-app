import type { Registro } from '../types/registro';
import pencilIcon from '../assets/pencil-svgrepo-com.svg';
import trashIcon from '../assets/trash-bin-trash-svgrepo-com.svg';

interface TablaRegistrosProps {
  registros: Registro[];
  onEditar: (registro: Registro) => void;
  onEliminar: (id: number) => void;
}

export default function TablaRegistros({ registros, onEditar, onEliminar }: TablaRegistrosProps) {
  if (registros.length === 0) {
    return (
      <div className="tabla-container">
        <h2>Registros</h2>
        <p className="no-registros">No hay registros aún. Complete el formulario para agregar uno.</p>
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <h2>Registros</h2>
      
      <div className="tabla-wrapper">
        <table className="tabla-registros">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Correo Electrónico</th>
              <th>Sexo</th>
              <th>Hobbies</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.nombre}</td>
                <td>{registro.fechaNacimiento}</td>
                <td>{registro.correoElectronico}</td>
                <td>{registro.sexo === 'M' ? 'Masculino' : 'Femenino'}</td>
                <td>
                  {registro.hobbies.length > 0 
                    ? registro.hobbies.join(', ') 
                    : 'Ninguno'}
                </td>
                <td>
                  <div className="acciones-botones">
                    <button 
                      className="btn-accion btn-editar" 
                      title="Editar"
                      onClick={() => onEditar(registro)}
                    >
                      <img src={pencilIcon} alt="Editar" />
                    </button>
                    <button 
                      className="btn-accion btn-eliminar" 
                      title="Eliminar"
                      onClick={() => onEliminar(registro.id!)}
                    >
                      <img src={trashIcon} alt="Eliminar" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
