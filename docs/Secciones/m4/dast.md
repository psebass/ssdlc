---
sidebar_position: 9
title: Pruebas DAST e integración técnica
slug: /modulo/modulo4/dast
description: DAST
keywords: [DAST, blackbox, shiftleft]
tags: [SAST, IAST, spyder, crawler]
---

import VideoCard from '@site/src/components/VideoCard';

[Volver](/docs/modulo/modulo4/)
## DAST

El análisis dinámico automatizado, conocido como DAST (Dynamic Application Security Testing), es una metodología que consiste en examinar una aplicación mientras se está ejecutando, con el propósito de identificar vulnerabilidades reales desde la perspectiva de un atacante externo.  

A diferencia del análisis estático (SAST), que inspecciona el código fuente sin ejecutarlo, DAST interactúa con la aplicación como lo haría un usuario o un ciberdelincuente, enviando peticiones HTTP y analizando las respuestas del servidor para detectar comportamientos anómalos.  
Este tipo de análisis es especialmente útil para descubrir vulnerabilidades que sólo emergen cuando los componentes del sistema interactúan entre sí o cuando se presentan fallas de validación en tiempo real.  

Entre los tipos de vulnerabilidades que puede detectar se incluyen:  
● Inyecciones de comandos, SQL o LDAP.  
● Cross-Site Scripting (XSS).  
● Configuraciones inseguras de cabeceras HTTP.  
● Autenticaciones o sesiones mal gestionadas.  
● Exposición de información sensible.  

DAST puede **ejecutarse manualmente** (mediante herramientas con interfaz gráfica) **o de manera automatizada**, integrándose en pipelines de integración continua.  

![D](/img/m4/ssdlc_m4_dast.png)

### Black-Box Testing
El DAST (Dynamic Application Security Testing) se basa en el enfoque de **“Black-Box Testing”**, es decir, un tipo de prueba en la que el evaluador no accede al código fuente ni a la lógica interna de la aplicación. En cambio, analiza cómo responde el sistema cuando está en ejecución.  

<div className="text--center">
    ![D](/img/m4/ssdlc_m4_box.png)
</div>
Este enfoque permite:  
● Evaluar la aplicación desde el exterior, simulando el comportamiento de un usuario o atacante real.  
● Detectar fallos en la interacción del código con el servidor y la base de datos, que solo se manifiestan durante la ejecución.  
● Identificar errores de runtime (tiempo de ejecución) y configuraciones inseguras que no se observan en  análisis estáticos.  

## DAST como complemento de SAST
El DAST no sustituye al SAST, sino que lo complementa dentro de una estrategia de seguridad integral.  
Mientras SAST examina el código para encontrar errores lógicos o malas prácticas de desarrollo, DAST verifica si esas debilidades pueden explotarse en un entorno real.  
El uso combinado de ambas pruebas se conoce como <span className="badge badge--secondary">análisis híbrido (IAST)</span>, que mejora la cobertura y reduce falsos positivos.  

En un ciclo de desarrollo maduro, SAST se aplica en las etapas iniciales y DAST se ejecuta cuando
el software ya está desplegado en un entorno
funcional.  

| Característica | SAST | DAST |
|:---|:---|:---|
| Acceso al código fuente | Sí | No |
| Momento de ejecución | Durante el desarrollo | Durante las pruebas o en producción controlada |
| Tipo de vulnerabilidad | Lógica o estructural | Explotable en ejecución |
| Velocidad | Rápido | Más lento (requiere entorno ejecutable) |
| Ejemplo de herramienta | SonarQube, Checkmarx | OWASP ZAP, Burp Suite |

## DAST en el SDCL
El SDLC (Software Development Life Cycle) es el marco que estructura las etapas del desarrollo de software. Integrar DAST dentro de este ciclo es esencial para adoptar un enfoque DevSecOps, en el que la seguridad no es una etapa final, sino un proceso continuo.  

