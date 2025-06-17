# Backend - CRUD de Empleados (NestJS)

Este proyecto es el backend de una aplicación fullstack para la **gestión de personal**, desarrollado como parte de un desafío técnico. Implementado con **NestJS**, **TypeORM** y **SQLite**, expone una API REST para crear, listar y administrar empleados y áreas.

---

## 🚀 Tecnologías

- [NestJS](https://nestjs.com/) - Framework de Node.js
- [TypeORM](https://typeorm.io/) - ORM para bases de datos SQL
- [SQLite](https://www.sqlite.org/) - Base de datos embebida
- [Jest](https://jestjs.io/) - Testing
- Swagger (opcional si decidís agregarlo para documentación de endpoints)

---

## 📦 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Gastygas/challenge.git

2. Entrá en la carpeta back:
cd back

3. Instalá las dependencias:

npm install

## ⚙️ Ejecución
Desarrollo

npm run start:dev

Producción

npm run start:prod

## 🧪 Testing

# Test unitarios
npm run test

# Test e2e
npm run test:e2e

# Cobertura
npm run test:cov

## 🔐 Variables de entorno
Crear un archivo .env con la siguiente variable:
INIT_SECRET=supersecret
Esta clave se usa para inicializar las áreas por única vez.

## 📁 Estructura de módulos
AppModule: configura TypeORM, módulos de empleados y áreas.

WorkerModule: funcionalidades relacionadas al alta de empleados.

AreaModule: administración y consulta de áreas disponibles.

## 📡 Endpoints

# 📂 Áreas (/areas)
GET /areas
Obtiene todas las áreas existentes.

POST /areas
Crea una nueva área.

Body:

{
  "name": "Nueva Área"
}
POST /areas/init?key=clave
Inicializa un conjunto predefinido de áreas. Solo funciona si no existen áreas.

Query:
key: clave secreta definida en .env

## 👷‍♂️ Empleados (/workers)
GET /workers
Obtiene todos los empleados.

POST /workers
Crea un nuevo empleado.

{
  "name": "Juan",
  "last_name": "Lopez",
  "dni": "12345678",
  "birthdate": "1990-01-01",
  "isDeveloper": true,
  "descripcion": "Backend dev",
  "areaId": "(pegar el id de una de las areas creadas anteriormente)"
}


## 🧠 Decisiones técnicas
Se eligió NestJS por su arquitectura modular y escalabilidad.

TypeORM permite mapear entidades de forma sencilla y mantiene el proyecto desacoplado de la base de datos.

SQLite se eligió por ser embebido, ideal para pruebas locales y despliegue sin servidor adicional.

Validaciones (por DTOs) aseguran que los datos cumplan con los formatos esperados.

📝 Notas adicionales
Se recomienda correr POST /areas/init con la clave una única vez para preconfigurar las áreas necesarias.

Si deseás agregar documentación Swagger, podés integrarlo fácilmente con @nestjs/swagger.