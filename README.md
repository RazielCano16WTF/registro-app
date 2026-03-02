# Sistema de Registro de Usuarios
## Evaluación Técnica - Aplicación Web Full Stack

Sistema completo de registro de usuarios con formulario web, API REST y persistencia en base de datos H2.

---

## Inicio Rápido

### Requisitos Previos

- **Node.js** 18+ y npm
- **Java** 17+
- **Maven** 3.9+
  (no es necesario si se utiliza el *wrapper* incluido)

### 1. Ejecutar el Backend (Spring Boot)

Abre una terminal y ejecuta:

```bash
cd backend
# si tienes Maven instalado puedes usar:
#   mvn spring-boot:run
# pero no es obligatorio: el proyecto incluye un
# "Maven wrapper" que descargará Maven automáticamente.
# usa la variante apropiada para tu sistema operativo:
./mvnw spring-boot:run      # Linux/macOS
mvnw.cmd spring-boot:run    # Windows (PowerShell/Command Prompt)
```

El servidor backend estará disponible en: **http://localhost:8080**

### 2. Ejecutar el Frontend (React + Vite)

Abre **otra terminal** y ejecuta:

```bash
cd frontend
npm install
npm run dev
```

 La aplicación frontend estará disponible en: **http://localhost:5173**

### 3. Abrir la Aplicación

Abre tu navegador en: **http://localhost:5173**

---

## Cómo Usar la Aplicación

### Crear un Registro

1. Completa el formulario con la información del usuario:
   - **Nombre**: Campo de texto requerido
   - **Fecha de Nacimiento**: Escribe en formato dd/mm/yyyy o usa el botón del calendario para seleccionar la fecha
   - **Correo Electrónico**: Se valida el formato en tiempo real
   - **Sexo**: Selecciona Masculino o Femenino
   - **Hobbies**: Opcional, selecciona uno o más

2. Haz clic en **"Registrar"**

3. El registro aparecerá automáticamente en la tabla de registros

### Editar un Registro

1. En la tabla de registros, haz clic en el icono del **lápiz** 
2. Los datos se cargarán automáticamente en el formulario
3. Modifica los campos que necesites
4. Haz clic en **"Actualizar"** para guardar los cambios
5. O haz clic en **"Cancelar"** para descartar los cambios

### Eliminar un Registro

1. En la tabla de registros, haz clic en el icono de la **basura** 
2. Confirma la eliminación en el diálogo que aparece
3. El registro se eliminará de la base de datos

### Ver los Datos en la Base de Datos

Accede a la consola H2 en: **http://localhost:8080/h2-console**

**Credenciales:**
- JDBC URL: `jdbc:h2:mem:registrodb`
- User Name: `sa`
- Password: _(dejar vacío)_

**Consultas útiles:**
```sql
-- Ver todos los registros
SELECT * FROM REGISTROS;

-- Ver hobbies
SELECT * FROM REGISTRO_HOBBIES;

-- Ver registros con sus hobbies
SELECT r.*, rh.HOBBY 
FROM REGISTROS r 
LEFT JOIN REGISTRO_HOBBIES rh ON r.ID = rh.REGISTRO_ID;
```

---

## Descripción del Proyecto

Aplicación web que permite registrar usuarios con su información personal a través de un formulario interactivo. Los datos se almacenan en una base de datos H2 mediante una API REST desarrollada con Spring Boot.

### Características Implementadas

**Formulario de Registro** con los siguientes campos:
- Nombre (requerido)
- Fecha de nacimiento (requerido, formato dd/mm/yyyy con calendario)
- Correo electrónico (requerido, con validación en tiempo real)
- Sexo (requerido, M/F)
- Hobbies (opcional, 4 opciones: Deportes, Lectura, Música, Videojuegos)

**Validaciones:**
- Todos los campos requeridos validados
- Formato de fecha dd/mm/yyyy con validación de fechas válidas
- Validación de formato de correo electrónico en tiempo real
- Selector de calendario integrado

**Funcionalidades CRUD Completas:**
- Crear nuevos registros
- Visualizar todos los registros en tabla
- Editar registros existentes
- Eliminar registros con confirmación

**Interfaz de Usuario:**
- Diseño moderno y responsivo
- Iconos SVG personalizados
- Feedback visual para validaciones
- Mensajes de error/éxito
- Scroll automático al editar

---

## Tecnologías Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite 7.3.1** - Build tool y dev server
- **CSS3** - Estilos personalizados con variables CSS

### Backend
- **Spring Boot 3.2.3** - Framework de aplicación
- **Java 17** - Lenguaje de programación
- **Maven** - Gestor de dependencias
- **Spring Data JPA** - Capa de persistencia
- **H2 Database** - Base de datos en memoria
- **Spring Validation** - Validaciones de datos

---

## Estructura del Proyecto

```
Prueba/
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── assets/             # Iconos SVG
│   │   ├── components/         # Componentes React
│   │   │   ├── FormularioRegistro.tsx
│   │   │   └── TablaRegistros.tsx
│   │   ├── services/           # Servicios API
│   │   │   └── registroService.ts
│   │   ├── types/              # Tipos TypeScript
│   │   │   └── registro.ts
│   │   ├── App.tsx             # Componente principal
│   │   ├── App.css             # Estilos globales
│   │   └── main.tsx            # Punto de entrada
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # API REST Spring Boot
│   ├── src/main/
│   │   ├── java/com/evaluacion/registro/
│   │   │   ├── config/         # Configuración CORS
│   │   │   ├── controller/     # Controladores REST
│   │   │   ├── model/          # Entidades JPA
│   │   │   ├── repository/     # Repositorios
│   │   │   └── RegistroApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
│
└── README.md                    # Este archivo
```

