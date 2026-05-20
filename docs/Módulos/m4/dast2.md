---
sidebar_position: 10
title: Inteligencia, priorización y mejora continua con DAST
description: DAST
keywords: [DAST]
tags: [DAST, reporte]
---

## Comparación de hallazgos entre SAST y DAST
Cuando se utilizan herramientas SAST y DAST en conjunto, es común encontrar que los resultados se solapan parcialmente. Sin embargo, la naturaleza de los hallazgos difiere por completo. SAST detecta vulnerabilidades en el código fuente, es decir, analiza patrones inseguros o malas prácticas antes de la ejecución.  
En cambio, DAST evalúa cómo la aplicación responde a estímulos externos, exponiendo únicamente las vulnerabilidades explotables en un entorno real.  

Combinar ambos análisis ofrece una visión integral del riesgo. Por ejemplo, un fallo de validación de entradas detectado por SAST puede confirmarse como explotable por DAST si un atacante logra inyectar código malicioso a
través de una interfaz web.  

:::info 
El objetivo de la comparación es priorizar las vulnerabilidades confirmadas en ambos niveles, ya que representan amenazas reales y presentes.
:::

## Prioridad de vulnerabilidades
La priorización de vulnerabilidades es un proceso esencial para optimizar los esfuerzos de remediación. No todas las vulnerabilidades tienen el mismo impacto ni la misma probabilidad de explotación.  

Para establecer una prioridad racional se utilizan métricas como el CVSS (Common Vulnerability Scoring System), que valora la gravedad de una vulnerabilidad según tres dimensiones:  
● **Base**: características intrínsecas (impacto, vector de ataque, complejidad).  
● **Temporal**: condiciones que pueden cambiar (existencia de exploits, parches disponibles).  
● **Contextual**: importancia del sistema afectado dentro de la organización.  
También se recomienda analizar la exposición real de la vulnerabilidad: un XSS en un formulario público merece más atención que uno en una sección interna.  

## Ejemplos prácticos de priorización
| Escenario | Tipo de vulnerabilidad | CVSS Base | Contexto organizacional | Prioridad final estimada |
| --------- | ---------------------- | --------- | ----------------------- | ------------------------ | 
| Fintech con plataforma pública de clientes | Inyección SQL en endpoint de autenticación | 9.8 (Crítica) | Afecta datos personales y acceso a cuentas financieras; servicio público 24/7. | ***Crítica – Atención inmediata*** |
| Empresa de retail con intranet interna | XSS reflejado en panel administrativo | 6.1 (Media) | Sistema accesible solo por personal autorizado; riesgo mitigado por controles internos. | Media – Planificar parcheo |
| Startup SaaS con API expuesta a terceros | Configuración CORS permisiva | 7.5 (Alta) | API utilizada por múltiples clientes; exposición a robo de tokens. | Alta – Corregir en sprint actual |

### Cómo se asocia a la organización
Cada organización debe calibrar su modelo de priorización combinando el CVSS con factores propios: criticidad del servicio, requisitos regulatorios, reputación y tolerancia al riesgo. Así, una vulnerabilidad con igual puntaje puede tener urgencias distintas según el impacto en el negocio.  

## Explotación limitada
El DAST no tiene como objetivo comprometer completamente la aplicación, sino detectar comportamientos anómalos que indiquen posibles puntos de explotación.  
Esto significa que las pruebas realizadas deben ser no destructivas: se busca confirmar la presencia de vulnerabilidades sin afectar la integridad o disponibilidad del sistema.  
Los escaneos activos pueden generar tráfico de ataque, pero deben configurarse con límites de intensidad y frecuencia para no provocar denegaciones de servicio (DoS).  

## Buenas prácticas
● Usar entornos de pruebas o staging, nunca producción.  
● Limitar el número de solicitudes simultáneas.  
● Excluir endpoints críticos (pagos, APIs externas, bases de datos).  
● Registrar toda la actividad del escáner.  

## Reportes en OWASP ZAP
OWASP ZAP permite generar diferentes tipos de reportes para documentar los hallazgos de seguridad obtenidos durante los escaneos.  
Estos reportes se adaptan a distintos públicos dentro del equipo —desde analistas técnicos hasta responsables de cumplimiento— y pueden exportarse directamente desde la interfaz gráfica o por línea de comandos.  

