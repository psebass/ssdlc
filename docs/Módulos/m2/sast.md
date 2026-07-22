---
sidebar_position: 5
title: SAST
description: Conceptos sobre SAST.
keywords: [SSDLC, DevSecOps, SAST]
tags: [sast, dast, pruebas, seguridad, owasp, dependency check]
---

# SAST
Análisis Estático de Seguridad (SAST)


## Análisis Estático de Seguridad (SAST)

### SAST
El Análisis Estático de Seguridad de Aplicaciones (SAST) es una de las primeras líneas de defensa en el ciclo de vida del desarrollo seguro (Secure Software Development Life Cycle – SSDLC). Su objetivo es identificar  vulnerabilidades en el código fuente antes de la ejecución del software, mediante el examen automatizado del código estático.  

A diferencia del análisis dinámico (DAST), que evalúa aplicaciones en funcionamiento, el SAST permite detectar fallos desde las etapas tempranas del desarrollo, reduciendo el costo y el impacto de las correcciones.  

### SAST y su rol en el SSDLC
El SAST se integra en las fases iniciales del ciclo de desarrollo, especialmente durante la codificación y las pruebas unitarias. Su propósito es garantizar que el código cumpla con estándares de seguridad antes de pasar a
etapas más avanzadas.  

### Principales beneficios dentro del SSDLC
● **Detecta** vulnerabilidades de forma temprana, antes del despliegue.  
● **Reduce** el costo de remediación en comparación con los hallazgos en producción.  
● **Mejora** la calidad general del código y refuerza la seguridad del producto final.  
● **Permite** aplicar políticas de cumplimiento (por ejemplo, OWASP, ISO 27034 o NIST SP800-53).  

**Ejemplos de vulnerabilidades que SAST puede detectar:**
● Inyección SQL o de comandos.  
● Cross-Site Scripting (XSS).  
● Uso inseguro de funciones criptográficas.  
● Accesos no controlados a archivos o rutas.  
● Validación deficiente de entradas del usuario  

En el marco del SSDLC, el SAST no sustituye otras prácticas de seguridad, sino que complementa la revisión manual, las pruebas dinámicas y las auditorías de dependencias.  

![Descripción](/img/m2/ssdlc_m2_reqdeim.png)

## Incorporación de SAST en pipelines CI/CD

Integrar el análisis SAST dentro de los pipelines de Integración Continua y Entrega Continua (CI/CD) es clave para automatizar la detección de vulnerabilidades sin interrumpir el flujo de desarrollo.  

### Buenas prácticas para su implementación
* Ejecutar análisis SAST automáticamente con cada commit o merge request.
* Configurar reglas para bloquear despliegues si se detectan vulnerabilidades críticas.
* Generar reportes centralizados y trazables por rama o entorno.
* Notificar a los desarrolladores sobre findings en tiempo real (por ejemplo, vía GitLab, Jenkins o GitHub Actions).
* Mantener políticas diferenciadas según criticidad (por ejemplo, “falla el pipeline si hay CVE alta o crítica”).

_La automatización convierte la seguridad en un paso natural del ciclo DevOps, eliminando la fricción entre desarrollo y cumplimiento._

<!-- SAST 8/60 -->
## SAST, DAST y SCA: seguridad integral en el SSDLC
El Análisis Estático de Seguridad (SAST) constituye la primera línea de defensa, pero no es suficiente para cubrir todas las posibles vulnerabilidades del ciclo de vida del desarrollo seguro (SSDLC).  
Para alcanzar una estrategia de seguridad completa, deben integrarse también el Análisis Dinámico de Seguridad de Aplicaciones (DAST) y el Análisis de Composición de Software (SCA).  

### SAST – Código bajo la lupa
Analiza el código fuente o binario antes de su ejecución. Permite detectar vulnerabilidades estructurales y errores lógicos en fases tempranas del desarrollo, lo que reduce el costo de corrección y mejora la calidad del producto 
final.  

