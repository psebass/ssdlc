---
id: metodos-http
title: Uso Seguro de Métodos HTTP
slug: /modulo/modulo5/meth-http
---


[Volver](/docs/modulo/modulo5/byp)  

Los métodos HTTP tienen semánticas definidas que los navegadores y las defensas de seguridad (como CSRF y proxies) asumen como ciertas. Alterar datos mediante métodos incorrectos rompe la seguridad por diseño.

## Idoneidad de Métodos vs. Acciones
Todo endpoint de la organización debe respetar estrictamente la siguiente matriz de operaciones:

| Método HTTP         | Propósito                       | ¿Modifica Datos? | ¿Requiere Token CSRF? |
| :------------------ | :------------------------------ | :--------------- | :-------------------- |
| **`GET`**           | Lectura de datos / Consultas.   | **NUNCA**        | No                    |
| **`HEAD`/`OPTIONS`**| Metadatos y configuración.      | **NUNCA**        | No                    |
| **`POST`**          | Creación de recursos / Acciones.| **SÍ**           | **SÍ**                |
| **`PUT` / `PATCH`** | Actualización total o parcial.  | **SÍ**           | **SÍ**                |
| **`DELETE`**        | Eliminación de recursos.        | **SÍ**           | **SÍ**                |

## El Peligro del "Id por URL" en GET
Un error común es mapear acciones destructivas o sensibles en peticiones de lectura por comodidad.

* **Inseguro:** `GET /api/usuarios/eliminar?id=102`  
  * *Por qué:* Los navegadores, pre-buscadores (pre-fetching) y bots asumen que `GET` es seguro y podrían ejecutar la acción automáticamente. Además, las protecciones CSRF **no** interceptan peticiones `GET`, dejando el endpoint totalmente expuesto.  
* **Seguro:** `DELETE /api/usuarios/102`

## Checklist para Desarrolladores
- [ ] Ningún controlador `GET` realiza inserts, updates o deletes en la base de datos.
- [ ] Los formularios HTML que realizan acciones utilizan explícitamente `method="POST"`.
- [ ] Las llamadas de API para mutar datos utilizan los verbos estándares del protocolo.