### Formas de exportación
● Desde el menú Report > Generate Report, seleccionando formato y nivel de detalle.  
● A través de ZAP CLI o Docker, usando el comando: zap-cli report -o reporte.html -f html  
● Por integración con API REST, permitiendo automatizar la generación tras cada escaneo.  

![D](/img/m4/ssdlc_m4_report.png)

## Tipos de reportes y su propósito

| Tipo de reporte | Formato | Dirigido a | Propósito principal |
| --------------- | ------- | ---------- | ------------------- |
| Reporte HTML | .html | Desarrolladores y QA | Visual, de lectura rápida. Resume vulnerabilidades, nivel de severidad y evidencia. Ideal para revisiones internas. |
| Reporte PDF | .pdf | Gerencia o cumplimiento | Formato formal y portable. Resume riesgos y recomendaciones de mitigación. Adecuado para auditorías o informes externos. |
| Reporte XML / JSON | .xml, .json | Integraciones automáticas / DevSecOps | Estructurado y legible por máquina. Usado para importar hallazgos en sistemas como Jira, GitLab o DefectDojo. | 
| Reporte Markdown (MD) | .md | Documentación técnica | Versión ligera para repositorios o wikis internos. Facilita trazabilidad. |

## Buenas prácticas
● Generar reportes automáticos tras cada ejecución de pipeline o despliegue.  
● Mantener un repositorio histórico para análisis de evolución de riesgos.  
● Personalizar las plantillas de reporte en `/ZAP_HOME/templates/` para alinear con los estándares
de la organización.  

## Reportes automáticos DAST
Los reportes automáticos son fundamentales para documentar hallazgos, comunicar riesgos y mantener trazabilidad. OWASP ZAP, por ejemplo, puede generar reportes en formatos HTML, XML o JSON, con información detallada sobre cada vulnerabilidad:  
● Descripción técnica.  
● Nivel de riesgo.  
● Evidencia (peticiones y respuestas).  
● Recomendaciones de mitigación.  

Estos reportes pueden integrarse en herramientas de gestión de incidencias como Jira, GitLab Issues o DefectDojo, facilitando la asignación y seguimiento de tareas.  

## Análisis DAST con IA
La inteligencia artificial se está integrando progresivamente en las herramientas de análisis de seguridad.  

En el caso de DAST, los modelos de IA se utilizan para:  
● Identificar patrones de vulnerabilidad más allá de las reglas tradicionales.  
● Reducir falsos positivos, aprendiendo de resultados previos.  
● Optimizar el rastreo, priorizando rutas que históricamente presentan más riesgos.  
● Analizar correlaciones entre vulnerabilidades detectadas por diferentes tipos de escaneo.  

Las herramientas más recientes aplican aprendizaje automático (machine learning) para mejorar la precisión y rapidez del análisis, ajustando dinámicamente el enfoque del escaneo según el comportamiento de la aplicación.  

### IA y generación dinámica de payloads
La IA puede generar automáticamente payloads más sofisticados y contextualizados al negocio, superando las reglas estáticas predefinidas. Esto significa que los escáneres pueden adaptar sus pruebas a:  
● La lógica específica de cada aplicación (por ejemplo, flujos de compra, autenticación o manejo de datos).  
● El lenguaje o stack tecnológico utilizado (PHP, Node.js, Java, etc.).  
● La superficie real de ataque, ajustando el tipo de payload a cada endpoint o parámetro.  

De esta forma, el análisis DAST se vuelve más inteligente, menos genérico y más efectivo en descubrir vulnerabilidades que las configuraciones tradicionales no detectan.  

:::tip
La IA puede generar automáticamente payloads más sofisticados y contextualizados al negocio que las reglas estáticas que vienen por defecto.
:::

## C10: Prevención de SSRF (Server-Side Request Forgery)
El SSRF (Server-Side Request Forgery) es una vulnerabilidad en la que un atacante logra hacer que el servidor realice solicitudes no autorizadas a otros recursos internos o externos.  
Esta falla suele pasar inadvertida en pruebas superficiales y es especialmente peligrosa porque permite acceder a servicios internos, metadatos de nube o endpoints protegidos.  

El DAST puede detectar indicios de SSRF al observar comportamientos anómalos ante URLs manipuladas o cabeceras HTTP alteradas.  