### DAST – Pruebas sobre la aplicación en ejecución
Evalúa la seguridad de la aplicación cuando ya está desplegada o ejecutándose en un entorno controlado.
Simula ataques externos —como Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), inyecciones o configuraciones inseguras— para identificar vulnerabilidades que solo pueden detectarse en tiempo de ejecución.  
Las herramientas más utilizadas incluyen OWASP ZAP, Burp Suite y Acunetix.  

### SCA – Auditoría de componentes externos
El Software Composition Analysis detecta vulnerabilidades conocidas en librerías y dependencias de terceros. Estas suelen ser la causa principal de exploits modernos, dado que muchas aplicaciones reutilizan componentes
open source sin auditorías adecuadas. Herramientas como Snyk, Dependabot o OWASP Dependency-Check permiten automatizar la detección de CVEs en dependencias y verificar licencias de uso.  

### Integración de los tres enfoques
● SAST: identifica vulnerabilidades en el código propio.  
● SCA: audita los componentes reutilizados.  
● DAST: verifica el comportamiento seguro en tiempo de ejecución.  

![texto_alternativo](/img/m2/ssdlc_m2_dast_sast.png)

### Buenas prácticas de integración avanzada
● **Ejecutar análisis SAST y SCA en cada push o merge request; ejecutar DAST en entornos staging o preproducción.**  
● Bloquear el despliegue si el pipeline detecta vulnerabilidades críticas (Quality Gate).  
● Enviar notificaciones automáticas a Slack, Teams o correo ante findings nuevos.  
● Mantener reportes históricos centralizados (por ejemplo, en SonarQube o **[GitLab Security Dashboard][ref1] ![icono]**).  

## Instalación y configuración de SonarQube
SonarQube es una de las herramientas más utilizadas para implementar análisis SAST.  
Permite evaluar calidad y seguridad del código mediante reglas predefinidas o personalizadas.  

### Pasos generales de instalación
1. Descargar e instalar SonarQube Server (versión Community, Developer o Enterprise).
2. Configurar la base de datos (PostgreSQL es la más recomendada).
3. Instalar el scanner correspondiente (por ejemplo, SonarScanner o plugin de Jenkins).
4. Definir las credenciales de acceso y token de autenticación.
5. Configurar las propiedades del proyecto en el archivo **sonar-project.properties**.

Para ejecutar un análisis de SonarQube Server se necesitan tres componentes:

![Componentes de instancia SQ](/img/m2/ssdlc_m2_sq3comp.png)

### Configuraciones recomendadas
● Activar las reglas de seguridad de OWASP Top 10.
● Integrar autenticación con el repositorio(GitHub, GitLab, Bitbucket).
● Establecer umbrales mínimos de calidad (“quality gates”).
● Programar análisis automáticos y revisiones manuales de findings críticos.
SonarQube permite visualizar de manera clara los puntos débiles del código y priorizar acciones de mejora desde un panel centralizado.

### Instalación vía Docker

```dockerfile title="dockerfile"
docker run -d --name sonarqube \
-p 9000:9000 \
sonarqube:lts-community
```
Una vez levantado el contenedor, SonarQube estará disponible en http://localhost:9000.  
El usuario y contraseña por defecto son:
```bash title="bash"
Usuario: admin
Contraseña: admin
```
### Acceso desde interfaz gráfica
● Ingresar a la URL anterior y cambiar la contraseña al primer inicio de sesión.  
● Crear una organización y un nuevo proyecto.  
● Seleccionar el método de análisis (por ejemplo, SonarScanner, Maven, Gradle, o integración con Jenkins).  

### Creación de un proyecto
● Desde la interfaz, elegir Create Project > Manually.  
● Definir un Project Key y un Display Name.  
● Generar un token de autenticación (este se utilizará en el análisis local o dentro de pipelines).  

### Análisis local de un código
Ejemplo con SonarScanner ejecutado en la carpeta que contiene el código a analizar:  

