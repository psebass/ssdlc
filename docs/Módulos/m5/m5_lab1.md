---
sidebar_position: 13
title: Laboratorio 1
slug: /modulo/modulo5/m5lab1
---

[Volver][ref1]

## Endurecimiento de autenticación (DVWA-Brute Force)  
Identificar debilidades del módulo de autenticación frente a intentos repetidos, registrar evidencias con OWASP ZAP como herramienta de observación y proponer correcciones de código y medidas operativas para mitigarlas.  

### Consignas
1. Iniciar DVWA y configurar el nivel de seguridad en Low.  
2. Ir al módulo Brute Force. Probar primero con un usuario legítimo (solo para observar el resultado) y anotar la respuesta.
3. Probar una contraseña débil (por ejemplo: 123456) para el mismo usuario y observar cómo cambia la respuesta.  
4. Bajo supervisión del docente, simular varios intentos fallidos consecutivos y observar si la aplicación aplica bloqueo, delay o CAPTCHA; registrar peticiones y respuestas con OWASP ZAP (modo observación).  
5. Analizar el código del nivel Low con AI (low.php o el fichero que procesa el login), indicar líneas/fragmentos relevantes y explicar por qué la lógica actual permite múltiples intentos sin protección.  

---

## Solución

1. Iniciar DVWA y configurar el nivel de seguridad en Low.  
a. Abre el navegador y ve a http://localhost/dvwa
b. Ingresa las credenciales por defecto:  
`Usuario: admin`  
`Contraseña: password`  
b. Ve al menú izquierdo, opción DVWA Security, y selecciona el nivel Low.  
c. Explicación: Low deshabilita prácticamente todas las validaciones, lo que permite ver la aplicación en su estado más vulnerable.  
2. Ir al módulo **Brute Force**. Probar primero con un usuario legítimo (solo para observar el resultado) y anotar la respuesta.  
a. Realizar un intento de login con credenciales válidas (solo para observar).  
b. Qué verificar en la respuesta: Código HTTP (200/302), contenido (texto “Welcome”, “Logout” u otro indicador de sesión activa), y cookies emitidas (nombre, valor, flags si aparecen).  

Para acceder a la lista de usuarios intento ver la tabla de mysql de usuarios dentro del contenedor corriendo con Podman.  
Accedo al contenedor e inicio sesión en MySQL:  
![D](/img/m5/ssdlc_m5_lab1_podman1.png)  
Si pide contraseña, presionar _Enter_ o colocar `root` o `app`   

![D](/img/m5/ssdlc_m5_lab1_podman2.png)  

Ejecutar la consulta:  
```mysql title="mysql"
USE dvwa;
SELECT user, password FROM users;
```

![D](/img/m5/ssdlc_m5_lab1_podman3.png)

Obtenidos, intentamos el acceso, por ejemplo con _admin_:  

![D](/img/m5/ssdlc_m5_lab1_podman4.png)

c. Repite , pero esta vez captura la respuesta: la página posterior al login o el mensaje que indica éxito.  
d. En OWASP ZAP (modo observación) guardar la petición POST y la respuesta HTTP correspondiente (request + response).  

![D](/img/m5/ssdlc_m5_lab1_podman5.png)

OWASP-ZAP  
<span style={{ fontSize: '10px' }}>(Lanzar el navegador Firefox desde el acceso superior derecho en la UI)</span>  
![D](/img/m5/ssdlc_m5_lab1_podman6.png)

Resultado:  

![D](/img/m5/ssdlc_m5_lab1_podman7.png)

Break:  

![D](/img/m5/ssdlc_m5_lab1_podman8.png)  
![D](/img/m5/ssdlc_m5_lab1_podman9.png)  

3. Probar una contraseña débil (por ejemplo: 123456) para el mismo usuario y observar cómo cambia la respuesta.  
a. Captura de la página tras intento con contraseña débil (mensaje mostrado).  
b. En ZAP: petición POST y respuesta HTTP para este intento.  
c. Qué comparar:  
    * ¿Cambia el texto presentado al usuario?  
    * ¿Hay diferencias en código HTTP?  
    * ¿Cambia la longitud del body?  
    * ¿Se setea alguna cookie distinta?  
d. Anotar cualquier diferencia que permita distinguir “usuario existe / no existe” o “contraseña correcta / incorrecta”.  




4. Bajo supervisión del docente, simular varios intentos fallidos consecutivos y observar si la aplicación aplica bloqueo, delay o CAPTCHA; registrar peticiones y respuestas con OWASP ZAP (modo observación).  
a. Capturas de ZAP que muestren el request y las respuestas de varios intentos (mínimo 3–6 manuales, según pauta docente).  
b. Captura de la página tras los intentos (¿hay bloqueo, mensaje distinto, CAPTCHA o delay?).  


<!-- Refs -->
[ref1]: /docs/modulo/modulo5/