---

## API REST - Endpoints

### Base URL: `http://localhost:8080/api/registros`

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/` | Obtener todos los registros | - |
| GET | `/{id}` | Obtener un registro por ID | - |
| POST | `/` | Crear nuevo registro | JSON |
| PUT | `/{id}` | Actualizar registro existente | JSON |
| DELETE | `/{id}` | Eliminar registro | - |

### Ejemplo de Request Body (POST/PUT)

```json
{
  "nombre": "Juan Pérez",
  "fechaNacimiento": "15/03/1990",
  "correoElectronico": "juan@example.com",
  "sexo": "M",
  "hobbies": ["Deportes", "Lectura"]
}
```

---

## Base de Datos H2

### Consola H2

Accede a la consola web de H2 en: **http://localhost:8080/h2-console**

**Credenciales:**
- **JDBC URL**: `jdbc:h2:mem:registrodb`
- **User Name**: `sa`
- **Password**: _(dejar vacío)_

### Estructura de Tablas

**REGISTROS**
```sql
CREATE TABLE REGISTROS (
    ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(255) NOT NULL,
    FECHA_NACIMIENTO VARCHAR(10) NOT NULL,
    CORREO_ELECTRONICO VARCHAR(255) NOT NULL,
    SEXO CHAR(1) NOT NULL
);
```

**REGISTRO_HOBBIES** (tabla relacional)
```sql
CREATE TABLE REGISTRO_HOBBIES (
    REGISTRO_ID BIGINT,
    HOBBY VARCHAR(255),
    FOREIGN KEY (REGISTRO_ID) REFERENCES REGISTROS(ID)
);
```

### Consultas SQL Útiles

```sql
-- Ver todos los registros
SELECT * FROM REGISTROS;

-- Ver hobbies de los registros
SELECT * FROM REGISTRO_HOBBIES;

-- Ver registros con sus hobbies
SELECT 
    r.ID,
    r.NOMBRE,
    r.CORREO_ELECTRONICO,
    rh.HOBBY
FROM REGISTROS r
LEFT JOIN REGISTRO_HOBBIES rh ON r.ID = rh.REGISTRO_ID;
```

---

## Funcionalidades Destacadas

### Validación de Fecha
- Formato automático con diagonales (dd/mm/yyyy)
- Selector de calendario integrado con botón opcional
- Validación de fechas válidas (días del mes, años bisiestos)
- Límite: no permite fechas futuras

### Validación de Email
- Validación en tiempo real mientras escribes
- Feedback inmediato visual
- Formato estándar de correo electrónico

### Modo Edición
- Al hacer clic en editar, los datos se cargan automáticamente en el formulario
- Banner informativo azul indica el modo de edición
- Botón "Actualizar" en lugar de "Registrar"
- Botón "Cancelar" para salir del modo edición
- Scroll automático al formulario

### Eliminación Segura
- Diálogo de confirmación antes de eliminar
- Actualización automática de la tabla

---

## Características de UI/UX

- Diseño responsivo (móvil, tablet, desktop)
- Gradiente de fondo atractivo
- Iconos SVG personalizados
- Efectos hover en botones
- Mensajes de error/éxito contextuales
- Validaciones en tiempo real
- Feedback visual inmediato
- Animaciones suaves

---

## Notas Técnicas

### CORS
El backend está configurado para aceptar peticiones desde `http://localhost:*` para permitir cualquier puerto de desarrollo local.

### Persistencia
La base de datos H2 está configurada en modo memoria. Los datos se pierden al reiniciar el servidor. Para persistencia permanente, modificar `application.properties`.

### Validaciones
Las validaciones se realizan tanto en frontend (experiencia de usuario) como en backend (seguridad) usando Bean Validation.

---

## Compilación para Producción

### Frontend
```bash
cd frontend
npm run build
```
Los archivos compilados estarán en `frontend/dist/`

### Backend
```bash
cd backend
mvn clean package
```
El archivo JAR estará en `backend/target/registro-app-1.0.0.jar`

### Ejecutar el JAR
```bash
java -jar backend/target/registro-app-1.0.0.jar
```

---

## Desarrollo

### Scripts Disponibles

**Frontend:**
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run lint` - Ejecuta linter
- `npm run preview` - Preview de producción

**Backend:**
- `mvn spring-boot:run` - Inicia aplicación
- `mvn clean install` - Compila proyecto
- `mvn test` - Ejecuta tests

---

## Solución de Problemas

### Puerto 8080 ya en uso
```bash
# En macOS/Linux
lsof -ti:8080 | xargs kill -9

# Luego reinicia el backend
```

### Error de conexión frontend-backend
- Verifica que el backend esté corriendo en el puerto 8080
- Revisa la consola del navegador para más detalles
- Asegúrate de que la configuración CORS esté correcta

### Maven no encontrado
```bash
# Instalar Maven con Homebrew (macOS)
brew install maven

# Verificar instalación
mvn -version
```

---

## Licencia

Este proyecto fue desarrollado como parte de una evaluación técnica.

---

## Contacto

Para cualquier consulta sobre este proyecto, por favor contacta al desarrollador.

---

**Fecha de Entrega:** Marzo 2026  
**Versión:** 1.0.0