DAST se puede incluir en las siguientes fases:  
● <span className="badge badge--secondary">Fase de pruebas:</span> para detectar vulnerabilidades antes del despliegue.  
● <span className="badge badge--secondary">Integración continua:</span> ejecutando escaneos automáticos en cada build.  
● <span className="badge badge--secondary">Preproducción:</span> verificando entornos idénticos a los de producción.  
● <span className="badge badge--secondary">Post-despliegue:</span> realizando escaneos programados sobre servicios activos.  
Integrar DAST de forma temprana permite reducir costos, ya que las fallas detectadas en etapas iniciales son más económicas de corregir que las encontradas en producción.  

## Integración del DAST en el SDLC y el enfoque Shift-Left
El SDLC (Software Development Life Cycle) define las etapas de desarrollo de software desde la planificación hasta el mantenimiento. Integrar DAST (Dynamic Application Security Testing) dentro de este ciclo es clave para fortalecer la seguridad y optimizar la detección temprana de vulnerabilidades.  

En el marco del enfoque DevSecOps, el DAST se ejecuta típicamente en las fases de Testing o Staging, cuando la aplicación ya está desplegada y puede analizarse en tiempo de ejecución.  

**Recomendaciones clave:**
● Incluir DAST dentro del pipeline de DevSecOps, representándolo en un diagrama que muestre su posición dentro del flujo continuo de integración y despliegue.  
● Aplicar el principio de “Shift-Left”, es decir, mover las pruebas de seguridad hacia etapas más tempranas del desarrollo para reducir los costos y esfuerzos de corrección posteriores.  
● Automatizar las ejecuciones de DAST en cada despliegue o actualización, asegurando una retroalimentación constante a los equipos de desarrollo.  

![D](/img/m4/ssdlc_m4_shiftleft.png)

## Pros y contras de DAST
Comprender las ventajas y limitaciones de DAST permite tomar decisiones más precisas sobre cuándo y cómo aplicarlo.  

<span className="badge badge--secondary">Ventajas</span>  
● Descubre vulnerabilidades reales y explotables.  
● No requiere acceso al código fuente.  
● Evalúa el comportamiento del sistema completo (servidor, red, base de datos).  
● Puede aplicarse a tecnologías diversas (Java, .NET, PHP, Node.js, etc.).  
● Se integra fácilmente en pipelines automatizados.  

<span className="badge badge--secondary">Desventajas</span>  
● Puede producir falsos positivos o falsos negativos.  
● Requiere entornos funcionales, lo que aumenta tiempos de análisis.  
● No identifica errores de diseño o lógicas de negocio complejas.  
● La cobertura depende de la exploración del spider; si el crawler no alcanza ciertas rutas, esas áreas quedan sin analizar.  


## Spiders y Crawlers
Los spiders o crawlers son los encargados de explorar las rutas accesibles de una aplicación para construir un mapa de su estructura. En DAST, esta etapa es fundamental, ya que determina el alcance del análisis.  
Existen dos modalidades:  
* Spider tradicional
* AJAX spider

## Spider Tradicional
Enfoque: rastreo de enlaces HTML visibles.  

### Usos comunes
La spider tradicional de ZAP se basa en analizar las respuestas HTML del sitio, extraer hipervínculos, formularios, etc., y seguir esos enlaces.  

### Cuándo usarla
● Cuando la aplicación web es relativamente “clásica”, es decir: muchas páginas generadas del lado servidor, los enlaces están presentes en el HTML, poca dependencia de JavaScript dinámico.  
● Para rastrear rápidamente la estructura básica del sitio (mapear URLs, endpoints visibles).  
● Como primer paso de exploración para obtener “lo que se puede” sin depender de renderizado complejo.  

### Qué no cubre tan bien
● Aplicaciones heavy-JS (SPA – Single Page Application) donde la navegación se genera con JavaScript, frameworks front-end, rutas que no están directamente vinculadas en el HTML.  
● Interacciones complejas del cliente que requieren “clicks” en botones que inician cargas dinámicas.  

