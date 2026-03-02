import { useState, useEffect } from 'react'
import './App.css'
import FormularioRegistro from './components/FormularioRegistro'
import TablaRegistros from './components/TablaRegistros'
import type { Registro } from './types/registro'
import { registroService } from './services/registroService'

function App() {
  const [registros, setRegistros] = useState<Registro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [registroEditando, setRegistroEditando] = useState<Registro | null>(null)

  useEffect(() => {
    cargarRegistros()
  }, [])

  const cargarRegistros = async () => {
    try {
      setLoading(true)
      setError(null)
      const datos = await registroService.obtenerTodos()
      setRegistros(datos)
    } catch (err) {
      setError('Error al conectar con el servidor. Asegúrate de que el backend esté ejecutándose en http://localhost:8080')
      console.error('Error al cargar registros:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegistroCreado = async (nuevoRegistro: Omit<Registro, 'id'>) => {
    try {
      setError(null)
      if (registroEditando) {
  
        await registroService.actualizar(registroEditando.id!, nuevoRegistro)
        setRegistroEditando(null)
      } else {
  
        await registroService.crear(nuevoRegistro)
      }

      await cargarRegistros()
    } catch (err) {
      setError('Error al guardar el registro. Verifica tu conexión con el servidor.')
      console.error('Error al crear/actualizar registro:', err)
    }
  }

  const handleEditar = (registro: Registro) => {
    setRegistroEditando(registro)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelarEdicion = () => {
    setRegistroEditando(null)
  }

  const handleEliminar = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        setError(null)
        await registroService.eliminar(id)
        await cargarRegistros()
      } catch (err) {
        setError('Error al eliminar el registro.')
        console.error('Error al eliminar registro:', err)
      }
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Registro</h1>
        <p>Evaluación Técnica - Formulario de Registro de Usuarios</p>
      </header>
      
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      
      <main className="app-main">
        <div className="form-section">
          <FormularioRegistro 
            onRegistroCreado={handleRegistroCreado}
            registroEditando={registroEditando}
            onCancelarEdicion={handleCancelarEdicion}
          />
        </div>
        
        <div className="table-section">
          {loading ? (
            <div className="loading">Cargando registros...</div>
          ) : (
            <TablaRegistros 
              registros={registros}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
