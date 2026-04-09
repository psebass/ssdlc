---
sidebar_position: 7
title: Validación de entradas seguras
description: Control de entradas.
keywords: [C3]
tags: [Validación de Entradas, Ciberseguridad, Desarrollo Seguro, OWASP Juice Shop,
Metodología VAPT,Inyección SQL,XSS (Cross-Site Scripting),Manejo de Excepciones,
Listas Blancas,Python/FastAPI]
---

# Validación de entradas seguras
## C3
Validar entradas significa verificar que los datos proporcionados por el usuario, una API o cualquier fuente externa cumplan con los requisitos esperados antes de ser procesados.  
Es una práctica fundamental tanto en aplicaciones cliente (frontend) como en servidores (backend).  

### Los objetivos principales son:
● Prevenir fallos de ejecución por tipos o formatos incorrectos.  
● Evitar ataques de inyección (por ejemplo, SQL Injection, Cross-Site Scripting o comandos de sistema).  
● Mantener la integridad de la base de datos y la coherencia de la aplicación.  

La validación puede dividirse en dos niveles:  
1. Validación sintáctica: verifica que el formato del dato sea correcto (por ejemplo, que un correo contenga <span style= {{ color: 'orange', fontWeight: '700' }}>“@”</span> o  que un número no tenga letras).  
2. Validación semántica: comprueba que el dato tenga sentido en el contexto del negocio (por ejemplo, que una fecha no sea futura en un sistema de registro de nacimientos).  

**Buenas prácticas**
● Validar siempre en el servidor, incluso si también se valida en el cliente.  
● Establecer listas blancas (whitelists) en lugar de listas negras, es decir, definir lo que sí se acepta.  
● Emplear expresiones regulares solo cuando sean comprensibles y mantenibles.  
● En frameworks modernos, aprovechar validadores integrados (como pydantic en Python o class-validator en Node.js).  

### Manejo de excepciones
Las excepciones son eventos que interrumpen el flujo normal de ejecución de un programa. Un manejo adecuado permite responder de manera controlada a situaciones imprevistas (errores de conexión, divisiones por cero, datos corruptos, etc.) sin detener la aplicación. El principio clave es anticipar el error y manejarlo con elegancia. En lugar de  dejar que el programa falle abruptamente, se debe capturar la excepción, registrar el evento y, si es posible, ofrecer una alternativa o notificación útil al usuario.  


## Confianza y validación de datos
Toda aplicación recibe datos del exterior: formularios web, APIs, archivos, cabeceras HTTP, entre otros. Desde el punto de vista de la seguridad, ningún dato externo debe considerarse confiable hasta ser validado o sanitizado.  
Los ataques más comunes (inyecciones SQL, XSS, manipulación de comandos, deserialización insegura) se originan en el manejo incorrecto de entradas no confiables.  

:::warning cuidado
“Todo dato que proviene del usuario, del navegador o de otro sistema externo debe tratarse como malicioso hasta comprobar lo contrario”.
:::

**Ejemplo conceptual**  
Si un usuario ingresa su nombre en un formulario, podría enviar lo siguiente... <code style={{ userSelect: 'none' }}>{"<script>alert('hack');</script>"}</code>.  
Sin validación, ese dato se almacenará y ejecutará luego en el navegador de otro usuario (ataque XSS).


## Principios de validación de entradas
Existen dos enfoques principales:
**Listas blancas (whitelisting)**: aceptar solo lo que se considera válido.  
Ejemplo: solo letras, espacios y tildes en un nombre.  

**Listas negras (blacklisting)**: bloquear patrones conocidos de ataque.  
Ejemplo: eliminar <code>{"<script> o DROP TABLE"}.</code>  
Este enfoque es menos seguro porque no cubre variantes nuevas.  

:::tip
Mejor práctica: siempre validar mediante listas blancas y tipado estricto.
:::

### Ejemplo práctico en Python (FastAPI)
```python title="Python"
from fastapi import FastAPI, Query


app = FastAPI()

@app.get("/usuario")
def obtener_usuario(nombre: str = Query(..., min_length=2, max_length=30,
    regex="^[a-zA-ZáéíóúÁÉÍÓÚ ]+$")):
     return {"nombre_valido": nombre}
``` 