## Guía de ejecución en ZAP
Aquí tienes un paso-a-paso para ejecutarla en ZAP:  
Preparativos  
1. Abre ZAP. Asegúrate de tener la versión más reciente y los “add-ons” al día.
2. Carga tu sesión o empieza una nueva. Establece el contexto adecuado (por ejemplo, definir qué dominios están en scope).  
3. Verifica la configuración de la spider: en ```Tools > Options > Spider``` (o menú equivalente) puedes ajustar parámetros como profundidad máxima, manejo de parámetros de consulta, etc.  


<!-- Pruebas DAST e Integracíon Técnica 19/58 -->
![D](/img/m4/ssdlc_m4_zap1.png)

### Algunas opciones clave a revisar
● **Maximum depth to crawl**: Define cuán “profundamente” el crawler puede seguir enlaces.  
● **Query parameters handling**: Si se consideran los valores de parámetros, solo nombres o se ignoran completamente.  
● **Process forms y POST forms**: Si la spider debe someter formularios o no.  
● **Cookies**, sesiones, etc.  

### Ejecución  
1. En la pestaña “Sites” identifica el nodo del dominio que quieres escanear, o ingresa la URL “seed” desde la que iniciar.  
2. Haz clic derecho en el dominio o la **URL > Attack > Spider**… (o equivalente) para lanzar la spider.  
3. En el diálogo de la spider, configura:
* El “seed” URL (o nodos) desde donde partir.  
* Si quieres Recurse (recursivo) para que siga automáticamente enlaces.  
* Opcionalmente, definir los usuarios (si la aplicación requiere autenticación) o contexto.  

![D](/img/m4/ssdlc_m4_zap2.png)


4. Pulsa Start Scan (o equivalente). ZAP comenzará a rastrear, mostrar progresos y agregar nodos en el árbol Sites a medida que descubre nuevas URLs.  
5. Monitorea en la pestaña Spider o Output los resultados: cuántos nodos nuevos se han agregado, cuánto tiempo lleva.
6. Cuando termine o consideres que es suficiente, detén la spider.  
7. Revisa el árbol de sitios (Sites tab): navega las ramas, verifica que las páginas importantes fueron descubiertas. Luego procedes con análisis posteriores (pasivo, activo, etc.).  

### Buenas prácticas
● Si la aplicación tiene login, asegúrate de que ZAP tenga configurada la autenticación o que tu usuario esté “logged in” antes de iniciar la spider, pues de lo contrario muchas URLs protegidas no serán exploradas.  
● Marca correctamente qué dominios están “in scope” para evitar que la spider se vaya fuera de lo deseado.  
● Ajusta la profundidad y el manejo de parámetros para evitar un rastreo demasiado amplio (lleno de duplicados) o muy superficial.  
● Guarda la sesión después para preservar el árbol de sitios.  
● Utiliza la spider tradicional como “primer barrido rápido”, luego complementa con la AJAX Spider (o ambas en paralelo) para máxima cobertura.  


<!-- Progreso 23/58 (Pruebas DAST e integración técnica) -->
<!-- VER QUE SE PUEDA EXPORTAR EL SPIDER CON LOS ALERTS -->

## AJAX Spider
### Caso de uso
La AJAX Spider de ZAP está pensada para aplicaciones (“rich-client”) que usan bastante JavaScript, navegación dinámica, frameworks front-end, donde los enlaces no están directamente en el HTML, sino generados por el
cliente.  
Según la documentación: [“The AJAX Spider add-on integrates in ZAP a crawler of AJAX rich sites called Crawljax.”][ref1]  


Cuándo usarla:  
● **SPA** (por ejemplo Angular, React, Vue) donde la navegación y contenidos se cargan dinámicamente.  
● **Cuando ves que la spider tradicional no descubre muchas rutas** (“páginas”) nuevas que esperabas.  
● **Si quieres más cobertura del lado cliente**: clics en botones, menús desplegables, datos cargados vía AJAX  

![D](/img/m4/ssdlc_m4_zap3.png)


