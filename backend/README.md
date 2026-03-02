# Backend - Aplicación de Registro

API REST desarrollada con Spring Boot para el sistema de registro de usuarios.

## Tecnologías

- **Spring Boot 3.2.3**
- **Java 17**
- **Maven**
- **Spring Data JPA**
- **H2 Database** (En memoria)
- **Spring Validation**
- **Lombok**

## Endpoints de la API

### Base URL: `http://localhost:8080/api/registros`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todos los registros |
| GET | `/{id}` | Obtener un registro por ID |
| POST | `/` | Crear un nuevo registro |
| PUT | `/{id}` | Actualizar un registro existente |
| DELETE | `/{id}` | Eliminar un registro |

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/evaluacion/registro/
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java
│   │   │   ├── controller/
│   │   │   │   └── RegistroController.java
│   │   │   ├── model/
│   │   │   │   └── Registro.java
│   │   │   ├── repository/
│   │   │   │   └── RegistroRepository.java
│   │   │   └── RegistroApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Modelo de Datos

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "fechaNacimiento": "15/03/1990",
  "correoElectronico": "juan@example.com",
  "sexo": "M",
  "hobbies": ["Deportes", "Lectura"]
}
```

## Ejecución

### Usando Maven Wrapper (recomendado):
```bash
./mvnw spring-boot:run
```

### Usando Maven instalado:
```bash
mvn spring-boot:run
```

El servidor se iniciará en `http://localhost:8080`

## Base de Datos H2

La consola de H2 está disponible en: `http://localhost:8080/h2-console`

Configuración de conexión:
- **JDBC URL**: `jdbc:h2:mem:registrodb`
- **User Name**: `sa`
- **Password**: (vacío)

## Validaciones

La API valida:
-  Todos los campos son requeridos (excepto hobbies)
-  Formato de fecha: dd/mm/yyyy
-  Formato de correo electrónico válido
-  Sexo: solo "M" o "F"

## CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (Otros frameworks)

## Compilar para Producción

```bash
mvn clean package
```

El archivo JAR se generará en `target/registro-app-1.0.0.jar`

Para ejecutar:
```bash
java -jar target/registro-app-1.0.0.jar
```