## Herramientas para práctica de desarrollo y seguridad
### OWASP Juice Shop como entorno de práctica
El proyecto OWASP Juice Shop es una aplicación web intencionalmente vulnerable desarrollada por la comunidad de OWASP. Está diseñada para entrenar habilidades en pruebas de penetración (VAPT) y comprender cómo las fallas comunes en validación y manejo de excepciones pueden derivar en vulnerabilidades reales.  

**Propósito**
Explorar vulnerabilidades reales en un entorno controlado para comprender cómo los errores de validación se traducen en riesgos concretos de seguridad.  

Se puede acceder a la versión web desde: https://juice-shop.herokuapp.com (o visitar el sitio oficial de OWASP Juice Shop para otros entornos disponibles: https://owasp.org/www-project-juice-shop/).  

| Vulnerabilidad | Causa principal | Mitigación recomendada |
| --- | --- | --- |
| SQL Injection | Concatenación de strings en consultas | Parametrización y validación |
| XSS | Falta de encoding en la salida | Escapar contenido y CSP |
| OS Injection | Comandos concatenados con entradas | Separar argumentos / sandbox |
| File Upload | Falta de validación de archivo | Extensiones permitidas, validación MIME |
| XXE | Parser XML inseguro | Desactivar entidades externas |
| LDAP Injection | Concatenación de filtros LDAP | Escapar caracteres y usar APIs seguras |
| Deserialización insegura | Objetos sin validación |  Validar estructura o usar formatos simples |

### ¿Por qué VAPT y qué busca resolver?
Las aplicaciones modernas son cadenas de componentes: frontends, APIs, bases de datos, servicios externos y ubicaciones de almacenamiento. Cada componente añade superficie de ataque.  
El objetivo de VAPT no es “hackear por hackear”, sino identificar debilidades reales que puedan afectar la confidencialidad, integridad o disponibilidad de los activos críticos.  

La metodología VAPT organiza el trabajo en fases predecibles (planeamiento, reconocimiento, enumeración, explotación controlada, reporte y remediación).  
Esto permite transformar hallazgos técnicos en acciones priorizadas por negocio. Sin una metodología reproducible, los hallazgos quedan dispersos y las correcciones son parciales.  

## Metodología práctica (paso a paso)

A continuación se describe la secuencia
operativa mínima que debe seguir un equipo al
planear y ejecutar una prueba:
1. Planeamiento y alcance
● Identificar activos, dominios, IPs, versiones, cuentas de prueba y ventanas de ejecución.  
● Firmar Rules of Engagement (ROE): qué está permitido, horarios y contactos de emergencia.  

2. Reconocimiento
● Recolección pasiva: WHOIS, subdominios, headers, tecnologías usadas.  
● Recolección activa: escaneo de puertos, fingerprinting de aplicaciones.  

3. Enumeración
Listar endpoints, parámetros, recursos expuestos y posibles credenciales por defecto.  

4. Análisis de vulnerabilidades
● Ejecutar SAST y SCA (estático y composición de dependencias).  
● Ejecutar DAST y pruebas manuales para confirmar falsos positivos.  

5. Explotación controlada
● En entornos permitidos, explotar para confirmar impacto (ej.: obtener credenciales de prueba, leer archivos no sensibles).  
● No hacer escaladas de privilegio que afecten producción sin plan previo.  

6. Post-explotación y evaluación de riesgo
Determinar alcance real del compromiso (datos accesibles, posibilidad de movimiento lateral).  

7. Reporte y remediación
● Entregar informe con evidencia, pasos reproducibles, CVSS sugerido y recomendaciones técnicas.  
● Planificar retest tras aplicar fixes.  

### Laboratorio seguro: montaje y buenas prácticas
Para aprender y validar técnicas, usar plataformas intencionalmente vulnerables: OWASP Juice Shop y DVWA. Montarlas es sencillo con Docker; lo importante es la configuración de red y la contención.  

#### Recomendaciones prácticas:
● Ejecutar en una VM o contenedor con red aislada (no bridged a Internet).  
● Hacer snapshot antes de cada ejercicio para volver al estado limpio.  
● Mantener registro de comandos y resultados (scripted logs).  
● Usar herramientas de monitoreo de red (tcpdump, Wireshark) para estudiar tráfico.  