### ¿Qué cuidar?
● Es más lenta que la spider tradicional.  
● Necesita más configuración (navegador, ventanas, esperas, etc.).  
● Puede generar más “ruido” (páginas duplicadas, estados similares) si no se configura bien.  

## Guía de ejecución en ZAP
Preparativos
1. Asegúrate de tener el add-on AJAX Spider instalado en ZAP. Normalmente, viene, pero verifica en “Manage Add-ons”.  
2. Define el contexto (dominios, usuarios) como antes.  
3. Ajusta las opciones específicas de AJAX
**Spider: Tools > Options > AJAX Spider**.   
Allí encontrarás configuraciones como:  
● ZAP  
● Browser: qué navegador usar (Firefox, Chrome, headless, etc.).  
● Number of Browser Windows to Open.  
● Maximum Crawl Depth.  
● Maximum Crawl States.  
● Maximum Duration (tiempo máximo).  
● Event Wait Time (tiempo de espera tras evento cliente).  
● Reload Wait Time (tiempo de espera tras carga de URL).  
● Click Elements Once (si los elementos se clican una sola vez).  
● Click Default Elements Only (si solo hace clics en “a”, “button”, “input”).  
● Logout Avoidance (evitar clics en logout).  
4. Si la aplicación requiere login, asegúrate de que el navegador que el AJAX Spider abre puede “estar” autenticado antes del rastreo, o define el inicio correctamente.  
5. En la pestaña “Sites” haz clic derecho en el nodo del dominio > Attack > AJAX Spider… (o usar el menú Tools > AJAX Spider).  
6. ZAP  
7. En el diálogo, selecciona la URL seed, el contexto, el navegador (si aplica) y otras opciones.  
8. Inicia el rastreo con Start.  
9. Monitorea el progreso: la spider abrirá instancias de navegador (o headless), ejecutará clics, formularios, navegación dinámica.  
10. Cuando finalice (o manualmente lo detengas) revisa el árbol de sitios: notarás más estados, rutas generadas dinámicamente, entradas de AJAX que la spider tradicional pudo no haber encontrado.  
11. Luego procede con análisis pasivo, activo, según corresponda.  


### Buenas prácticas y tips
● Configura los tiempos de “Event Wait Time” y “Reload Wait Time” con sentido: si la aplicación carga lento, aumentarlos para que la spider espere la carga completa.  
● Si ves que se genera mucho “ruido” (múltiples estados parecidos), puedes activar “Click Default Elements Only” para limitar los clics.  
● Usa en conjunto con la spider tradicional: primero la clásica para cobertura rápida, luego la AJAX para cobertura en profundidad de lo dinámico.  
● Verifica que el navegador usado esté bien instalado y configurado para funcionar con ZAP (por ejemplo en modo headless, si lo usas en CI).  
● Guarda la sesión luego del rastreo para preservar lo descubierto.  

## Uso de OWASP ZAP para escaneo pasivo/activo
OWASP ZAP (Zed Attack Proxy) actúa como un proxy entre el navegador y la aplicación, interceptando y analizando el tráfico.  
Permite dos tipos de escaneos pasivo y activo.  
A continuación, vamos a conocer de qué trata cada uno.  

### Escaneo pasivo
Analiza el tráfico sin alterar las peticiones originales, observando cómo se comporta la aplicación frente a solicitudes normales.  

#### Usos y ventajas
● Ideal para auditorías iniciales y entornos en producción.  
● Permite detectar cabeceras inseguras, cookies sin protección, cifrados débiles y metadatos sensibles.  
● No genera riesgo de afectar la estabilidad del sistema.  

#### Ejemplo de hallazgos
● Falta de cabeceras Security-Policy.  
● Cookies sin flag HttpOnly o Secure.  
● Uso de HTTP en lugar de HTTPS.  

### Escaneo activo
Envía peticiones modificadas o maliciosas para intentar explotar vulnerabilidades y confirmar su existencia.  

