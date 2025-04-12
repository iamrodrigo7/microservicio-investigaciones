# Microservicio de Investigaciones

Este microservicio forma parte del sistema de gestión académica de la Universidad Da Vinci. Su función principal es administrar la información relacionada con las investigaciones desarrolladas por las distintas facultades.

---

## Características

- Permite crear, consultar, actualizar y eliminar investigaciones.
- Se conecta a una base de datos MongoDB compartida entre microservicios.
- Desarrollado con Node.js, Express.js y Mongoose.
- Contenedor Docker para despliegue independiente.

---

## Requisitos para ejecución

- Docker y Docker Compose instalados.
- MongoDB accesible en la red del contenedor.
- Puerto expuesto: `5002`

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/iamrodrigo7/microservicio-investigaciones.git
cd microservicio-investigaciones

---

## Pruebas con Postman

Puedes probar los endpoints desde Postman utilizando los siguientes ejemplos:

### Obtener todas las investigaciones

- **Método**: `GET`  
- **URL**: `http://localhost:5002/investigaciones`  
- **Descripción**: Retorna todas las investigaciones registradas.

---

### Crear una nueva investigación

- **Método**: `POST`  
- **URL**: `http://localhost:5002/investigaciones`  
- **Body** (raw → JSON):

```json
{
  "titulo": "Impacto de la Inteligencia Artificial en la Ingeniería",
  "anio": 2025,
  "duracion_meses": 10,
  "facultad": "67f88e9e483035ffb0f78c93",
  "investigador_principal": "67f893c6739b8acd4c4f8872"
}


## Autor
Rodrigo Avila 
202104215
Universidad Da Vinci