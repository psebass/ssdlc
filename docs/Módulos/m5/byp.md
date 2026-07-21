---
sidebar_position: 12
title: Gestión de sesiones
slug: /modulo/modulo5/byp
description: Sesiones
keywords: [confianzacero, autorización, backend, CSRF]
tags: []
---

[Volver](/docs/modulo/modulo5/)  

## Bypass de autorización
Un bypass de autorización ocurre cuando un usuario logra acceder a recursos o ejecutar acciones sin poseer los permisos adecuados. Este tipo de vulnerabilidad surge cuando el control de acceso no se aplica de forma centralizada o cuando las verificaciones se basan en datos manipulables por el cliente, como parámetros en una URL o valores en el cuerpo de una solicitud.  

Los ataques de bypass son especialmente críticos porque violan el principio de confianza cero: cualquier usuario, incluso  autenticado, debe ser considerado no autorizado hasta que se verifique expresamente su permiso para cada acción.  
En la práctica, un bypass puede permitir leer, modificar o eliminar información ajena, ejecutar operaciones administrativas o escalar privilegios dentro de la aplicación.  

## Prevención de CSRF
El Cross-Site Request Forgery (CSRF) es un ataque que fuerza al navegador de un usuario autenticado a enviar solicitudes no deseadas a una aplicación web en la que tiene sesión activa. El atacante aprovecha la confianza del servidor en el navegador, ejecutando acciones como transferencias, cambios de contraseña o eliminación de datos sin el consentimiento del usuario.  

CSRF se origina porque las cookies se envían automáticamente con cada solicitud, incluso cuando provienen de un sitio malicioso. Si la aplicación no implementa mecanismos de verificación adicionales, el servidor no puede distinguir entre una solicitud legítima y una falsificada.  

### Buenas prácticas
Para evitar que un atacante envíe solicitudes maliciosas usando la sesión del usuario:  
* [Incluir tokens CSRF únicos por sesión y por formulario.][ref1] ![icono]
* [Verificar el token en backend antes de procesar cualquier acción sensible.][ref2] ![icono]
* [Usar cookies con SameSite=Lax o Strict para reducir envío cross-site.][ref3] ![icono]
* [Exigir métodos seguros: modificar datos solo mediante `POST`/`PUT`/`DELETE`.][ref4] ![icono]
* [Requerir doble confirmación en operaciones peligrosas.][ref5] ![icono]  
* [Invalidar tokens CSRF después de su uso o después de un tiempo limitado.][ref6] ![icono]   

## Manejo seguro de sesiones y tokens
El manejo seguro de sesiones y tokens es esencial para preservar la identidad del usuario y prevenir suplantaciones. Una sesión o token comprometido equivale a una identidad robada. Las vulnerabilidades más comunes se relacionan con sesiones sin expiración, tokens almacenados en ubicaciones inseguras (como localStorage), o falta de mecanismos de rotación y revocación.  
En entornos distribuidos, donde múltiples servicios comparten autenticación, los riesgos se amplifican si no se sincronizan correctamente las políticas de expiración y validación.  

La diferencia clave entre una sesión y un token es que la primera suele mantenerse en el servidor (con estado), mientras que el token opera de forma autónoma y sin almacenamiento centralizado (sin estado). Por eso, la gestión de tokens requiere controles más estrictos en su emisión y validación.  

