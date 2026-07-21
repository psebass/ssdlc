---
id: doble-confirmacion
title: Re-autenticación para Operaciones Críticas
slug: /modulo/modulo5/double-conf
---
[Volver](/docs/modulo/modulo5/byp)  

Incluso si un atacante logra eludir los tokens CSRF y el atributo `SameSite`, el requerimiento de una doble confirmación (o *Step-Up Authentication*) actúa como un freno definitivo para acciones que comprometan la cuenta o el negocio.

## ¿Cuándo exigir Doble Confirmación?

Se debe interceptar al usuario y exigir una validación extra en las siguientes operaciones:
1. **Cambio de credenciales:** Modificación de contraseña o correo electrónico.
2. **Gestión de Seguridad:** Activación/desactivación de MFA o generación de API keys.
3. **Acciones de Negocio Críticas:** Transferencias de fondos, borrado definitivo de datos o cambios en permisos de administración.  

## El Flujo de Trabajo Seguro

Para implementar este control de forma efectiva, el backend debe validar dos cosas en el mismo endpoint:

![D](/img/m5/ssdlc_m5_sub_sec_work.png)

## Ejemplo de Implementación Lógica
Cuando el usuario hace clic en "Confirmar transferencia", el frontend no envía la acción directamente; abre un modal intermedio:

* **El Modal**: Solicita la contraseña actual del usuario o un token OTP (MFA).  
* **El Payload**: El formulario POST resultante envía los datos de la operación más el parámetro de confirmación (la contraseña/OTP) más el token CSRF.
* **La Validación**: El backend verifica la sesión actual (vía cookie) y vuelve a comprobar contra la base de datos que la contraseña o el OTP sigan siendo válidos en ese instante.

### Ventaja DevSecOps
Un atacante que ejecuta un ataque CSRF a ciegas desde un sitio externo no tiene acceso a la contraseña del usuario ni a su dispositivo MFA físico, bloqueando el ataque por completo.