### Medidas de prevención
● Validar y sanitizar todas las entradas de usuario que se usen para construir URLs.  
● Implementar listas blancas de destinos permitidos.  
● Bloquear acceso a direcciones privadas (127.0.0.1, 10.0.0.0/8).  
● Usar timeouts y restricciones en las librerías HTTP del servidor.  

![D](/img/m4/ssdlc_m4_ssrf.png)

## Otras herramientas de mercado
Aunque OWASP ZAP es la herramienta de referencia en entornos de código abierto, existen otras soluciones DAST en el mercado con características adicionales:  
● **Burp Suite**: ampliamente usada por profesionales de pentesting, ofrece funcionalidades avanzadas de fuzzing, manipulación de peticiones y extensiones personalizadas.  
● **Acunetix**: herramienta comercial con interfaz intuitiva y capacidades automáticas de escaneo de APIs REST y GraphQL.  
● **Netsparker (Invicti)**: destaca por su motor de verificación automática de falsos positivos.  
● **AppScan (IBM)**: orientada a grandes entornos corporativos, con integración directa en pipelines DevOps.  
La elección depende del presupuesto, nivel de automatización requerido y compatibilidad con los flujos  existentes.  

## IA para priorización
La IA no solo detecta, también ayuda a priorizar. Algoritmos de clasificación pueden analizar grandes volúmenes de hallazgos y ordenarlos según impacto potencial, probabilidad de explotación y contexto operativo.  
Esto resulta especialmente útil en entornos con cientos de vulnerabilidades donde el factor humano no puede priorizar manualmente.  
Los modelos de IA pueden entrenarse con datos históricos de la organización, considerando:  
● Qué tipos de vulnerabilidades suelen ser explotadas.  
● Cuánto tardan en corregirse.  
● Qué impacto financiero o reputacional generan.  

### Prompts base para priorización según contexto de negocio
| Contexto | Objetivo de priorización | Ejemplo de prompt o criterio IA |
| -------- | ------------------------ | ------------------------------- |
| Fintech o banca | Proteger datos sensibles y operaciones críticas. | “Priorizar vulnerabilidades en endpoints relacionados con transferencias o autenticación de usuarios”. |
| E-commerce / Retail | Evitar interrupciones de venta o robo de información. | “Dar mayor peso a vulnerabilidades que puedan afectar pasarelas de pago o sesiones de clientes”. |
| Educación / SaaS | Mantener disponibilidad y reputación del servicio. | “Ordenar vulnerabilidades según su potencial para afectar el acceso de usuarios o integridad de contenido”. |
| Infraestructura / DevOps | Reducir tiempo de exposición en sistemas productivos. | “Detectar configuraciones inseguras con acceso público y priorizarlas frente a riesgos internos”. |

## Buenas prácticas de remediación
Detectar vulnerabilidades no es suficiente; el objetivo final del DAST es facilitar su remediación efectiva.
Para ello, es necesario establecer un flujo de trabajo colaborativo entre los equipos de desarrollo, QA y
seguridad.  

## Buenas prácticas recomendadas
● Centralizar los hallazgos en una herramienta de seguimiento (Jira, GitLab).
● Establecer acuerdos de nivel de servicio (SLA) para tiempos de corrección según criticidad.  
● Incluir pruebas de verificación post-remediación.  
● Documentar patrones seguros de codificación para evitar reincidencias.  
● Implementar un ciclo de aprendizaje continuo entre vulnerabilidades detectadas y nuevas reglas en el
pipeline.  


---
## Laboratorios
## Laboratorio 1

## Descubrimiento con OWASP ZAP
### Spider Tradicional y Spider AJAX
Identificar y delimitar la superficie de ataque de una aplicación web, comparando qué descubre Spider vs AJAX Spider, para decidir qué partes priorizar en los escaneos y pruebas posteriores.  