```bash title="bash"
sonar-scanner \
 -Dsonar.projectKey=mi-proyecto \
 -Dsonar.sources=. \
 -Dsonar.host.url=http://localhost:9000 \
 -Dsonar.login=mi_token
```

### Integración con Jenkins (pipeline)
En el pipeline script, se puede incluir el análisis así:  
```groovy title="Jenkinsfile"
stage('SonarQube analysis') {
    steps {
        withSonarQubeEnv('SonarQubeServer') {
            sh 'mvn sonar:sonar'
        }
    }
}
```

Y para el paso posterior de verificación de calidad:
```groovy title="Jenkinsfile"
stage('Quality Gate') {
    steps {
        timeout(time: 1, unit: 'HOURS') {
            waitForQualityGate abortPipeline: true
        }
    }
}
```
### Verificación
Una vez ejecutado el análisis (local o desde Jenkins), los resultados estarán disponibles en la interfaz web: métricas de calidad, seguridad, duplicación y cobertura.  

# Análisis de código con SonarCloud
SonarCloud es la versión en la nube de SonarQube. Permite analizar proyectos alojados en GitHub, GitLab, Bitbucket o Azure DevOps, sin necesidad de instalar un servidor local.  

### Pasos para configurar y ejecutar un análisis:
1. Acceso e integración con GitHub
    ● Ingresar a https://sonarcloud.io y autenticarse con la cuenta de GitHub.  
    ● Autorizar el acceso a los repositorios de la organización o usuario.  
2. Importar el proyecto
    ● Seleccionar el repositorio a analizar y crear el proyecto en SonarCloud.  
    ● Se generará automáticamente un token de análisis.  
3. Configurar el análisis local:
    ```bash title="bash"
    sonnar-scanner \
       -Dsonar.projectKey=mi-proyecto \
       -Dsonar.organization=mi-organizacion \
       -Dsonar.sources=. \
       -Dsonar.host.url=https://sonarcloud.io \
       -Dsonar.login=mi_token
    ```
4. Integración con GitHub Actions  
   En el archivo .github/workflows/sonarcloud.yml:  
