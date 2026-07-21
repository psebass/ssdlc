---
sidebar_position: 13
title: Tokens CSRF únicos
slug: /modulo/modulo5/tkn
---

[Volver](/docs/modulo/modulo5/byp)
## Menú de Soluciones
Se puede orientar mostrando esa "activación" en los entornos más comunes con los siguientes ejemplos.  

### Opción A: Si usan frameworks basados en Backend (MVC / SSR)  
Aquí el framework se encarga de todo, genera el token en la sesión y lo inyecta en el HTML.  

<span style={{backgroundColor: 'darkblue', width: 'auto'}}>**Java / Spring Security**</span>  
* Viene habilitado por defecto.  
* Si usan Thymeleaf en el frontend, el token se incluye automáticamente en cada formulario POST.  
* Solo deben asegurarse de no tener un <span style={{backgroundColor: 'darkred', width: 'auto'}}> `.csrf().disable()` </span> en su clase de configuración de seguridad.  

<span style={{backgroundColor: 'darkblue', width: 'auto'}}>**Python / Django**</span>  
* También viene habilitado por defecto.
* El desarrollador solo debe agregar la etiqueta <span style={{backgroundColor: 'darkgreen', width: 'auto'}}> `{% csrf_token %}` </span> dentro del formulario HTML.  


<span style={{backgroundColor: 'darkblue', width: 'auto'}}>**Node.js / Express**</span> 
* Se suele utilizar el middleware oficial [**`csurf csurf`**][ref1] ![icono] (o alternativas modernas como [**`@fastify/csrf-protection`**][ref2] ![icono]).
* Se monta como un middleware global y luego se pasa el token a la vista (**`req.csrfToken()`**).  

### Opción B: Si usan Arquitecturas Desacopladas (Single Page Applications + APIs)
Si usan React, Angular o Vue en el frontend, y un backend separado (Node, Go, .NET), el enfoque de "formulario HTML tradicional" cambia.  

### El patrón Cookie-to-Header
* Explicar que el backend genera el token y lo envía en una cookie legible por el frontend (ej. <span style={{backgroundColor: 'darkgreen', width: 'auto'}}>**XSRF-TOKEN**</span>).
* El framework de frontend (como Angular, que lo hace solo, o Axios configurado en React) lee esa cookie y la devuelve automáticamente en una cabecera HTTP (ej. <span style={{backgroundColor: 'darkgreen', width: 'auto'}}>**X-XSRF-TOKEN**</span>) en cada petición POST/PUT. 
* El backend valida que la cabecera coincida con la sesión.

### Oferta de Valor
Para facilitar el trabajo, pensar en crear un repositorio central de seguridad (**ssdlc_devsecops_docs**/[Nombre de tu repositorio interno]) y subir snippets de código listos para copiar y pegar para los frameworks que más usamos en la empresa.  
Tomar el código, pegar en el archivo de configuración y el pipeline de CI/CD te va a dar el visto bueno automáticamente.  


<!-- Refs -->
[icono]: /img/external-link.svg
[ref1]: https://www.npmjs.com/package/csrf-csrf
[ref2]: https://github.com/fastify/csrf-protection