#### Usos y ventajas
● Adecuado para entornos de prueba o staging.  
● Detecta vulnerabilidades reales como: 
    * Inyecciones SQL o Command Injection.  
    * Cross-Site Scripting (XSS).  
    * Directory Traversal.  
● Permite medir el impacto de cada fallo encontrado.  

#### Ejemplo de hallazgos
● Formularios que aceptan código JavaScript.  
● Parámetros vulnerables a manipulación SQL.  

<!-- Progreso 37/58 (Pruebas DAST e integración técnica) -->

### Comparación entre los tipos de escaneos
| Característica | Escaneo Pasivo | Escaneo Activo |
| -------------- | -------------- | -------------- |
| Interacción con el sistema | Solo observa tráfico existente | Envía peticiones modificadas |
| Riesgo de impacto | Muy bajo | Moderado a alto |
| Entorno recomendado | Producción o auditoría inicial | Ideal staging o pruebas controladas |
| Tipo de hallazgos | Configuraciones inseguras, cabeceras, cookies | Vulnerabilidades explotables (inyecciones, XSS, etc.)|
| Velocidad | Rápido | Más lento |
| Requiere autenticación | No necesariamente | Frecuentemente sí |

## Como se ejecuta en OWASP ZAP

| Paso | Acción | Descripción / Objetivo | Resultado esperado |
| ---- | ------ | ---------------------- | ------------------ |
| 1 | **Preparación del entorno** | Instalar OWASP ZAP y definir el objetivo de prueba. | Descarga desde zaproxy.org. Usa un entorno seguro (staging o app vulnerable como OWASP Juice Shop). | Entorno de prueba listo para análisis. |
| 2 | **Configurar el contexto** | Incluir la URL en un Context y definir autenticación. | **Clic derecho > Include in Context > Default Context**. Configurar Scope para limitar el análisis al dominio. | OWASP ZAP sabe qué parte del sitio escanear. |
| 3 | **Ejecutar el Spider** | Lanzar el rastreo de rutas. | Menú **Spider > Attack**. Definir URL inicial, profundidad y opción Subtree Only. | Mapa de URLs descubierto. | 
| 4 | **Ejecutar el AJAX Spider** (si aplica) | Rastrear contenido dinámico. | **Tools > AJAX Spider** con Headless Chrome.  Detecta endpoints generados por JavaScript o frameworks SPA. | Mapa ampliado con rutas dinámicas. | 
| 5 | **Escaneo Pasivo** | Analizar tráfico sin alterar peticiones. | Ocurre automáticamente al navegar o ejecutar el Spider. Revisa pestaña **Alerts** > cabeceras, cookies, cifrado, metadatos. | Auditoría no intrusiva con hallazgos de configuración. | 
| 6 | **Escaneo Activo** | Enviar peticiones modificadas. | Clic derecho sobre el sitio > **Attack > Active Scan**.   Configurar políticas (SQLi, XSS, LFI, etc.) y número de hilos. | Vulnerabilidades explotables detectadas. | 
| 7 | **Análisis de resultados** | Revisar alertas y severidades. | Pestaña Alerts > filtrar por nivel (Low, Medium, High). | Identificación clara de riesgos críticos. |
| 8 | **Generar reporte** | Exportar hallazgos. | **Report > Generate Report** > elegir formato (HTML/PDF/XML). | Informe con descripción y mitigaciones. |
| 9 | **Automatizar en CI/CD** | Integrar ZAP en DevSecOps pipeline. | Ejemplo:  ```docker run -t owasp/zap2docker-stable  zap-baseline.py -t  https://staging.midominio.com -r  reporte.html ``` | Escaneo automático en cada despliegue. |

## Escaneos autenticados
Los escaneos autenticados permiten evaluar las áreas protegidas de una aplicación, donde suelen encontrarse funcionalidades críticas como paneles de usuario, secciones administrativas o flujos de gestión interna.  
Para realizarlos, el escáner debe mantener una sesión activa durante el análisis. Esto puede lograrse mediante:  
● Cookies persistentes o tokens JWT.  
● Scripts personalizados de inicio de sesión  
● O la técnica de Recording Authentication / Authentication Macro, que consiste en grabar el proceso de login paso a paso (usuario, contraseña, botones, redirecciones) para que el escáner sepa cómo autenticarse y reautenticarse automáticamente.  