#### Instalación rápida (ejemplo):
● docker run --rm -p 3000:3000 bkimminich/juice-shop (Juice Shop)  
● docker run --rm -p 80:80 vulnerables/dvwa (DVWA, confirmar imagen disponible)  

## Herramientas y su rol (qué usar y para qué)
En un programa de pruebas conviene combinar herramientas automáticas y revisión manual. Las principales categorías y ejemplos:  
● **SAST (análisis estático)** — detecta patrones inseguros en el código: Semgrep, Bandit, SonarQube.  
● **DAST (análisis dinámico)** — prueba la aplicación corriendo: OWASP ZAP, Burp Suite.  
● **SCA (composición de software)** — detecta vulnerabilidades en librerías: Snyk, Dependabot, Trivy.  
● **Fuzzing / Test generation** — herramientas que generan inputs anómalos.  
● **Scanners de contenedores / imágenes** — Trivy, Clair.  
● Monitoreo / SIEM — ELK, Splunk, Datadog (para correlación post-prueba).  

:::tip
No confiar exclusivamente en una sola herramienta: combinar reduce falsos negativos.
:::

## Datos confiables vs. no confiables: ¿cómo detectarlos?

**Datos confiables**
● Provienen de fuentes internas o validadas (bases de datos, APIs autenticadas, formularios controlados).  
● Han pasado por un proceso de validación de tipo, formato y contenido.  
● Se manejan dentro de un contexto seguro (sesión autenticada, conexión cifrada).  
● No permiten modificación directa por el usuario final sin control.  

**Datos no confiables**
● Proceden de fuentes externas o desconocidas (inputs de usuario, parámetros de URL, archivos subidos, APIs de terceros).  
● No se someten a verificación de tipo o rango antes de procesarse.  
● Pueden ser manipulados intencionalmente para provocar errores o ejecutar código malicioso.  

### Cómo detectarlos
● Analizar el origen del dato: ¿viene del cliente o del servidor?  
● Revisar si se aplica validación o sanitización antes del uso.  
● Usar herramientas de análisis estático o dinámico (SAST/DAST) para identificar flujos de datos sin control.  
Todo dato externo debe considerarse no confiable hasta ser validado. La validación no es desconfianza, es defensa.  

## IA aplicada a desarrollo
Cada vez más aplicaciones y servicios incorporan modelos de lenguaje (LLM) como parte de sus funcionalidades: asistentes inteligentes, generadores de código, validadores automáticos o sistemas de soporte.  
Estas integraciones amplían las capacidades del software, pero también abren nuevos vectores de riesgo.  

### Aspectos clave de seguridad al integrar IA
Validación de datos de entrada y salida  
● Los modelos procesan texto libre, lo que puede incluir instrucciones maliciosas o datos sensibles.  
● Es indispensable filtrar y sanitizar toda la información antes de enviarla al modelo y validar las respuestas antes de usarlas en el sistema.  

Control de acceso y autenticación  
● Usar tokens seguros y rotación periódica de claves API.  
● Limitar permisos a lo estrictamente necesario para evitar accesos no autorizados.  

Protección de datos sensibles  
● Evitar enviar información personal, credenciales o datos confidenciales al modelo.  
● Implementar anonimización o enmascaramiento de datos.  

Registro y trazabilidad  
Mantener logs controlados de las interacciones con el modelo para auditoría y detección de abusos.  
Integrar IA no elimina la necesidad de validar y proteger los datos: la amplifica.  
Todo flujo que involucre un modelo debe tratarse como un canal externo no confiable hasta ser validado.  

## Inyección de código o de comandos
La inyección ocurre cuando una aplicación recibe datos externos y los interpreta como instrucciones ejecutables en lugar de tratarlos como texto.  
Esto sucede por una falta de validación o sanitización de las entradas, lo que permite al atacante alterar el comportamiento del sistema.  

### Tipos comunes de inyección
**Inyección de código HTML**
Permite insertar etiquetas o scripts en formularios o campos de texto para modificar la estructura de una página.  

:::note Ejempo:
Cambiar el contenido visual de un sitio o insertar formularios falsos.
:::

### Inyección XSS (Cross-Site Scripting)
Consiste en ejecutar código JavaScript malicioso dentro del navegador de otros usuarios.  

:::note Ejemplo:
Robar cookies, secuestrar sesiones o mostrar contenido falso.
:::

