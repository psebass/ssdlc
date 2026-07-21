---
sidebar_position: 11
title: Seguridad
slug: /modulo/modulo5/sec
description: Controles
keywords: [procesos, autenticación, autorización, sesiones]
tags: [autenticación, autorización, sesiones]
---


[Volver](/docs/modulo/modulo5/)
## Seguridad
La seguridad en el acceso a los sistemas digitales constituye uno de los pilares centrales del desarrollo seguro. Toda aplicación, ya sea web, móvil o de escritorio, debe implementar mecanismos que permitan identificar al usuario, verificar su identidad y determinar qué operaciones puede realizar dentro del sistema.  
Estos tres procesos -autenticación, autorización y gestión de sesiones- se encuentran estrechamente interconectados.  

## Autenticación
Es el proceso de verificar que una entidad (persona, sistema o servicio) es quien dice ser. En la práctica, esto se traduce en la solicitud de credenciales que pueden ser una contraseña, un certificado digital, un token o incluso un factor biométrico.  

## Autorización
Consiste en determinar qué acciones tiene permitidas esa entidad una vez autenticada. No basta con saber quién es el usuario; el sistema debe evaluar qué recursos puede consultar, modificar o eliminar según los permisos establecidos.  

## Sesión
Actúan como el vínculo entre el usuario autenticado y el servidor. Dado que el protocolo HTTP es sin estado, las sesiones permiten mantener la identidad del usuario a lo largo de múltiples solicitudes.  
Un sistema seguro debe garantizar que la sesión sea única, no reutilizable, y que los datos asociados a ella no puedan ser interceptados ni manipulados por terceros. Esto implica el uso de cookies seguras, tokens firmados y estrategias de expiración controlada. 

## Buenas Prácticas
* Implementar autenticación sobre canales cifrados (HTTPS/TLS).  
* Rotar los tokens de sesión periódicamente y eliminarlos tras el cierre de sesión.  
* Usar cookies con atributos Secure, HttpOnly y SameSite.  
* Registrar intentos fallidos de autenticación y monitorear patrones sospechosos.  
* Asegurar que los mecanismos de autorización sean centralizados y revisados.

## C1 - Implementación de control de acceso
El control de acceso regula la relación entre los usuarios y los recursos del sistema.  
Su objetivo es garantizar que cada acción esté debidamente autorizada y que no exista posibilidad de manipular el flujo de permisos para acceder a información o funciones restringidas.  

Existen varios modelos de control de acceso.  
Los más comunes son:  
* `Control de Acceso Discrecional (DAC)`: los propietarios de los recursos deciden quién puede acceder.  
* `Control de Acceso Basado en Roles (RBAC)`: los usuarios se agrupan por roles (administrador, analista, lector), y los permisos se asignan a los roles en lugar de hacerlo individualmente.  
* `Control de Acceso  Basado en Atributos (ABAC)`: las decisiones de acceso se toman en función de atributos del usuario, del recurso y del contexto (por ejemplo, hora, ubicación o nivel de riesgo).  
* `Control de Acceso Basado en Políticas (PBAC)`: utiliza políticas lógicas expresadas en lenguajes como Rego (OPA) para aplicar reglas complejas y auditar decisiones.  

**La implementación segura del control de acceso exige coherencia.**  
Es un error frecuente confiar solo en la interfaz de usuario o en el cliente para limitar las operaciones, ya que estas pueden ser manipuladas fácilmente. Las verificaciones deben realizarse siempre del lado del servidor.  

## C7 - Protección de identidades digitales
Tu identidad digital representa la suma de atributos que te identifican en un sistema:  
nombre de usuario, correo, credenciales, huellas de comportamiento, entre otros. La gestión adecuada de esa identidad es esencial para prevenir fraudes, suplantaciones y filtraciones de datos.  
La protección de identidades implica garantizar la `integridad`, `confidencialidad` y `disponibilidad` de los datos personales, además de verificar que los procesos de alta, modificación y baja de usuarios se realicen bajo controles adecuados.  
<br></br>
Entre las amenazas más frecuentes se encuentran el robo de credenciales, los ataques de ingeniería social, el uso de contraseñas expuestas y las vulnerabilidades en los mecanismos de recuperación de cuentas.  

### Tres niveles de protección de identidades digitales
La protección de identidades funciona en capas. Cada nivel aborda un punto distinto del ciclo de autenticación y administración de usuarios, y juntos conforman un sistema que reduce la posibilidad de suplantación, accesos indebidos y filtraciones.  