<!-- Progreso 42/58  -->
### Configuración de la técnica en OWASP ZAP
1. Tools > Options > Authentication > Script-based Authentication.  
   En la versión 2.17 puedes ir directamente a la sección donde muestro a continuación:  
   ![D](/img/m4/ssdlc_m4_scripts.png)  
2. Se graba o define el flujo de login mediante un macro script (por ejemplo, enviando POST con credenciales).  
3. Se vincula al Context del sitio, de modo que el escáner use esas credenciales en cada solicitud que requiera autenticación.  

Esto amplía el alcance del análisis, permitiendo descubrir vulnerabilidades en flujos restringidos, como:  
● Cambio de contraseñas.  
● Modificación o eliminación de datos.  
● Gestión de permisos y roles.  


Versión 2.17:  
En este video tutorial puedes encontrar una guía sobre la creación y configuración de un script de autenticación.  

<VideoCard 
  title="OAuth2 Authenticated Scan Using OWASP ZAP"
  channel="Testing"
  date="23 feb 2025"
  thumbnail="https://img.youtube.com/vi/Jgp1f242B-k/maxresdefault.jpg"
  url="https://www.youtube.com/watch?v=Jgp1f242B-k"
/>

## APIs con ZAP
Cada vez más aplicaciones modernas exponen funcionalidades a través de APIs REST, SOAP o GraphQL, lo que exige que los escaneos DAST incluyan también la evaluación de estos endpoints.  
ZAP permite importar descripciones de API (OpenAPI, Swagger, Postman Collections) y generar automáticamente las peticiones necesarias para el análisis.  
En versiones recientes, también ofrece soporte básico para GraphQL, permitiendo importar esquemas y analizar queries y mutations en busca de vulnerabilidades.  

### Ventajas de usar ZAP para APIs
● Descubre endpoints no documentados.  
● Verifica cabeceras de autenticación y métodos HTTP inseguros.  
● Evalúa la exposición de datos sensibles en respuestas JSON o XML.  
● Analiza consultas y resolvers en GraphQL para detectar filtraciones de información o abusos de introspección.  

## ZAP CLI: Automatización en entornos de CI/CD
La interfaz de línea de comandos (CLI) de OWASP ZAP no solo simplifica el uso del escáner: es la herramienta esencial para la automatización desatendida en pipelines de CI/CD, donde no existe interfaz gráfica.  
Con zap-cli, los equipos pueden **iniciar y controlar instancias del escáner**, ejecutar análisis activos o pasivos, generar reportes y comunicarse con la API local de ZAP, todo desde scripts o jobs automatizados.  

### Beneficios principales
● **Ejecutar escaneos de seguridad en entornos sin escritorio** (servidores, contenedores, pipelines DevSecOps).  
● **Integrar pruebas dinámicas** dentro del ciclo de despliegue continuo.  
● **Permitir ejecución programada** mediante cron jobs, bash scripts o Python.  

### Comandos base de ZAP CLI
| Comando | Descripción | Ejemplo de uso |
| ------- | ----------- | -------------- |
| zap-cli start | Inicia una instancia de ZAP en modo headless. | zap-cli start --start-options "-config api.key=12345" |
| zap-cli quick-scan | Ejecuta un escaneo rápido sobre una URL. | zap-cli quick-scan http://localhost:8080 |
| zap-cli open-url | Abre una URL en la sesión actual de ZAP. | zap-cli open-url https://staging.midominio.com |
| zap-cli status | Consulta el estado del escaneo activo. | zap-cli status --timeout 300 |
| zap-cli report | Exporta los resultados del escaneo en distintos formatos. | zap-cli report -o reporte.html -f html |
| zap-cli shutdown | Detiene la instancia activa de ZAP. | zap-cli shutdown |

