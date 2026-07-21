---
title: Laboratorio 1
slug: /modulo/modulo4/m4lab1
---

[Volver](/docs/modulo/modulo4/)

## Descubrimiento con OWASP ZAP
### Spider Tradicional y Spider AJAX
Identificar y delimitar la superficie de ataque de una aplicación web, comparando qué descubre Spider vs AJAX Spider, para decidir qué partes priorizar en los escaneos y pruebas posteriores.  

### Consignas
1. Configurar OWASP ZAP como proxy.  
2. Usar Spider tradicional y Ajax Spider para mapear el sitio (Juice Shop: https://juice-shop.herokuapp.com/).  
3. Comparar resultados y detectar secciones ocultas.  

---

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