### Inyección SQL
Aprovecha entradas no validadas para ejecutar consultas no autorizadas en la base de datos.  

:::note Ejemplo:
Acceder o borrar información confidencial mediante comandos SQL como ' OR 1=1--.
:::

## Sanitización de entradas y salida (Output Encoding)
Sanitizar significa limpiar o neutralizar los datos que entran o salen de una aplicación para impedir que contengan código o comandos ejecutables. El objetivo es garantizar que toda información se interprete solo como dato, nunca como instrucción.  

### ¿Por qué es necesaria?
Los datos provenientes de usuarios o fuentes externas pueden incluir etiquetas HTML, scripts o caracteres especiales que, si no se procesan correctamente, pueden transformarse en ataques como inyecciones o Cross-Site Scripting (XSS).  
La sanitización elimina ese riesgo asegurando que los datos se traten como texto plano.  

### Cómo se realiza (en cualquier lenguaje)
Aunque la sintaxis cambia según el lenguaje, la lógica es la misma:  
● Eliminar o escapar caracteres peligrosos (`<`, `>`, `"`, `'`, `&`, `/`).  
● Normalizar el formato de entrada (por ejemplo, quitar espacios o saltos de línea maliciosos).  
● Codificar la salida antes de mostrarla en el navegador, logs o bases de datos (HTML entities, UTF-8, etc.).  
● Usar librerías o frameworks seguros, ya que la sanitización manual es propensa a errores.  


### Ejemplos
#### HTML / Frontend:  
Si un usuario ingresa...   
`<script>alert('XSS')</script>`, el sistema debe convertirlo a:  
`&lt;script&gt;alert('XSS')&lt;/script&gt;`. Así, el navegador lo muestra como texto, no lo ejecuta.

#### Bases de datos:
Si se recibe un parámetro `' OR 1=1--`, la aplicación debe escapar comillas y operadores, o mejor aún, usar consultas parametrizadas para que se interprete como texto literal, no como comando SQL.  


## Control de datos del usuario en formularios
Los formularios son el **canal principal de entrada en aplicaciones web**. Se deben implementar validaciones del lado del cliente y del servidor, pero nunca confiar solo en el cliente (JavaScript).  

### Buenas prácticas
● Validar longitud, tipo y formato (email, teléfono, etc.).  
● Evitar campos ocultos con información sensible.  
● Rechazar archivos con extensiones o tamaños no permitidos.  
● Usar librerías de validación: Formik (React), Yup, Express Validator, WTForms (Flask).  

### Ejemplo de validación doble (JS + backend)
Frontend:  
`<input type="email" required pattern="^[^@]+@[^@]+\.[a-z]{2,}$">`  

Backend (Node.js):  
```
import validator from 'validator';
if (!validator.isEmail(req.body.email)) {
 return res.status(400).send('Email inválido'
```

## Control de datos del usuario en API
Las APIs (Interfaces de Programación de Aplicaciones) son uno de los principales puntos de interacción entre usuarios, servicios y sistemas.  
A diferencia de un front-end, donde las validaciones son visibles y dependen del cliente, el control de datos en una API ocurre en el servidor, y su función es garantizar la integridad, autenticidad y coherencia de la información que circula entre aplicaciones.  

### Diferencias clave frente al control en el front-end
**Frontend (cliente)**:  
La validación se realiza para mejorar la experiencia del usuario y evitar errores simples (por ejemplo, formato de correo, longitud de contraseña).  
Sin embargo, estos controles pueden ser manipulados o desactivados desde el navegador o con herramientas externas.  

**API (servidor)**:  
La validación es obligatoria y definitiva. Se debe asumir que todo dato recibido es potencialmente malicioso y verificar su tipo, estructura, permisos y procedencia antes de procesarlo o almacenarlo.


<!-- M301 - Validación ... 35/43-->
### Buenas prácticas de control en APIs
**Autenticación y autorización**
Implementar mecanismos sólidos (JWT, OAuth2.0, API Keys).  
Limitar el acceso a recursos según el rol o nivel del usuario.  

**Validación de entrada**
Comprobar tipos de datos, tamaños máximos, valores permitidos.  
Usar esquemas de validación (por ejemplo, JSON Schema o Pydantic).  