## Automatización de escaneos
Automatizar los escaneos DAST garantiza que la seguridad se mantenga como una tarea continua. Esto se logra combinando scripts, CLI y pipelines.  

### Ventajas de la automatización:
● Detección constante de nuevas vulnerabilidades.  
● Reducción de intervención manual.  
● Mejora del cumplimiento de políticas DevSecOps.  
Los escaneos automatizados pueden programarse por:  
* tiempo
* por evento (nuevo commit)
* por cambio en la infraestructura.  

## ZAP2docker
ZAP2Docker es la versión contenedorizada de OWASP ZAP, ideal para entornos donde no se desea instalar dependencias locales.  
Al ejecutarse en un contenedor, permite estandarizar entornos y garantizar que todos los equipos obtengan resultados idénticos al realizar pruebas dinámicas de seguridad.  
El contenedor incluye varios scripts predefinidos, diseñados para distintos niveles de escaneo:  
● `zap-baseline.py`: escaneo pasivo rápido, sin modificar peticiones.  
● `zap-full-scan.py`: escaneo activo completo (incluye ataques de inyección, XSS, etc.).  
● `zap-api-scan.py`: orientado a análisis de APIs (OpenAPI, Swagger o GraphQL).  

## Comandos base de ZAP2Docker
| Script / Comando | Nivel de escaneo | Uso principal | Ejemplo de ejecución |
| ---------------- | ---------------- | ------------- | -------------------- |
| zap-baseline.py | Escaneo pasivo | Verifica cabeceras, cookies, cifrado y metadatos sin modificar tráfico. |  docker run -t owasp/zap2docker-stable zap-baseline.py -t https://example.com -r baseline.html |
| zap-full-scan.py | Escaneo activo | Ejecuta pruebas dinámicas completas, buscando vulnerabilidades explotables. | docker run -t owasp/zap2docker-stable zap-full-scan.py -t https://example.com -r fullscan.html |
| zap-api-scan.py | Escaneo de API | Analiza endpoints definidos en archivos OpenAPI/Swagger/GraphQL. | docker run -t owasp/zap2docker-stable zap-api-scan.py -t https://api.example.com/openapi.json -r apiscan.html |
| zap.sh | Instancia interactiva | Inicia ZAP dentro del contenedor en modo gráfico o demonio. | docker run -u zap -p 8080:8080 -i owasp/zap2docker-stable zap.sh | 


## Integración en pipelines  CI/CD
La integración de DAST en pipelines CI/CD permite **incorporar pruebas de seguridad dentro del flujo natural de desarrollo**, cumpliendo el principio de “seguridad como código”.  
Más que una práctica de automatización, esta integración impulsa el Desarrollo Guiado por la Seguridad (Security-Driven Development): la revisión manual se **_transforma en una tarea recurrente, programada y continua, garantizando que cada cambio de código sea evaluado antes de llegar a producción_**.  


Cada vez que se genera una nueva versión, el sistema ejecuta pruebas dinámicas que:  
● Detectan vulnerabilidades tempranas en cada iteración.  
● Generan alertas automáticas para los equipos de Dev y QA.  
● Proveen evidencia de cumplimiento normativo (ISO 27001, OWASP Top 10, PCI DSS).  
● Permiten medir la evolución de la seguridad a lo largo del ciclo de desarrollo.  

### Ejemplo

En un archivo `.gitlab-ci.yml`, agrega el siguiente job:  
```bash
dast_scan:
  image: owasp/zap2docker-stable
  script:
    - zap-baseline.py -t $APP_URL -r report.html
  artifacts:
    paths:
      - report.html
  allow_failure: false
```

Este job generará un reporte de seguridad cada vez que se ejecute el pipeline y detendrá el proceso si detecta vulnerabilidades críticas.  


<!-- Referencias -->
[ref1]:https://www.zaproxy.org/docs/desktop/addons/ajax-spider/