### El primer nivel: la autenticación
Aquí se busca verificar que la persona que intenta acceder es realmente quien dice ser.  
Para lograrlo se combinan credenciales fuertes, autenticación multifactor y mecanismos que impidan ataques conocidos como el relleno de credenciales o la reutilización de contraseñas filtradas.  
Este nivel se sostiene en políticas claras de longitud, complejidad y expiración de contraseñas, además de la integración con factores adicionales como tokens, aplicaciones de autenticación o biometría.  

### El segundo nivel: gestión continua de identidades y accesos  

No basta con autenticar correctamente: también se debe controlar qué puede hacer cada usuario dentro del sistema. Esto implica aplicar el principio de mínimo privilegio, revisar permisos periódicamente, restringir accesos temporales y evitar que cuentas antiguas o inactivas permanezcan habilitadas.  
La asignación, modificación y baja de usuarios deben ejecutarse bajo procesos auditables que reduzcan el riesgo de accesos indebidos por errores administrativos o malas prácticas internas.  

### El tercer nivel: protección y el manejo seguro de los datos asociados a la identidad  

Las credenciales y secretos deben almacenarse mediante algoritmos robustos de hashing y cifrado, evitando funciones vulnerables o configuraciones débiles.  
Los sistemas que recuperan cuentas, reinician contraseñas o validan la propiedad de un correo electrónico deben estar diseñados sin pistas que faciliten ataques de ingeniería social.  
A esto se suma la protección de tokens de sesión, el uso de canales cifrados y la rotación periódica de claves y secretos para disminuir la exposición ante una eventual filtración.  

Estos tres niveles funcionan como un mecanismo de defensa escalonado.  
Cuando uno falla o es comprometido, los otros dos reducen la probabilidad de que el atacante pueda usar la identidad para acceder, moverse lateralmente o escalar privilegios dentro del sistema.  

<div class="card">
    <div class="card-body">
        <h3 class="card-title">En definitiva...</h3>
        <p class="card-text">Estos tres niveles funcionan como un mecanismo de defensa escalonado.  
Cuando uno falla o es comprometido, los otros dos reducen la probabilidad de que el atacante pueda usar la identidad para acceder, moverse lateralmente o escalar privilegios dentro del sistema.  </p>
    </div>
</div>

## Autenticación fuerte y MFA
La autenticación fuerte busca elevar el nivel de confianza en el proceso de verificación de identidad mediante el uso de múltiples factores. Tradicionalmente, la autenticación se basaba en un único elemento -una contraseña-, lo que resulta insuficiente ante ataques de phishing, keyloggers o reutilización de credenciales.  

La autenticación multifactor (MFA) combina al menos dos categorías distintas:  
1. `Algo que sabes` (contraseña, PIN).  
2. `Algo que tienes` (token, dispositivo, llave física).  
3. `Algo que eres` (biometría).  

Cada factor debe ser independiente y resistente a ataques. Por ejemplo, usar un SMS y una contraseña no garantiza alta seguridad, ya que los mensajes pueden ser interceptados o clonados. En cambio, una llave FIDO2 o una app TOTP con validación por hardware ofrece mayor protección.  

### Códigos OTP
Los sistemas modernos de autenticación integran mecanismos adicionales que fortalecen la verificación de identidad y reducen la exposición frente a ataques frecuentes. Uno de los más utilizados es el código OTP, un “One-Time Password” o contraseña de un solo uso.  
A diferencia de una clave estática, un OTP se genera dinámicamente y expira en pocos segundos, lo que evita su reutilización en caso de filtración.   

Este tipo de códigos suele generarse mediante:  
* Aplicaciones `TOTP` basadas en el tiempo.  
* Llaves `FIDO2`, que mantienen el secreto fuera del alcance del atacante.  

<div class="card">
    <div class="card-body">
        <p class="card-text">Su finalidad es impedir que una credencial robada
resulte suficiente para acceder a una cuenta.</p>
    </div>
</div>

### SSO
En entornos corporativos, un usuario gestiona muchos sistemas, y mantener múltiples contraseñas incrementa tanto el riesgo de malas prácticas como la superficie de ataque.  
SSO permite autenticarse una sola vez a través de un proveedor confiable (Google Workspace, Microsoft 365, etc.) y extender esa sesión a otros servicios internos o externos.  

Esto reduce la fricción para el usuario y mejora la seguridad al centralizar la autenticación en un punto que puede ser protegido con:  
* Políticas estrictas.  
* MFA obligatorio.  
* Monitoreo continuo.  

Su aporte principal es disminuir la cantidad de credenciales expuestas y facilitar revocaciones rápidas en caso de compromiso. Así también como facilita la administración y sincronización con herramientas HHRR para las bajas automáticas por desvinculaciones.   

![D](/img/m5/ssdlc_m5_oa.png)  

