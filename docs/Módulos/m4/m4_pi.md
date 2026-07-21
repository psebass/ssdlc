---
title: Proyecto Integrador
slug: /modulo/modulo4/m4pi
---

[Volver](/docs/modulo/modulo4/)

## Escenario
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