**Control de salida (Output Encoding)**
Evitar incluir datos sensibles en las respuestas.  
Codificar las salidas para prevenir exposición o inyección.  

**Trazabilidad y monitoreo**
Registrar solicitudes, respuestas y errores para detectar patrones de abuso.  

**Una API que recibe datos de registro debe:**
● Validar que el correo tenga formato válido.  
● Sanitizar el campo “nombre” para evitar scripts.  
● Rechazar peticiones sin token válido.  
● Limitar intentos desde la misma IP para prevenir abuso automatizado.  

## Manejo seguro de errores y excepciones
El manejo de errores en una aplicación no solo busca evitar fallos, sino proteger la información sensible que podría ser explotada por un atacante.  
Cada mensaje de error es una posible fuente de datos sobre la estructura interna del sistema, el lenguaje de programación o el motor de base de datos utilizado.  

### ¿Por qué no se debe divulgar errores en detalle?
Cuando un sistema muestra mensajes técnicos directamente al usuario (por ejemplo, “NullPointerException en línea 43” o un “Error de SQL syntax cerca de 'SELECT'”), está revelando información valiosa:  
● Nombre y versión del framework o base de datos.  
● Estructura del código o consultas internas.  
● Rutas de archivos o configuraciones del servidor.  
● Indicios sobre puntos vulnerables (inyección, permisos, configuración).  

:::warning Atención
Un atacante puede usar esa información para planificar un ataque más preciso.
:::


### Buenas prácticas
● Registrar (logging) los errores en el servidor, con toda la información técnica necesaria para el equipo de desarrollo o seguridad.  
● Mostrar mensajes genéricos al usuario final, como: “Ocurrió un error al procesar su solicitud. Inténtelo más tarde.”  
● Clasificar los errores según su nivel de criticidad y contexto, evitando exponer detalles fuera del entorno controlado.  
● Monitorizar y auditar los logs, protegiéndolos con acceso restringido  

### Ejemplo seguro

```python title="Python"
import logging

try:
  user = get_user_data(id)
except DatabaseError as e:
  logging.error(f"Error al acceder a la base de datos: {e}")
  print("No se pudo completar la operación. Por favor, inténtelo más tarde.")
```

El error se registra con detalle, pero el usuario solo recibe un mensaje genérico, evitando exposición de datos internos. Mostrar detalles técnicos a un usuario no autorizado equivale a entregarle un mapa del sistema. Los errores deben ser informativos para el desarrollador, **pero ofuscados para quien podría atacar**.  

## Checklist de validación por capas
| Capa | Validación requerida | Ejemplo / Explicación |
| --- | --- | --- |
| Cliente (UI) | Validar tipos básicos y formato antes de enviar datos al servidor. Mejora la experiencia del usuario, pero no reemplaza la validación del backend. | input type="number" min="1" evita valores inválidos desde la interfaz, pero el servidor debe verificarlo igualmente. |
| Servidor (API) | Aplicar reglas de negocio, tipos, límites y autenticación. Toda la lógica crítica se valida aquí, ya que las solicitudes pueden provenir de clientes no confiables. | Validar con JSON Schema o ORM validation. Ejemplo: un campo “precio” no puede ser negativo, ni un “rol” distinto de los permitidos. |
| Base de datos | Asegurar la integridad mediante tipos de columna, restricciones (constraints) y valores  controlados. Impide que datos corruptos o inconsistentes se almacenen. | Usar **CHECK, NOT NULL, ENUM, FOREIGN KEY**. Ejemplo: CHECK (edad >= 18) o ENUM('pendiente','activo'). | 
| Salida (View) | Sanitizar y codificar (encoding o escaping) los datos antes de mostrarlos al usuario. Evita que contenido malicioso se ejecute en el navegador. | Escapar variables con `{{ var }}` en frameworks como Django, Flask o Vue para prevenir ataques XSS en la vista. |

## Recomendaciones adicionales
● Separar validación y lógica de negocio. Evita duplicación y facilita testeo.  
● Definir tipado fuerte (por ejemplo, int, date, enum) en vez de varchar.  
● Centralizar validaciones comunes (email, phone, etc.) en funciones reutilizables.  
● Usar frameworks seguros (Django, Spring Boot, Laravel) con validadores integrados.  
● Aplicar encoding correcto según contexto: HTML, JavaScript, SQL o URL.  