## Vulnerabilidades o ataques típicos de identidad
### ID de sesiones débiles
El identificador de sesión es la pieza que enlaza la autenticación inicial con todas las operaciones posteriores.  
Si este identificador es predecible, reutilizable o mal protegido, un atacante puede secuestrar la sesión y asumir tu identidad.  

Las sesiones débiles surgen de prácticas inseguras como:   
* Generar IDs con funciones no criptográficas (por ejemplo, incrementales).
* No invalidar sesiones antiguas tras el cierre de sesión o cambio de contraseña. La sesión debe expirar al momento del cierre.  
* Usar cookies sin las banderas Secure y HttpOnly, que son atributos que protegen el ID de sesión. Secure obliga a que la cookie solo se envíe por conexiones cifradas (HTTPS), evitando que el identificador viaje en texto plano. HttpOnly impide que la cookie sea accesible desde JavaScript, lo que reduce el riesgo de robo del ID en ataques XSS.  
* Mantener tiempos de vida excesivos sin mecanismos de expiración por inactividad o que no tengan vencimiento.  

Ejemplos de IDs de sesión débiles:  
Un ID de sesión débil es aquel que puede ser adivinado, calculado o predecido sin necesidad de vulnerar el sistema. Esto ocurre cuando los identificadores se generan de manera incremental, secuencial o sin una función criptográfica adecuada.  
Ejemplos claros de IDs vulnerables son:  
* `id: 1 → id: 2 → id: 3`  

Representa un patrón estrictamente secuencial.  
Si un atacante conoce su propio ID (por ejemplo, id=25), puede intentar acceder a id=26 o id=24 para secuestrar sesiones activas de otros usuarios.  
`session_1001 → session_1002 → session_1003`  

Un patrón predecible convierte el ID en un objetivo directo. Un atacante solo necesita observar un identificador válido y generar el siguiente en la secuencia.  
Si la aplicación no implementa controles adecuados, podrá apropiarse de la sesión de otra persona sin necesidad de contraseñas ni exploits avanzados.  

![D](/img/m5/ssdlc_m5_snap.png)

## Fuerza bruta
Los ataques de fuerza bruta consisten en probar múltiples combinaciones de credenciales hasta encontrar una válida.  
Estos intentos pueden ser automatizados, distribuidos desde distintas IP, o dirigidos utilizando listas de contraseñas filtradas en ataques de _credential stuffing_.  

Muchas herramientas de software libre permiten automatizar miles de intentos por minuto, como:  
* **Hydra**
* **OWASP ZAP**
* **Burp Suite: módulo Intruder**

Esto vuelve estos ataques accesibles incluso para actores **sin conocimientos avanzados**.  
En menor escala, también pueden ejecutarse de manera manual, probando variantes típicas según el perfil del objetivo.  

Es común que un atacante comience con combinaciones previsibles como:  
* ` admin / admin`
* ` admin / password`
* ` admin / 123456`
* ` contraseñas frecuentes` obtenidas de filtraciones públicas. Incluso sin automatización, un sistema sin controles mínimos puede ser comprometido rápidamente si permite intentos ilimitados.  

<div class="card">
    <div class="card-body">
        <p class="card-text">Estos ataques se vuelven posibles cuando existen
                             contraseñas débiles, ausencia de límites de
                             intentos o falta de mecanismos que ralenticen o
                             bloqueen accesos sospechosos.</p>
    </div>
</div>

Sin un conjunto de protecciones adecuadas, incluso credenciales robustas pueden verse expuestas frente a la automatización de pruebas sistemáticas.  
Para mitigarlos desde el desarrollo, se aplican controles que eleven el costo del ataque y limiten la capacidad de prueba del adversario.  

Los mecanismos más efectivos incluyen:  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> `Rate limit`</span>: para frenar la frecuencia de intentos. Esto establece un umbral de tiempo dentro de los cuales se puede aceptar la siguiente petición. En caso de que llegue una petición que viole ese umbral, la petición se rechaza.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> `CAPTCHA`</span>: en flujos sensibles para filtrar automatizaciones. Es decir que el intento de acceso se está efectuando efectivamente por un humano.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> `Política de contraseñas fuertes`</span> para impedir claves triviales.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> `MFA`</span> como segundo factor independiente.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> `Validación por geolocalización`</span> para detectar accesos atípicos. Ej. Si las oficinas en donde trabajan los empleados de una organización se encuentran en Londres. No debería haber accesos permitidos desde Chile.   
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> Bloqueo temporal de cuentas</span> tras varios intentos fallidos. Aqui se establece un umbral de cuantos intentos están permitidos antes de tomar la acción de bloquear la cuenta.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> Tiempos de espera progresivos</span> 
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> Alertas de actividad inusual.</span>  

Estos controles reducen la velocidad del atacante y permiten detectar y reaccionar ante patrones anómalos.  

