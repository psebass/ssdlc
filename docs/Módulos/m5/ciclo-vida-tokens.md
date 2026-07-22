---
id: ciclo-vida-tokens
title: Ciclo de Vida y Expiración de Tokens CSRF
slug: /modulo/modulo5/tokn-cycle
---

[Volver](/docs/modulo/modulo5/byp)  

Un token CSRF eterno se convierte en un eslabón débil. Para garantizar su eficacia, el token debe estar sujeto a un ciclo de vida estricto basado en el tiempo y en eventos de un solo uso.

## Reglas de Invalidation del Token

El backend debe destruir y regenerar los tokens CSRF bajo los siguientes tres escenarios obligatorios:

### 1. Desuso por Tiempo (Time-To-Live / TTL)
* **Regla:** El token asociado a la sesión debe expirar automáticamente tras un período de inactividad (ej. 30 a 60 minutos).
* **Implementación:** Si se usan mecanismos basados en cookies firmadas (como `csrf-csrf`), la cookie que almacena el secreto del token debe reflejar el mismo tiempo de expiración máximo (`maxAge`) que la sesión del usuario.

### 2. Invalidación Post-Uso (Tokens por Formulario / Single-Use)
* **Regla:** Una vez que un formulario crítico es procesado con éxito (`POST` / `PUT`), el token utilizado **debe quedar invalidado**.
* **Implementación:** El servidor debe generar un nuevo token y enviarlo al frontend en la respuesta para que las siguientes interacciones usen un valor fresco (patrón *Nonce* o Token de un solo uso).

### 3. Cierre y Cambio de Sesión (Log-Out / Log-In)
* **Regla:** Al momento en que el usuario hace clic en "Cerrar sesión", o cuando se autentica con éxito, el token CSRF anterior **debe ser completamente destruido** en el servidor o borrado del navegador.
* **Por qué:** Previene ataques de **Fijación de CSRF**, donde un atacante implanta un token válido conocido en el navegador de la víctima antes de que esta inicie sesión.


## Checklist de Verificación en el Pipeline / Code Review
- [ ] Los endpoints de Login y Logout destruyen explícitamente el contexto de la sesión y emiten un nuevo par de cookies/tokens de seguridad.
- [ ] La configuración del middleware CSRF no permite la reutilización indefinida del mismo token a lo largo de múltiples días.