```yaml title="yaml"
name: SonarCloud
on:
  push:
    branches: [ "main" ]
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

5. Revisión de resultados
    ● Una vez ejecutado el workflow, los resultados del análisis aparecerán en el panel de SonarCloud, con métricas de seguridad, calidad, duplicación y cobertura.  
    ● Los findings críticos se mostrarán también como comentarios en los pull requests.  

## Uso de Semgrep con reglas OWASP
Semgrep es una herramienta ligera y de código abierto que combina velocidad con precisión en la detección de vulnerabilidades.  
Analiza el código fuente utilizando reglas estáticas que pueden adaptarse a las necesidades de cada equipo.  

[Conocer más de Semgrep][ref2] ![icono]

### Características destacadas
● Soporta múltiples lenguajes (Python, JavaScript, Go, Java, C#, PHP, entre otros).  
● Permite crear reglas personalizadas con sintaxis sencilla.  
● Se integra fácilmente en CI/CD y en IDEs locales.  

### Aplicación práctica con OWASP
Hay varias formas, presento dos de las más usuales.  
Instalarlo con pip (más simple para pruebas).  
Usarlo en un contenedor con Podman (mejor para entornos controlados o CI/CD).  
● Instalar Semgrep: 
  En entorno local:  ```pip install semgrep```   
  En contenedores con Podman (mejor corporativo):  
  ```bash title="bash"
    podman run --rm -v $(pwd):/src returntocorp/semgrep semgrep --config=p/python /src
  ```  
● Ejecutar escaneos con reglas oficiales:  
```bash title="bash"
semgrep --config "p/owasp-top-ten" .
```
● Analizar el resultado y clasificar los findings según su severidad.  
● Añadir excepciones o reglas personalizadas para falsos positivos.  

### Beneficio
Semgrep permite al equipo alinear su análisis SAST con las recomendaciones OWASP Top 10, manteniendo una detección proactiva y eficiente.  

### Ejemplo de uso de Semgrep con reglas OWASP
| Acción | Comando (shell) | Comando (Docker) | Notas |
| --- | --- | --- | --- |
| Instalación (pip) | ```pip install semgrep``` | — | Instala la CLI en el entorno Python. |
| Instalación (imagen Docker) | — | ```docker pull returntocorp/semgrep``` | Trae la imagen oficial si prefieres usar Docker. |
| Ejecución básica sobre un proyecto local | ```semgrep --config p/owasp-top-ten .``` | ```docker run --rm -v "${PWD}:/src"``` ```returntocorp/semgrep```  ```semgrep --config=p/owasp-top-ten /src```   | Escanea todo el directorio actual con las reglas OWASP Top Ten. . o /src es la ruta a escanear. | 
| Revisión con OWASP Top Ten (comando alternativo) | ```semgrep --config "p/owasp-top-ten"``` | ```docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep --config="p/owasp-top-ten" /src``` | --config acepta el paquete remoto p/ wasp-top-ten. Añadir . al final para escanear el directorio actual. |
| Usar reglas locales / variaciones de configuración | ```semgrep --config ./rules/ .semgrep --config p/owasp-top-ten --config ./rules/custom.yml .``` | ```docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep --config=./rules/ /src``` | Semgrep acepta rutas a carpetas/archivos de reglas y múltiples --config. Útil para combinar reglas oficiales y reglas propias. | 
| Extraer reporte en JSON (stdout redirigido) | ```semgrep --config p/owasp-top-ten --json > semgrep-report.json``` | ```docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep --config=p/owasp-top-ten --json /src > semgrep-report.json ```| Genera un fichero JSON con los hallazgos. |
| Extraer reporte usando opción --output | ```semgrep --config p/owasp-top-ten --json --output semgrep-report.json``` | ```docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep --config=p/owasp-top-ten --json --output semgrep-report.json /src``` | Alternativa que escribe directo en archivo. |
| Extraer reporte en SARIF (para integraciones CI/IDE) | ```semgrep --config p/owasp-top-ten --sarif > semgrep-report.sarif``` | igual que JSON pero con --sarif | SARIF es útil para subir a sistemas que consumen SARIF (sonarqube, GitHub Code Scanning, etc.). |
| Comando para ejecutar múltiples configuraciones en cola | ```semgrep --config p/owasp-top-ten --config ./rules/custom.yml .``` | igual vía Docker | Ejecuta las reglas en el orden indicado (útil para combinar reglas públicas y privadas). |


Ejemplo:
En el directorio de la app, abrimos un terminal y ejecutamos:
```powershell title="powershell"
$env:PYTHONUTF8=1
semgrep --config=auto .
```

La primer línea ejecuta semgrep con utf-8 forzado.

```bash title="bash"
set PYTHONUTF8=1
semgrep --config=auto .
```

![Muestra de la consola](/img/m2/ssdlc_m2_powout.png)

Para este caso se ha detectado un posible problema de seguridad.  
Semgrep detectó un formulario HTML sin protección CSRF.  
El escáner cree que la aplicación podría ser Cross-Site Request Forgery (CSRF) vulnerable.
CSRF ocurre cuando:  
* Un usuario autenticado visita un sitio malicioso.
* Ese sitio envía una petición POST a tu aplicación.
* Tu aplicación la acepta porque no verifica un token CSRF.
* Resultado: el atacante puede ejecutar acciones en nombre del usuario.


## Automatizando la seguridad en el pipeline
Para asegurar que la detección y gestión de vulnerabilidades formen parte natural del flujo DevOps, es necesario integrar SAST, DAST y SCA dentro del pipeline de CI/CD. Esto garantiza que cada commit, build o release sea evaluado bajo los mismos criterios de seguridad.  

### Ejemplo – GitHub Actions
Archivo de configuración para utilizar en GitHub Actions:  
```yaml title="yaml"
name: SAST Scan
on: [push, pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Run Semgrep Scan
        uses: returntocorp/semgrep-action@v1
        with:
          config: "p/owasp-top-ten"
```

Su propósito es automatizar un análisis de seguridad estático (SAST) cada vez que subes código a tu repositorio, usando una herramienta llamada Semgrep.  

## Desglose
### Configuración del Flujo (Workflow)  
* ```name: SAST Scan```  
Es el nombre del flujo de trabajo. Así aparecerá en la pestaña "Actions" de tu repositorio en GitHub.  

* ```on: [push, pull_request]```  
Define los eventos que disparan el código. Se ejecutará automáticamente cada vez que alguien haga un push o abra un pull_request.  

### Definición del Trabajo (Job)
* ```jobs:```  
Aquí comienza la lista de tareas que se van a ejecutar.  

* ```sast:```  
Es el identificador único que le das a este trabajo específico (puedes llamarlo como quieras, en este caso "sast").  

* ```runs-on: ubuntu-latest```  
Especifica la "máquina virtual" donde se correrá el código. En este caso, usará la versión más reciente de Ubuntu.  

### Pasos de Ejecución (Steps)
* ```steps:```  
La lista secuencial de acciones que la máquina virtual debe realizar.  

1. Checkout code

* ```uses: actions/checkout@v3```  
  Esta acción oficial de GitHub clona tu repositorio dentro de la máquina virtual para que las herramientas de análisis puedan leer tus archivos.  

2. Run Semgrep Scan

* ```uses: returntocorp/semgrep-action@v1```   
  Llama a la acción oficial de Semgrep.  

* ```config: "p/owasp-top-ten"```  
  Configura el escáner para que busque específicamente vulnerabilidades que coincidan con el Top 10 de OWASP (los 10 riesgos de seguridad web más críticos).  

3. Upload report  

* ```uses: actions/upload-artifact@v3```  
  Esta acción guarda archivos generados durante el proceso.  

* ```name: semgrep-report```  
  El nombre que tendrá el paquete descargable.  

* ```path: semgrep.sarif```  
  Indica la ruta del archivo que se va a guardar. El formato SARIF es el estándar para resultados de análisis estático.  

<!-- Wednesday, 11/03/2026 22:07 -->
<!-- 35/60 SAST -->
### Ejemplo – GitLab CI
```yaml title="yaml"
sast:
  stage: security
  image: registry.gitlab.com/security-products/sast:latest
  script:
    - /analyzer run
  allow_failure: false
  artifacts:
  reports:
  sast: gl-sast-report.json
``` 

### Ejemplo – Jenkins Pipeline (Declarativo)
```groovy title="Jenkins Pipeline DSL (Domain-Specific Language) Groovy"
stage('SAST') {
  steps {
    sh 'semgrep --config p/owasp-top-ten --json > report.json'
    publishHTML([reportDir: '.', reportFiles: 'report.html', reportName: 'SAST Report'])
 }
}
```

## Escaneo de código
El proceso de escaneo de código consiste en analizar automáticamente el repositorio para detectar patrones inseguros. Este proceso debe integrarse tanto en entornos locales como en pipelines automatizados.  

### Fases del escaneo
1. Identificación de archivos y lenguajes compatibles.  
2. Aplicación de reglas estáticas y reglas personalizadas.  
3. Evaluación de dependencias y librerías externas.  
4. Generación de reportes de findings con niveles de severidad.  

### Buenas prácticas
● Mantener las reglas actualizadas y alineadas con OWASP Top 10 y CWE.  
● Escanear tanto ramas principales como feature branches.  
● Documentar los resultados y establecer métricas (porcentaje de findings críticos por release).  

## Revisión de findings
Una vez realizado el escaneo, se debe analizar cada finding (hallazgo) para determinar su validez, severidad y plan de remediación. No todos los findings implican vulnerabilidades reales, por lo que es esencial priorizar y filtrar.  

### Flujo recomendado
1. Clasificar findings por severidad: crítica, alta, media, baja, informativa.  
2. Validar manualmente los hallazgos más importantes.  
3. Documentar decisiones sobre falsos positivos o riesgos aceptados.  
4. Asignar responsables para la corrección.  
5. Reejecutar el análisis después de la remediación.  

### Objetivo final
Transformar los hallazgos en acciones concretas de mejora, manteniendo la trazabilidad de cada
corrección dentro del repositorio o herramienta de seguimiento.  

## De la detección a la priorización
Identificar vulnerabilidades no es suficiente: se requiere un proceso estructurado de clasificación, priorización y remediación.  
Para ello, las organizaciones combinan tres marcos de referencia:  
* [CVSS][ref3] ![icono]
* [CWE][ref4] ![icono]
* [OWASP Top 10.][ref5] ![icono]

<!-- SAST 42/60 -->
<!-- Thursday, 12/03/2026 19:04 -->

### CVSS (Common Vulnerability Scoring System)
Establece un puntaje de severidad entre 0.0 y 10.0 considerando factores como impacto,
explotabilidad y alcance.  

| Impacto | Explotabilidad | Alcance |
|---|---|---|
| Crítica | `(9.0–10.0)`| Riesgos que comprometen el sistema o los datos de manera total.|
| Alta | `(7.0–8.9)` | Requieren atención prioritaria.|
| Media | `(4.0–6.9)` | Afectan funcionalidad, pero con mitigaciones posibles.|
| Baja | `(<4.0)` | No representan amenaza inmediata, pero deben monitorearse.|


### [CWE (Common Weakness Enumeration)][ref4] ![icono]
Brinda un catálogo de debilidades comunes en el software, asignando un identificador (por
ejemplo, CWE-89 para Inyección SQL o CWE-79 para XSS).  
Permite documentar con precisión el tipo de fallo y establecer métricas históricas de reincidencia.  

### [OWASP Top 10][ref5] ![icono]
Es una clasificación global de las vulnerabilidades más frecuentes y con mayor impacto.  
Su uso en combinación con CVSS y CWE permite definir políticas de priorización automáticas dentro del pipeline.  

### Ejemplo de tabla integrada
| Tipo de vulnerabilidad | CWE-ID | OWASP Top 10 | Severidad CVSS | Ejemplo de detección |
|---|---|---|---|---|
|Inyección SQL | CWE-89 | A03:2021 | 9.8 (Crítica) | Parámetros no validados en consultas |
| Exposición de datos sensibles | CWE-200 | A02:2021 | 8.2 (Alta) | Logs o respuestas HTTP con datos personales |
| Cross-Site Scripting (XSS) | CWE-79 | A03:2021 | 7.5 (Alta) | Uso de innerHTML con input del usuario | 
| Validación insuficiente | CWE-20 | A01:2021 | 6.4 (Media) | Falta de sanitización en formularios |
| Configuración insegura | CWE-16 | A05:2021 | 5.9 (Media) | Endpoints administrativos expuestos |


## Buenas prácticas
● Mantener un repositorio interno de findings, con métricas de frecuencia y severidad.  
● Automatizar la clasificación por CVSS y CWE desde el pipeline.  
● Priorizar la remediación de vulnerabilidades Críticas y Altas antes de cada release.  
● Revisar los resultados trimestralmente contra el OWASP Top 10 actualizado.  
● Integrar CVSS, CWE y OWASP permite transformar el hallazgo técnico en una decisión de riesgo cuantificable y gestionable.  

## IA para snippets de corrección
La inteligencia artificial se ha convertido en un aliado estratégico dentro del proceso de
remediación de vulnerabilidades.  
Su capacidad para analizar el contexto del código y generar snippets de corrección automáticos  permite reducir significativamente los tiempos de respuesta ante hallazgos detectados por herramientas SAST o revisiones manuales.  

### Aplicaciones más comunes
● **Sugerencias automáticas dentro del IDE**: la IA propone correcciones seguras en tiempo real, basadas en patrones validados y estándares de codificación segura.  
● **Explicaciones contextualizadas**: además del fix, ofrece una descripción comprensible del riesgo asociado, facilitando la comprensión del problema.  
● **Generación de patches automatizados**: crea fragmentos de código correctivo basados en ejemplos
de remediaciones previas o en políticas internas del equipo.  

### Principales beneficios
● Acelera la remediación de vulnerabilidades recurrentes, como validaciones de entrada, cifrado o gestión de sesiones.  
● Estandariza las prácticas seguras, garantizando coherencia entre distintos desarrolladores y proyectos.  
● Optimiza la curva de aprendizaje, al ofrecer correcciones explicadas paso a paso que fortalecen la formación del equipo.  

<div class="contenedor-oscuro"> 
    La IA no reemplaza la revisión humana, pero actúa como un asistente técnico de refuerzo,
    mejorando la eficiencia, la consistencia y la calidad del código seguro dentro del ciclo de
    desarrollo.  
</div>

## C5: Configuraciones seguras por defecto
El control C5 del Application Security Verification Standard (ASVS) de OWASP establece que toda
aplicación debe implementarse con configuraciones seguras por defecto, sin requerir que el usuario final realice ajustes adicionales para garantizar su protección.  
Esto significa que los parámetros iniciales del sistema deben minimizar la superficie de ataque y evitar configuraciones inseguras o permisivas.  


### Buenas prácticas
● Deshabilitar servicios o puertos innecesarios que no aporten valor al entorno productivo.  
● Aplicar el principio de mínimo privilegio en permisos, roles y ejecuciones de procesos.  
● Configurar por defecto opciones de cifrado, autenticación y logging seguro.  
● Restringir el acceso a información sensible y ocultar rutas administrativas o endpoints internos.  


### Herramientas sugeridas por OWASP para C5
OWASP recomienda el uso de diversas herramientas que facilitan la verificación de configuraciones seguras y el cumplimiento de los controles ASVS.  

## OWASP Dependency-Check
Analiza bibliotecas y dependencias de un proyecto para detectar vulnerabilidades conocidas (CVE). Comando de ejemplo:  
```bash title="bash"
dependency-check --scan . --format HTML --out ./report
```
Permite garantizar configuraciones seguras de librerías externas y evitar versiones con fallos críticos.  

### Instalación en Win
Requisitos:
1. Java JRE o JDK >=11.0 (verificar con `java -version`)
   - [Java 21][ref7] ![icono]
2. Descargar la herramienta cli desde [GitHub][ref6]![icono] y extraer por ejemplo en la ruta: `C:\tools\dependency-check`
3. Configurar la variable de entorno.
   - Agregar la ruta a la carpeta bin (ejemplo `C:\tools\dependency-check\bin`) a la variable de entorno Path del sistema Windows.  
    ```cmd title="cmd"
      setx /M PATH "%PATH%;C:\ruta\a\tu\dependency-check\bin"
    ```
    ```powershell title="powershell (adm)"
      $oldPath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
      $newPath = "$oldPath;C:\ruta\a\tu\dependency-check\bin"
      [System.Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
    ```
    Muestra:
    ![Descripción](/img/m2/ssdlc_m2_java+owasdc.png)
4. Ejecutar el escaneo:
   - Abra la terminal (Símbolo del sistema o PowerShell).
   - Ejecute el siguiente comando para analizar un proyecto:
```dependency-check.bat --project "NombreProyecto" --scan "C:\ruta\a\tu\codigo" --out "C:\ruta\de\reportes"```


### Muestra del reporte de salida
![Descripción](/img/m2/ssdlc_m2_dcr_eport.png)


## OWASP ZAP (Zed Attack Proxy)
Herramienta de análisis dinámico (DAST) que detecta configuraciones inseguras y vulnerabilidades comunes en entornos web.  
Comando de ejemplo:  
```bash title="bash"
zap.sh -cmd -quickurl http://localhost:8080 -quickout report.html
``` 

Se utiliza para validar que los endpoints y servicios no expongan información sensible o configuraciones por defecto inseguras.  

## [OWASP Security Headers][ref8] ![icono]
Permite verificar que las aplicaciones web envíen encabezados HTTP de seguridad adecuados, como
X-Content-Type-Options, X-Frame-Options o Strict-Transport-Security.  
Disponible en: https://securityheaders.com
Es útil para evaluar configuraciones por defecto en servidores y frameworks.  


## [CIS-CAT Lite (Center for Internet Security)][ref9] ![icono]
Aunque no pertenece directamente a OWASP, es una herramienta complementaria muy utilizada para validar configuraciones seguras en sistemas operativos y entornos de servidor.  
Evalúa el cumplimiento con los benchmarks de seguridad del CIS y ayuda a detectar parámetros inseguros por defecto.  


## C6: Mantener seguros tus componentes
El control C6 del estándar OWASP ASVS enfatiza la importancia de mantener todos los componentes de los software actualizados y libres de vulnerabilidades conocidas. Esto incluye librerías, frameworks, módulos, contenedores y cualquier dependencia externa. Los atacantes suelen explotar fallas en componentes obsoletos o no parcheados, por lo que la gestión activa de dependencias se considera una medida crítica de defensa preventiva.  


### Recomendaciones esenciales
● Utilizar gestores de dependencias con análisis integrado de vulnerabilidades, como npm audit, pip-audit o Snyk.  
● Definir políticas de actualización periódica, documentando las versiones aprobadas y los criterios de cambio.  
● Evitar el uso de librerías sin mantenimiento activo o sin firma digital verificable.  
● Automatizar escaneos de dependencias dentro del pipeline de CI/CD para identificar riesgos en tiempo real.  

### Mejores prácticas OWASP relacionadas
El control C6 del ASVS se relaciona directamente con el Proactive Control #8: Secure Dependencies, que establece la importancia de gestionar las dependencias de forma segura para evitar vulnerabilidades conocidas en librerías y frameworks.  
También se vincula con el Proactive Control #9:  
Implement Security Logging and Monitoring, ya que un sistema de componentes actualizados facilita la detección temprana de comportamientos anómalos o ataques.  


### Buenas prácticas según OWASP
1. Identificar librerías y componentes confiables
● Utilizar fuentes oficiales o repositorios verificados (PyPI, npm, Maven Central).  
● Ejecutar escaneos con herramientas como OWASP Dependency-Check, Snyk, npm audit o pip-audit para detectar vulnerabilidades conocidas (CVE).  
● Mantener un inventario actualizado de dependencias y versiones aprobadas por el equipo de seguridad.  

2. Mantener los componentes seguros y actualizados
● Definir políticas de actualización periódicas y revisiones de seguridad automatizadas en los pipelines de CI/CD.  
● Configurar alertas automáticas ante vulnerabilidades críticas.  
● Evitar dependencias sin mantenimiento activo o sin firma digital verificable.  
● Documentar los criterios para actualizar o reemplazar librerías, considerando compatibilidad y riesgo.  






<!-- Referencias -->
[ref1]:https://www.youtube.com/watch?v=Uo-pDns1OpQ
[ref2]:https://semgrep.dev/
[ref3]:https://www.first.org/cvss/v4.0/specification-document
[ref4]:https://cwe.mitre.org/
[ref5]:https://owasp.org/Top10/2025/
[ref6]:https://github.com/dependency-check/DependencyCheck/releases
[ref7]:https://www.oracle.com/java/technologies/downloads/#jdk21-windows
[ref8]:https://securityheaders.com
[ref9]:https://learn.cisecurity.org/cis-cat-lite
[icono]:/img/external-link.svg