Como complemento, ciertos componentes de arquitectura también ayudan a contener ataques de fuerza bruta a nivel de infraestructura.  
Mecanismos como:  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> WAF (Web Application Firewall)</span> para detectar patrones maliciosos. Trabaja en capa 7 del modelo OSI.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> CDN (Content Delivery Network)</span> que filtran tráfico sospechoso antes de llegar a la aplicación.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> Balanceadores con políticas anti-abuso</span>: Distribuye el tráfico.  
* <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> SIEM</span>: Sistemas de detección de anomalías que identifican comportamientos atípicos.  

Cuando estos mecanismos trabajan juntos, la superficie de ataque disminuye y el esfuerzo necesario para comprometer una cuenta aumenta considerablemente.  

## Captchas inseguros
Los **CAPTCHAs** fueron diseñados para distinguir entre humanos y bots, pero su efectividad disminuyó con el avance de la inteligencia artificial. Muchos sistemas automáticos modernos pueden resolver desafíos simples en segundos, y existen servicios públicos capaces de resolver CAPTCHAs por centavos.
Cuando un CAPTCHA es débil o mal integrado, deja de cumplir su función como mecanismo de defensa y puede comprometer la integridad del sistema sin agregar protección real.  

<span className="badge badge--success">La seguridad de un CAPTCHA no depende únicamente de su dificultad visual, sino también de la lógica utilizada para validarlo.</span>  

Los errores más comunes ocurren cuando la verificación se realiza del lado del cliente, cuando el desafío no se renueva adecuadamente o cuando el servidor acepta respuestas reutilizadas.  
Este tipo de fallas permite que un atacante automatice intentos sin necesidad de romper la imagen o el reto.  

### Integración segura
Una integración segura debe garantizar que el servidor valide cada respuesta en forma única y que cada desafío tenga un tiempo de vida limitado.  
El reto debe generarse en el servidor, enviarse de manera protegida y verificarse contra una clave asociada a la sesión. Renovar el desafío tras cada intento evita que un bot reprocese una misma respuesta. Además, la solución nunca debe ser manipulable o visible desde JavaScript.  
En 2025, los métodos más robustos combinan señales de comportamiento, riesgo y análisis en tiempo real.  


Entre las soluciones consideradas seguras se encuentran:  
* Sistemas invisibles con análisis de interacción.  
* Retos basados en FIDO.  
* CAPTCHAs de lógica no trivial.  
* Servicios con modelos avanzados de detección de bots.  

Los CAPTCHAs puramente visuales o basados en texto deformado fueron ampliamente superados y ya no se recomiendan como mecanismo primario.  
Para complementar estas medidas, es importante proteger el propio CAPTCHA contra abuso. Esto implica:  
* Aplicar límites de uso.  
* Impedir que terceros consuman el endpoint.  
* Asociar cada reto a una sesión o token del servidor.  
La respuesta nunca debe aceptarse si no pertenece al desafío generado por el backend o si no coincide con el estado interno almacenado.  

## JWT, OAuth2, scopes y claims

El uso de tokens como mecanismo de autenticación sin estado ha transformado el modo en que las aplicaciones gestionan sesiones. El formato más extendido es el **JSON Web Token (JWT)**, que permite transportar información firmada entre dos partes sin necesidad de almacenar datos en el servidor (stateless).  

Un JWT contiene tres secciones:
* **`Header`** (encabezado).  
* **`Payload`**(carga útil).  
* **`Signature`** (firma).  

En la carga se incluyen los claims, que son declaraciones sobre el usuario o el contexto (por ejemplo: sub, exp, aud, role).  
El funcionamiento de un JWT es stateless, porque una vez emitido el servidor no guarda información sobre él.   

Cuando el cliente envía el token en una solicitud, el servidor:  
* Verifica la firma.
* Valida los claims críticos.
    * Si el token no está vencido (exp).
    * Si fue emitido por quien corresponde (iss).
    * Si está dirigido al servicio correcto (aud).
    * Si no se reutiliza antes del tiempo permitido (nbf).
    * Si todo es válido, la solicitud se acepta sin consultar un almacén de sesiones. Esto reduce carga en el servidor y permite escalar aplicaciones distribuidas sin sincronizar información entre nodos.  

![D](/img/m5/ssdlc_m5_jwt.png)  

La seguridad de un JWT depende de validar correctamente:  
* `La firma`.
* `El algoritmo`.
* `Los claims críticos`.
Si el servidor acepta tokens sin verificar la firma o permite el algoritmo none, la autenticación se vuelve trivialmente vulnerable porque cualquiera podría generar un token falso.  

![D](/img/m5/ssdlc_m5_oauth2.png)




























