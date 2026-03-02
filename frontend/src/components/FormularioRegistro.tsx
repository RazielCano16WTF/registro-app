import { useState, useRef, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { Registro, FormErrors } from '../types/registro';
import calendarIcon from '../assets/calendar-svgrepo-com.svg';

interface FormularioRegistroProps {
  onRegistroCreado: (registro: Omit<Registro, 'id'>) => void;
  registroEditando: Registro | null;
  onCancelarEdicion: () => void;
}

const HOBBIES_OPCIONES = [
  'Deportes',
  'Lectura',
  'Música',
  'Videojuegos'
];

export default function FormularioRegistro({ onRegistroCreado, registroEditando, onCancelarEdicion }: FormularioRegistroProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    correoElectronico: '',
    sexo: '' as 'M' | 'F' | '',
    hobbies: [] as string[]
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (registroEditando) {
      setFormData({
        nombre: registroEditando.nombre,
        fechaNacimiento: registroEditando.fechaNacimiento,
        correoElectronico: registroEditando.correoElectronico,
        sexo: registroEditando.sexo,
        hobbies: registroEditando.hobbies || []
      });
      setErrors({});
    }
  }, [registroEditando]);

  const validarFecha = (fecha: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = fecha.match(regex);
    
    if (!match) return false;
    
    const [, dia, mes, anio] = match;
    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    const anioNum = parseInt(anio, 10);
    
    if (mesNum < 1 || mesNum > 12) return false;
    if (diaNum < 1 || diaNum > 31) return false;
    if (anioNum < 1900 || anioNum > new Date().getFullYear()) return false;
    
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if ((anioNum % 4 === 0 && anioNum % 100 !== 0) || anioNum % 400 === 0) {
      diasPorMes[1] = 29;
    }
    
    return diaNum <= diasPorMes[mesNum - 1];
  };

  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarFormulario = (): boolean => {
    const nuevosErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      nuevosErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.fechaNacimiento.trim()) {
      nuevosErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else if (!validarFecha(formData.fechaNacimiento)) {
      nuevosErrors.fechaNacimiento = 'Formato de fecha inválido (dd/mm/yyyy)';
    }

    if (!formData.correoElectronico.trim()) {
      nuevosErrors.correoElectronico = 'El correo electrónico es requerido';
    } else if (!validarEmail(formData.correoElectronico)) {
      nuevosErrors.correoElectronico = 'Formato de correo electrónico inválido';
    }

    if (!formData.sexo) {
      nuevosErrors.sexo = 'El sexo es requerido';
    }

    setErrors(nuevosErrors);
    return Object.keys(nuevosErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      const nuevoRegistro: Omit<Registro, 'id'> = {
        nombre: formData.nombre,
        fechaNacimiento: formData.fechaNacimiento,
        correoElectronico: formData.correoElectronico,
        sexo: formData.sexo as 'M' | 'F',
        hobbies: formData.hobbies
      };

      onRegistroCreado(nuevoRegistro);
      limpiarFormulario();
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      fechaNacimiento: '',
      correoElectronico: '',
      sexo: '',
      hobbies: []
    });
    setErrors({});
    onCancelarEdicion();
  };

  const convertirFechaADisplay = (fecha: string): string => {
    if (!fecha) return '';
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  };

  const convertirFechaAInput = (fecha: string): string => {
    if (!fecha) return '';
    const parts = fecha.split('/');
    if (parts.length !== 3) return '';
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleFechaTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    value = value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    
    setFormData(prev => ({
      ...prev,
      fechaNacimiento: value
    }));
    
    if (errors.fechaNacimiento) {
      setErrors(prev => ({
        ...prev,
        fechaNacimiento: undefined
      }));
    }
  };

  const handleFechaCalendarioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const fechaFormateada = convertirFechaADisplay(value);
    
    setFormData(prev => ({
      ...prev,
      fechaNacimiento: fechaFormateada
    }));
    
    if (errors.fechaNacimiento) {
      setErrors(prev => ({
        ...prev,
        fechaNacimiento: undefined
      }));
    }
  };

  const abrirCalendario = () => {
    dateInputRef.current?.showPicker();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      correoElectronico: value
    }));
    

    if (value.trim()) {
      if (!validarEmail(value)) {
        setErrors(prev => ({
          ...prev,
          correoElectronico: 'Formato de correo electrónico inválido'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          correoElectronico: undefined
        }));
      }
    } else {

        setErrors(prev => ({
        ...prev,
        correoElectronico: undefined
      }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleHobbyChange = (hobby: string) => {
    setFormData(prev => {
      const hobbiesActuales = prev.hobbies;
      const nuevosHobbies = hobbiesActuales.includes(hobby)
        ? hobbiesActuales.filter(h => h !== hobby)
        : [...hobbiesActuales, hobby];
      
      return {
        ...prev,
        hobbies: nuevosHobbies
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <h2>{registroEditando ? 'Editar Registro' : 'Formulario de Registro'}</h2>
      
      {registroEditando && (
        <div className="mensaje-edicion">
          Estás editando un registro. Modifica los campos necesarios y haz clic en "Actualizar".
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="nombre">Nombre *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className={errors.nombre ? 'error' : ''}
        />
        {errors.nombre && <span className="error-message">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento (dd/mm/yyyy) *</label>
        <div className="input-with-button">
          <input
            type="text"
            id="fechaNacimiento"
            name="fechaNacimiento"
            placeholder="dd/mm/yyyy"
            value={formData.fechaNacimiento}
            onChange={handleFechaTextChange}
            maxLength={10}
            className={errors.fechaNacimiento ? 'error' : ''}
          />
          <button
            type="button"
            className="btn-calendar"
            onClick={abrirCalendario}
            title="Seleccionar fecha del calendario"
          >
            <img src={calendarIcon} alt="Calendario" />
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={convertirFechaAInput(formData.fechaNacimiento)}
            onChange={handleFechaCalendarioChange}
            max={new Date().toISOString().split('T')[0]}
            className="date-hidden"
          />
        </div>
        {errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="correoElectronico">Correo Electrónico *</label>
        <input
          type="email"
          id="correoElectronico"
          name="correoElectronico"
          value={formData.correoElectronico}
          onChange={handleEmailChange}
          className={errors.correoElectronico ? 'error' : ''}
        />
        {errors.correoElectronico && <span className="error-message">{errors.correoElectronico}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="sexo">Sexo *</label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleInputChange}
          className={errors.sexo ? 'error' : ''}
        >
          <option value="">Seleccione...</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        {errors.sexo && <span className="error-message">{errors.sexo}</span>}
      </div>

      <div className="form-group">
        <label>Hobbies</label>
        <div className="hobbies-container">
          {HOBBIES_OPCIONES.map(hobby => (
            <label key={hobby} className="hobby-checkbox">
              <input
                type="checkbox"
                checked={formData.hobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
              />
              {hobby}
            </label>
          ))}
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {registroEditando ? 'Actualizar' : 'Registrar'}
        </button>
        {registroEditando && (
          <button 
            type="button" 
            className="btn-cancelar"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
