---
title: Configurar el atributo SameSite en las cookies de sesión
slug: /modulo/modulo5/same_site
tags: ["directivas de control", "same site"]
---


[Volver](/docs/modulo/modulo5/byp)  

SameSite es una excelente defensa de primera línea a nivel de navegador, pero es un complemento, no un reemplazo total de los tokens CSRF.  
Utilizar `SameSite=Lax` o `Strict` para restringir que el navegador envíe las cookies de sesión en peticiones provenientes de sitios externos, añadiendo una capa de defensa clave.  

El atributo `SameSite` controla si las cookies de sesión se envían en peticiones entre sitios (*cross-site*), actuando como primera línea de defensa contra CSRF.

## Criterio de Configuración

Elegí el nivel de restricción según el tipo de aplicación:

* **`SameSite=Lax` (Recomendado por defecto):** Protege las mutaciones de estado (`POST`, `DELETE`). Permite que el usuario llegue logueado si hace clic en un enlace legítimo (`GET`) desde el exterior.
* **`SameSite=Strict` (Alta Seguridad):** Bloquea la cookie en **cualquier** petición externa. Si el usuario viene de otro sitio, siempre llegará desautenticado hasta que recargue la página.

## La Triple Corona de la Cookie Segura

Para que la mitigación sea efectiva, la cookie de sesión **debe** emitirse con estos tres atributos en el backend:

```http
Set-Cookie: sid=xyz123; Secure; HttpOnly; SameSite=Lax
```
### Directivas de Control
* **SameSite=Lax|Strict**: Restringe el envío cross-site. Bloquea el envío de la cookie en peticiones maliciosas que vengan desde páginas externas (la defensa base contra CSRF).  
* **Secure**: Garantiza que la cookie solo viaje cifrada bajo HTTPS. Evita que la cookie viaje por conexiones HTTP inseguras (fuerza HTTPS).    
* **HttpOnly**: Impide que scripts maliciosos (XSS) roben el token de sesión e impide que scripts de JavaScript puedan leer la cookie, protegiéndola de ataques XSS.

:::warning
Defensa en profundidad:  
SameSite no reemplaza los tokens CSRF por formulario; ambos controles deben coexistir para proteger la aplicación de ataques originados desde subdominios propios de la organización.
:::

### ¿Qué pasa si dejo en un entorno productivo "Set-Cookie: sid=xyz123;"?  
Esa línea, tal como está escrita (Set-Cookie: sid=xyz123), es insegura para entornos productivos.  
Si un atacante intercepta el tráfico o logra inyectar un script malicioso (XSS), podría robar ese identificador y suplantar tu identidad por completo. Para cumplir con los estándares de DevSecOps se deben agregar las directivas de control.