### Buenas prácticas
Para evitar suplantación mediante robo de sesión o token comprometido:  
* Configurar sesiones con **idle timeout** (expira por inactividad) y **absolute timeout** (expira siempre).  
* Renovar el ID de sesión después de iniciar sesión (prevención de Session Fixation).  
* No almacenar tokens en localStorage o sessionStorage si contienen información sensible.  
* Preferir cookies `HttpOnly` + `Secure` como contenedor para tokens.  
* Implementar rotación y revocación de tokens en flujos críticos.  
* Usar mecanismos de introspección o listas de revocación cuando se utilicen tokens sin estado (JWT).  
* No exponer tokens en URLs, fragmentos (#) o redirecciones.  

## Cookies Seguras
Las cookies son un componente esencial para mantener el estado entre solicitudes, pero también una de las principales fuentes de riesgo si se configuran de forma incorrecta. Las cookies inseguras pueden ser interceptadas, modificadas o reutilizadas por atacantes.  
El impacto de una cookie expuesta depende de su función. Si contiene un identificador de sesión o token de autenticación, su robo permite al atacante asumir la identidad del usuario. Por eso, su protección es un aspecto crítico del desarrollo seguro.  

### Buenas prácticas
* Usar siempre el atributo Secure para que las cookies solo se transmitan por HTTPS.  
* Definir el atributo HttpOnly para evitar su lectura mediante JavaScript.  
* Limitar el dominio (Domain) y la ruta (Path) para restringir su alcance.  
* Implementar SameSite=Lax o Strict para prevenir ataques CSRF.  
* No almacenar información sensible (contraseñas, claves, tokens sin cifrar).  
* Establecer expiraciones cortas y políticas de rotación periódica.  

## Enumeración de Usuarios
La enumeración de usuarios ocurre cuando una aplicación revela, de manera directa o indirecta, si un nombre de usuario o correo electrónico existe en el sistema. Esto brinda a los atacantes información valiosa para preparar ataques de fuerza bruta o phishing selectivo.  
Los mensajes de error, los tiempos de respuesta y los códigos de estado HTTP pueden ser suficientes para deducir si una cuenta es válida.  

:::note Nota
Por ejemplo una respuesta del sistema como _“El usuario no existe”_ diferencia claramente entre un nombre incorrecto y una contraseña errónea.
:::

Para evitar revelar si una cuenta existe:

* Devolver mensajes de error genéricos y uniformes en login y recuperación. Por ejemplo: "Las credenciales proporcionadas no son válidas" para cualquier caso.
* Mantener tiempos de respuesta homogéneos entre usuario válido/inválido.  
* Usar códigos de estado HTTP idénticos (siempre 401 o 400).  
* Considerar rate limiting para frenar intentos de enumeración.  
* Registrar patrones de acceso sospechosos.  

### Recuperación de cuentas
El proceso de recuperación de cuentas es una de las rutas más atacadas en los sistemas modernos, ya que suele ser más débil que el proceso de autenticación original. Un atacante puede explotar un flujo de recuperación inseguro para tomar el control de una cuenta legítima.  
Los errores más frecuentes incluyen el envío de enlaces sin expiración, preguntas de seguridad triviales, verificación basada solo en correo electrónico o enlaces reutilizables.  

En muchos incidentes documentados, la falta de validaciones adicionales permitió a los atacantes restablecer contraseñas sin posesión real de la cuenta.  

### Buenas prácticas
* Enviar enlaces de recuperación con expiración corta (por ejemplo, 10–15 minutos).  
* Incluir un identificador único y de un solo uso en cada enlace.  
* Requerir la confirmación de un segundo factor (SMS, TOTP o WebAuthn) antes del restablecimiento.  
* Invalidar los enlaces inmediatamente después de su uso.  
* Notificar al usuario principal sobre cualquier intento de recuperación.  

## Tiempo de vida de sesiones/tokens
La duración de las sesiones y tokens define cuánto tiempo un usuario puede interactuar sin volver a autenticarse. Un tiempo excesivo incrementa el riesgo de secuestro de sesión; uno demasiado corto puede afectar la experiencia del usuario.  
El equilibrio depende del tipo de aplicación, del nivel de sensibilidad de los datos y del contexto de uso.  
El idle timeout cierra sesiones por inactividad, mientras que el absolute timeout las finaliza tras un periodo máximo, sin importar la actividad.  

**Los tokens también pueden definirse con tiempos de expiración (exp) y políticas de renovación mediante refresh tokens.**

![D](/img/m5/ssdlc_m5_life_time_sess.png)

Para equilibrar seguridad y experiencia de usuario:
* Usar idle timeout para cerrar sesiones inactivas.  
* Usar absolute timeout para impedir sesiones prolongadas.  
* Evitar tiempos de expiración largos en JWT (exp corto).  
* Combinar refresh tokens + rotación segura en apps de larga vida.  
* Cerrar sesión automáticamente en contextos críticos (banca, salud).  
* Sincronizar expiración de sesiones cuando existen múltiples servicios.  


<!-- Refs -->
[icono]: /img/external-link.svg
[ref1]: /docs/modulo/modulo5/tkn
[ref2]: /docs/modulo/modulo5/back
[ref3]: /docs/modulo/modulo5/same_site
[ref4]: /docs/modulo/modulo5/meth-http
[ref5]: /docs/modulo/modulo5/double-conf
[ref6]: /docs/modulo/modulo5/tokn-cycle