## Consignas
1. Configurar OWASP ZAP como proxy.  
2. Usar Spider tradicional y Ajax Spider para mapear el sitio (Juice Shop: https://juice-shop.herokuapp.com/).  
3. Comparar resultados y detectar secciones ocultas.  

## Solución
### Spider tradicional
<!-- M4- Resolución de laboratorio 1.pptx -->
1. Pasos previos para generar el ataque Spider.
:::important Configuración del Proxy
ZAP dentro del contenedor no puede lanzar automáticamente un navegador GUI desde allí, por lo que se debe configurar el proxy (en Firefox/Chrome) normalmente así:

### Opción Firefox  
Configuración de conexiones -> configuración manual del proxy -> 127.0.0.1:8080

### Certificado en ZAP  
Debemos importar en Firefox el certificado raíz de OWASP ZAP. Se hace desde:  
Tools → Options → Network → Server Certificates
Guardamos el archivo .cer

### En Firefox  
Settings -> Privacy & Security -> Certificates -> View Certificates -> Authorities -> Import

![D](/img/m4/ssdlc_m4_cert.png)
Luego en Firefox...  
![D](/img/m4/ssdlc_m4_import_cert.png)

Marcar:  
"Trust this CA to identify websites" y aceptar.  

### En OWASP ZAP
No olvidar marcar la opción:  
_"Enable app integration in containers"_  
![D](/img/m4/ssdlc_m4_enable_app.png)
:::

Ingresa a Owasp Juice: dentro de Manual explore ingresa el link https://juice-shop.herokuapp.com en el campo URL. Luego, habilita HUD y lanza el navegador en Firefox.  

2. Spider tradicional y Ajax Spider para mapear el sitio (Juice Shop: https://juice-shop.herokuapp.com/) 
En el panel sites, clic derecho sobre la URL -> Attack -> Spider. Se puede hacer desde el sitio si ha sido lanzado desde ZAP con HUD activo, puedes seleccionar el ataque Spider como se ve a continuación.  
![D](/img/m4/ssdlc_m4_juice.png)
_Ícono de araña gris._   

Progreso:  
![D](/img/m4/ssdlc_m4_hud_spider.png)

### Spider AJAX
Usa Spider AJAX para el análisis del sitio:  
Ve al Menú Tools > AJAX Spider o clic derecho en Sites > Attack > AJAX Spider.  
Selecciona Browser/Engine (Firefox/Chrome; puede correr headless) y Start Scan.  
Monitorear la pestaña AJAX Spider.  

<!-- PEGAR EL RESULTADO DE LOS SPIDERS -->

3. **Comparar resultados y detectar secciones ocultas**  
Spider mapeó sobre todo recursos estáticos y rutas “previsibles” (p. ej., /app/build/routes/vendor.js, main.js, node_modules/express/..., /assets/styles.css, favicon), ideal para el esqueleto del sitio.  
El AJAX Spider lanza un navegador real (ejecuta JS, XHR, eventos del DOM) y descubre contenido de SPA/JS pesado, a costa de ser más lento y producir muchas solicitudes (incluidos assets externos y websockets).  
AJAX Spider ejecutó JS y expuso superficie dinámica que el Spider no ve: handshake
WebSocket (/socket.io/...) y endpoints de API y áreas sensibles (p. ej., /rest/admin/..., /api/Challenges), además de mostrar alertas medias en varias URLs.

<!-- Laboratorio adicional 2 HACER -->
#### Resultado en OWASP ZAP
![D](/img/m4/ssdlc_m4_hud_spider_ajax.png)

### Salidas
En el contenedor corriendo con Podman, entramos al directorio y vemos las salidas de los archivos exportados de OWASP ZAP.  

![D](/img/m4/ssdlc_m4_spiders_csv.png)

Pasamos los archivos si queremos al entorno Win.  
![D](/img/m4/ssdlc_m4_csv_kali_win.png)

## ¿Que debemos entender de cada proceso spider?
### Spider Tradicional
Del archivo `spider_ajax_juiceshop_17-05-2026_0135.csv`  
Buscamos:  
* links HTML
* robots.txt
* sitemap.xml
* rutas visibles

Funciona bien para aplicaciones clásicas y sitios server-side.  

### Spider AJAX
Del archivo `spider_juiceshop_16-05-2026_2203.csv`   
Usamos navegador/headless browser para:  
* Ejecutar JavaScript
* Detectar rutas dinámicas
* Apps SPA/React/Angular


1. URL interesantes
    En ambos archivos debemos buscar:  
    * /admin
    * /api
    * /ftp
    * /rest
    * /login
    * /graphql
    * .bak
    * .old
    * .zip

    En este caso ya aparece algo interesante:  
    * /ftp
    * /ftp/acquisitions.md
    * /cupons_2013.bak

    Exactamente el tipo de superficie que ZAP intenta descubrir.  

2. Out of Scope  
    En AJAX Spider
    * Quedan fuera los dominios externos Mozilla, fonts y CDNs.
    * Normalmente son ignorables y ruido.

3. Códigos HTTP
    Mirar:  
    * 200 (accesible)
    * 403 (existe pero restringido)
    * 401
    * 500 (posible bug/error interno)

4. Diferencia de cobertura
   | Spider | URLs |
   | ------ | ---- |
   | Tradicional | 161 | 
   | AJAX | 93 |

   Importante: No significa que AJAX sea peor, explora distinto, ejecuta JS y suele encontrar endpoints dinámicos.

:::tip Conclusión

El Spider tradicional identificó recursos estáticos y rutas expuestas como robots.txt, sitemap.xml y directorios FTP.  

El Spider AJAX exploró rutas renderizadas con JavaScript y contenido dinámico típico de las aplicaciones SPA modernas.  
:::

## Laboratorio 2

### Escaneo pasivo con OWASP ZAP
Detectar problemas sin interactuar agresivamente.  

### Consignas
1. Cargar el sitio mapeado en Lab 1 en ZAP.  
2. Navegar manualmente para generar tráfico.  
3. Revisar alertas del escaneo pasivo (cookies inseguras, headers faltantes, etc.).  
4. Generar un reporte HTML solo con findings de bajo y medio riesgo.  

## Solución

1. Cargar el sitio mapeado en Lab 1 en ZAP  
a. En ZAP, arriba a la derecha (o menú): Mode > Safe (o  Protected).  
b. En Options > Passive Scanner marca Scan only in scope.  
c. Verifica que tu Context/Scope incluya solo el dominio del lab.  
![D](/img/m4/ssdlc_m4_passive_scan.png)

2. Navegar manualmente para generar tráfico  
a. Recorre flujos típicos (sin forzar errores):  
Home - Catálogo - Detalle de producto - Buscar - Carrito -
Login/Registro (sin datos reales).  
b. Observar:
    * Panel Sites llenándose.  
    * Panel History con las solicitudes.  
    * Panel Passive Scan con el contador Records to Scan bajando a 0.  



![D](/img/m4/ssdlc_m4_passive_scan_2.png)

3. Revisar alertas del escaneo pasivo (cookies inseguras, headers faltantes, etc.)
a. Abre la pestaña Alerts.  
b. Filtra por In Scope only y ordena por Risk (High/Medium/Low/Informational).  
c. Haz clic en una alerta para ver: Descripción, Evidencia, Solución, Referencias.  
d. No ejecutes “Active Scan”.  


![D](/img/m4/ssdlc_m4_passive_scan_3.png)

4. Generar un reporte HTML solo con findings de bajo y medio riesgo.  
El escaneo pasivo muestra debilidades de hardening y exposición:  
    ● Off-site redirect (riesgo de open redirect/phishing).  
    ● Ausencia de CSP y anti-clickjacking (eleva riesgo de XSS y frame hijacking)  
    ● Cross-domain misconfiguration y JS cross-domain (carga de recursos externos potencialmente inseguros)  
    ● Session ID en la URL (sesiones expuestas a logs/enlaces compartidos) 
    ● Falta de HSTS y de X-Content-Type-Options (posibles downgrade a HTTP y MIME sniffing)  
    ● Private IP disclosure y comentarios sospechosos (filtración de info interna)  
    ● Además de timestamp disclosure y políticas de cache subóptimas. 

### Prioridad inmediata
Eliminar open redirect o restringirlo con allowlist, migrar sesiones a cookies seguras (Secure/HttpOnly/SameSite) sin IDs en URL, habilitar HSTS, CSP y X-Frame-Options/frame-ancestors, limitar recursos a dominios de confianza (ideal con SRI), ocultar IP internas y sanitizar comentarios; luego ajustar X-Content-Type-Options, Referrer-Policy y cache-control.  

---

## Proyecto Integrador
### Escenario
El equipo de Seguridad de “BankOne” debe evaluar un módulo interno recién publicado en el portal web. Se pide un barrido DAST autenticado que entregue: rutas alcanzables tras login, vulnerabilidades explotables, riesgos priorizados para negocio y un resumen ejecutivo asistido por IA para enviar a Dirección y crear
tickets de remediación.  

### Consignas
1. Poner DVWA en marcha:  
    a. Terminal: Navegador: http://localhost/setup.php > Create/Reset DB.   
    b. Login: http://localhost/login.php (`usuario: admin, clave: password`).  
    c. DVWA Security: Low.  

2. Contexto en ZAP (autenticado):  
    a. Include:  
        ```bash
        ^http://(localhost|127\.0\.0\.1)(:\d+)?/.*$
        ```
    b. In Scope Only activado. Modo Protected y prioridad.  

3. Autenticación (Form-based):  
    a. Login URL: http://localhost/login.php  
    b. POST data:  
        * `username={%username%}&password={%password%}&Login=Login`  
        * `Logged-in: Logout`  
        * `Logged-out: login.php`  
        * User: dvwa-admin (admin/password).  
        * Forced User Mode activado con dvwa-admin.  

4. Descubrimiento autenticado:  
    a. Spider: “Scan as user”.  
    b. AJAX Spider: “Scan as user”.  
    c. Guardar listas de URLs y anotar qué aparece solo tras login.  

5. Escaneo activo autenticado:  
    a. Active Scan sobre el Context, Scan as user=admin, Only in Scope y Recurse.  
    b. Utilizar política Medium creada en laboratorios anteriores.  
    c. Attack Strength: Medium. Alert Threshold: Medium.  

6. Reporte e IA:  
    a. Reporte HTML y JSON filtrados a In Scope Only.  
    b. Subir el HTML a una IA y pedir:  
    i. Resumen ejecutivo en 10 líneas.  
    ii. Tabla: Vulnerabilidad, CWE/OWASP, Riesgo, Evidencia corta,
    Recomendación, Equipo owner, SLA.  
    iii. Top-5 tickets de remediación con criterios de aceptación y prioridad.  


### Solución
1. Ponemos DVWA en marcha
    a. Ir a http://localhost/DVWA/login.php y loguearte con admin / password.  
    b. En DVWA Security seleccionar `Low` y presionar `Submit`  

2. Contexto en ZAP (autenticado)
    a. En el panel Sites de ZAP, clic derecho sobre http://localhost e Include in Context (Default Context).  
    b. Abrir Analyse > Session Properties… > Contexts > Default Context.  

    ![D](/img/m4/ssdlc_m4_default_context_01.png)
    Luego:  
    ![D](/img/m4/ssdlc_m4_default_context_02.png)

    c. Ya seleccionado el contexto en el alcance del sitio, debes avanzar confirmando el Mode > Protected.  

3. Autenticación (Form-based)  
    a. Como primer paso previo a la configuración del formulario de autenticación, testea las credenciales.   
    ![D](/img/m4/ssdlc_m4_default_context_03.png)
    Luego:  
    ![D](/img/m4/ssdlc_m4_default_context_04.png)
    Test:  
    ![D](/img/m4/ssdlc_m4_default_context_05.png)

    b. A continuación, dentro de las propiedades de la sesión debes configurar el formulario de autenticación.  
    ![D](/img/m4/ssdlc_m4_default_context_06.png)
    Autenticación basada en formulario:  
    ![D](/img/m4/ssdlc_m4_default_context_07.png)  

    Parámetros:  
    Login From Target URL *:  
    `http://dvwa/login.php`  
    URL to GET Login Page:  
    `http://dvwa/login.php`   
    Login Request POST Data (if any):  
    `username={%username%}&password={%password%}&Login=Login`  
    
    ![D](/img/m4/ssdlc_m4_default_context_08.png)  

    Luego...  

    ![D](/img/m4/ssdlc_m4_default_context_09.png)  

4. Descubrimiento autenticado  
    a. En el árbol Sites, haz clic derecho sobre el Context y elegir Spider.  
    b. Opción Scan as User: seleccionar dvwa-admin.  
    c. Verificar Only in Scope habilitado.  
    d. Ejecutar y esperar al 100 %.  
    
    ![D](/img/m4/ssdlc_m4_default_context_10.png)  

    Progreso...  

    ![D](/img/m4/ssdlc_m4_default_context_11.png)  

5. Escaneo activo autenticado  
    a. Abrir AJAX Spider desde el Context.  
    b. Scan as User: dvwa-admin.  
    c. In Scope Only activo y duración corta de prueba (por ejemplo 5 minutos).  

    ![D](/img/m4/ssdlc_m4_default_context_12.png)  
    
    ![D](/img/m4/ssdlc_m4_default_context_13.png)  
    
    ![D](/img/m4/ssdlc_m4_default_context_14.png)  

    d. En Sites, seleccionar el Context.  
    e. Attack > Active Scan.  
    f. Policy: Medium creada en laboratorios anteriores.  
    g. Scan as User: dvwa-admin.  
    h. Only in Scope y Recurse habilitados.  
    i. Iniciar y monitorear en Active Scan.  

    ![D](/img/m4/ssdlc_m4_default_context_15.png)  
    
    Progreso:  

    ![D](/img/m4/ssdlc_m4_default_context_16.png)  

6. Reporte e IA  
    a. Abrir Alerts y ordenar por Risk.  
    b. Report > Generate Report en HTML y JSON filtrados a In Scope    Only.   
    c. Guardar con nombre ZAP-DVWA-Auth-YYYYMMDD.html.  
    d. Qué hacer: Subir a la IA el reporte HTML exportado.  
    Copiar este prompt base y ejecutarlo:  
    ```bash title="prompt"
    Lee el reporte completo de ZAP adjunto.  
    Entregame:  
    Un resumen ejecutivo en 10 líneas para Dirección.  
    Una tabla con:  
    Vulnerabilidad, CWE/OWASP, Riesgo, Evidencia breve, Recomendación, Equipo owner, SLA sugerido.  
    Agrupación por OWASP Top 10 y CWE.  
    Cinco tickets de remediación en formato user story con criterios de aceptación, dependencia técnica y prioridad.  
    Lista priorizada de acciones rápidas de alto impacto (quick wins).
    ```
    Salida del reporte:  
    ![D](/img/m4/ssdlc_m4_reporte_active_scan.png)  

    Prompt:  

    ![D](/img/m4/ssdlc_m4_req_ia.png)  

    Salida:    
    
    ---
    ### Resumen Ejecutivo para Dirección

    El análisis DAST realizado con OWASP ZAP sobre la aplicación Damn Vulnerable Web Application identificó debilidades relacionadas principalmente con configuraciones inseguras de cabeceras HTTP, exposición de información tecnológica y ausencia de controles de protección web básicos.  
    No se detectaron vulnerabilidades críticas de explotación inmediata en este escaneo específico, aunque sí múltiples hallazgos de riesgo medio y bajo que aumentan la superficie de ataque.  
    Entre los principales riesgos se encuentran la ausencia de protección anti-clickjacking, falta de cabeceras anti MIME-sniffing y exposición de versiones del servidor Apache.  
    También se detectó ausencia de HTTPS/TLS para conexiones seguras, lo que permitiría interceptación de tráfico en entornos reales.
    Se observaron cookies sin atributo SameSite, incrementando riesgo de ataques CSRF.  
    El entorno expone información tecnológica como Apache, Debian y PHP mediante cabeceras y fingerprints HTTP.
    Los hallazgos se concentran mayormente en categorías OWASP relacionadas con Security Misconfiguration y Vulnerable & Outdated Components.  
    La remediación requerida es principalmente de configuración y endurecimiento (“hardening”) de infraestructura y servidor web.
    Se recomienda priorizar quick wins relacionados con headers de seguridad, ocultamiento de versiones y habilitación de HTTPS.  
    El riesgo global actual se considera “Moderado”, con bajo esfuerzo técnico de mitigación inicial.  

    | Vulnerabilidad | CWE / OWASP | Riesgo | Evidencia breve | Recomendación | Equipo owner | SLA sugerido |
    | --- | --- | --- | --- | --- | --- | --- |
    | Missing Anti-clickjacking Header      | CWE-1021 / OWASP A05 Security Misconfiguration | Medio       | Ausencia de `X-Frame-Options` o CSP `frame-ancestors`  | Configurar `X-Frame-Options: DENY` o CSP   | Infraestructura / Backend | 15 días      |
    | X-Content-Type-Options Header Missing | CWE-693 / OWASP A05                            | Bajo        | Falta header `X-Content-Type-Options: nosniff`         | Agregar header `nosniff` globalmente       | Infraestructura           | 30 días      |
    | Server Leaks Version Information      | CWE-497 / OWASP A05                            | Bajo        | Apache/2.4.25 (Debian) visible en headers              | Ocultar banner/versiones del servidor      | Infraestructura           | 30 días      |
    | Cookie Without SameSite Attribute     | CWE-1275 / OWASP A05                           | Bajo        | Cookie `security` sin atributo SameSite                | Configurar `SameSite=Lax` o `Strict`       | Backend                   | 30 días      |
    | HTTPS No Implementado                 | CWE-311 / OWASP A02 Cryptographic Failures     | Medio       | ZAP no pudo conectar vía HTTPS                         | Implementar TLS válido y redirección HTTPS | Infraestructura / DevOps  | 15 días      |
    | Exposición de tecnologías detectadas  | OWASP A05                                      | Informativo | Apache, Debian y PHP detectados                        | Reducir fingerprinting y banners           | Infraestructura           | 60 días |

    ### Agrupación por OWASP Top 10  
    OWASP A05:2021 – Security Misconfiguration  
    Missing Anti-clickjacking Header  
    X-Content-Type-Options Header Missing  
    Server Version Disclosure  
    Cookie Without SameSite  
    Technology Disclosure  
    OWASP A02:2021 – Cryptographic Failures  
    HTTPS no implementado  
    Transporte inseguro HTTP  

    ### Agrupación por CWE

    | CWE | Descripción | Hallazgos |
    | ----| ----------- | --------- |
    | CWE-1021 | Improper Restriction of Rendered UI Layers | Clickjacking |
    | CWE-693  | Protection Mechanism Failure | Missing nosniff |
    | CWE-497  | Exposure of System Data | Server Version Disclosure |
    | CWE-1275 | Sensitive Cookie Without SameSite | Cookies inseguras|
    | CWE-311  | Missing Encryption of Sensitive Data| Falta HTTPS |


    ### Tickets de Remediación (User Stories)
    
    ### TKT_01 Implementar protección anti-clickjacking  

    **Prioridad: Alta**  

    User Story:  
    Como usuario de la aplicación, quiero que las páginas estén protegidas contra clickjacking para evitar interacción maliciosa embebida en sitios externos.  

    Criterios de aceptación:  

    Header X-Frame-Options presente.  
    CSP frame-ancestors configurado.  
    Validación exitosa en ZAP.  

    Dependencia técnica:  

    Configuración Apache/Nginx.  
    
    ---
    
    ### TKT_02 Habilitar HTTPS/TLS  

    **Prioridad: Alta**  

    User Story:  
    Como usuario autenticado, quiero que todas las conexiones utilicen HTTPS para proteger mis credenciales y sesiones.  

    Criterios de aceptación:  

    Certificado TLS válido instalado.  
    Redirección HTTP → HTTPS.  
    Escaneo ZAP sin alerta CWE-311.  

    Dependencia técnica:  

    Certificados TLS.  
    Reverse proxy / Apache. 

    ---

    ### TKT_03 Agregar headers de seguridad HTTP

    **Prioridad: Media**  

    User Story:  
    Como responsable de seguridad, quiero que el servidor configure headers HTTP seguros para reducir riesgos de ataques web comunes.  

    Criterios de aceptación:  

    X-Content-Type-Options=nosniff  
    Referrer-Policy  
    Content-Security-Policy  

    Dependencia técnica:  

    Configuración servidor web.  

    ---

    ### TKT_04 Reducir exposición tecnológica  

    **Prioridad: Media**  

    User Story:  
    Como equipo de seguridad, quiero minimizar la información expuesta por el servidor para reducir fingerprinting.  

    Criterios de aceptación:  

    Header Server oculto.  
    Banner Apache reducido.  
    No exposición de versiones.  

    Dependencia técnica:  

    Apache hardening.  

    ---

    ### TKT_05 Endurecer cookies de sesión  

    **Prioridad: Media**  

    User Story:  
    Como usuario autenticado, quiero que las cookies tengan atributos de seguridad adecuados para prevenir abuso de sesión.  

    Criterios de aceptación:  

    HttpOnly  
    Secure  
    SameSite=Lax/Strict  

    Dependencia técnica:  

    Backend PHP/session manager.  

    ---

    ### Quick Wins Priorizados
    Agregar X-Frame-Options globalmente.  
    Configurar X-Content-Type-Options: nosniff.  
    Ocultar versiones Apache/PHP en headers HTTP.  
    Configurar SameSite=Lax en cookies de sesión.  
    Implementar HTTPS interno aunque sea con certificados autofirmados en ambientes no productivos.  
    Incorporar baseline scans automáticos de ZAP en CI/CD.  
    Crear checklist de hardening para servidores web.  
    Automatizar validación de security headers en pipeline DevSecOps.  
    Hallazgos basados en el reporte HTML generado por OWASP ZAP.  

---

Hemos llegado al final del módulo.  



















