---
title: Validación de Tokens CSRF en Backend
slug: /modulo/modulo5/back
---


[Volver](/docs/modulo/modulo5/byp)  
El backend es la última línea de defensa. 
No basta con que el frontend envíe el token; el servidor debe interceptar, validar y rechazar de forma estricta cualquier petición sospechosa antes de que toque la lógica de negocio.  


## 1. El Flujo de Validación Estricta

Para cualquier acción que mute el estado del sistema (crear, actualizar, borrar), el backend debe ejecutar el siguiente flujo lógico:

![D](/img/m5/ssdlc_m5_sub_flux.png)

## 2. Regla de Oro para el Backend
### Garantizar el orden de ejecución  
La validación del token CSRF debe ocurrir en las primeras capas del ciclo de vida de la petición (Middleware o Interceptores), después de la autenticación del usuario pero antes de la validación de los datos de entrada ([**DTOs**][ref1] ![icono]) o controladores.

### Respuesta ante fallos
Si el token falta, expiró o es inválido, el backend debe responder inmediatamente con un código de estado 403 Forbidden (o 400 Bad Request) y abortar el procesamiento.

### Sanitización de Logs
Al registrar el fallo de CSRF en los logs para auditoría, nunca guardes el valor del token válido ni la cookie de sesión del usuario. Registra solo el evento (ej: CSRF_VALIDATION_FAILED junto al ID de usuario anónimo/autenticado y la IP).

## 3. La Excepción: Métodos Seguros
NUNCA se debe exigir ni validar un token CSRF en métodos HTTP seguros:
* GET
* HEAD
* OPTIONS
* TRACE

:::important Importante
[Por especificación **RFC 9110**][ref2] ![icono], estos métodos **deben ser exclusivamente de lectura**.  
Si un endpoint GET en tu código realiza una acción sensible (<span style={{backgroundColor: 'darkred', width: 'auto'}}>como GET /api/v1/delete-user?id=5</span>), la protección CSRF no funcionará correctamente y la aplicación será vulnerable.  
Cambiar ese endpoint a **DELETE** o **POST**.
:::

## 4. Checklist de QA para esta regla
Antes de aprobar el paso a producción, verificar que:  

[ ] Cualquier petición POST, PUT o DELETE sin la cabecera/parámetro CSRF devuelva un 403.  
[ ] Alterar un solo carácter del token en la petición devuelva un 403.  
[ ] Las peticiones de lectura (GET) sigan funcionando con normalidad sin requerir el token.  


<!-- Refs -->
[icono]: /img/external-link.svg
[ref1]: https://martinfowler.com/eaaCatalog/dataTransferObject.html
[ref2]: https://datatracker.ietf.org/doc/html/rfc9110#name-syntax-notation