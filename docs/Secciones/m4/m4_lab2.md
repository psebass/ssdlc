---
title: Laboratorio 2
slug: /modulo/modulo4/m4lab2
---

[Volver](/docs/modulo/modulo4/)

## Escaneo pasivo con OWASP ZAP
Detectar problemas sin interactuar agresivamente.  

### Consignas
1. Cargar el sitio mapeado en Lab 1 en ZAP.  
2. Navegar manualmente para generar tráfico.  
3. Revisar alertas del escaneo pasivo (cookies inseguras, headers faltantes, etc.).  
4. Generar un reporte HTML solo con findings de bajo y medio riesgo.  

---

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