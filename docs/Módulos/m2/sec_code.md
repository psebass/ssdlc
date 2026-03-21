---
sidebar_position: 6
title: Código Seguro
description: Desarrollo de código seguro.
keywords: [SSDLC, DevSecOps, SAST]
tags: [sast, dast, pruebas, seguridad, owasp, dependency check]
---

# Código Seguro

## Revisión de código
La revisión de código es una práctica esencial dentro del desarrollo seguro de software, cuyo objetivo es evaluar la calidad, seguridad y mantenibilidad del código fuente antes de que llegue a producción.  
No se trata solo de buscar errores sintácticos o de estilo, sino de identificar vulnerabilidades, malas prácticas de programación y deficiencias en la lógica de negocio que puedan derivar en riesgos de seguridad.  

### Este proceso cumple tres funciones clave 
● Prevenir vulnerabilidades desde la base, corrigiendo fallos antes del despliegue.  
● Mejorar la calidad del software, promoviendo estándares de codificación consistentes.  
● Fomentar el aprendizaje entre desarrolladores, al compartir conocimiento y patrones seguros.  
La revisión de código puede realizarse de manera manual o automatizada, y en entornos maduros ambas se integran en los pipelines de CI/CD para que la seguridad forme parte natural del flujo de desarrollo.  

## Revisión manual
La revisión manual implica el análisis directo del código fuente por parte de revisores humanos, generalmente desarrolladores senior o especialistas en seguridad. Este enfoque permite una evaluación profunda del contexto, más allá de lo que pueden detectar las herramientas automáticas.  

### Aspectos que se analizan comúnmente 
● Cumplimiento de estándares internos y guías de estilo seguras.  
● Correcto manejo de errores, excepciones y validaciones.  
● Uso adecuado de librerías y dependencias externas.  
● Coherencia entre la intención del código y su comportamiento real.  
● Riesgos de exposición de datos o fugas de información sensible.  


### Hallazgos típicos en revisiones manuales
Durante las revisiones manuales de código es común identificar problemas que las herramientas automáticas no detectan con precisión. Algunos ejemplos son:  
● Contraseñas o claves hardcodeadas, como usuarios, contraseñas o tokens embebidos directamente en el código fuente.  
● Datos sensibles expuestos, tales como credenciales de bases de datos, llaves API, secretos de  autenticación o certificados sin cifrar.  
● Configuraciones inseguras en archivos de entorno (por ejemplo, .env, config.yaml o application.properties) con permisos amplios o rutas a entornos de prueba visibles.  
● Errores en el manejo de excepciones o logs, donde se imprimen datos confidenciales en consola o en archivos de registro.  
● Uso inadecuado de librerías o frameworks inseguros, sin validación de versiones o sin control de dependencias.  
● Falta de validación de entrada y salida, lo que puede dar lugar a inyecciones SQL, XSS o deserialización insegura.  

## Proceso de revisión seguridad
La revisión de código no es solo una técnica, sino una práctica cultural dentro de los equipos de
desarrollo seguro. Implica colaboración, aprendizaje continuo y responsabilidad compartida sobre la calidad del software.  
Un proceso de revisión eficaz combina experiencia técnica con comunicación abierta y estándares claros.  


### Roles principales dentro de la revisión
● Autor del código: responsable de aplicar buenas prácticas antes del envío a revisión y
de responder observaciones.  
● Revisor técnico: evalúa la lógica, consistencia y seguridad del código, identificando posibles
riesgos.  
● Code Owner: valida los cambios finales y aprueba el merge conforme a las políticas del repositorio.  
● Security Champion: actúa como referente en temas de seguridad, apoyando la detección de patrones inseguros y el uso de herramientas.  


### Prácticas efectivas de revisión segura
● Establecer un formato estándar de comentarios y criterios de aprobación.  
● Realizar revisiones cruzadas entre miembros del equipo para evitar sesgos.  
● Documentar hallazgos y registrar métricas de revisión (defectos detectados, tiempo promedio, porcentaje de aprobación).  
● Promover la revisión como una oportunidad de aprendizaje y no como una auditoría punitiva.  
● La madurez de un equipo se refleja en su capacidad para mantener revisiones consistentes, transparentes y formativas, integradas naturalmente en el flujo de trabajo.  


## Etapas del proceso

1. Planificación y alcance  
● Definir los objetivos del análisis (por ejemplo, revisión completa, módulos críticos o componentes nuevos).  
● Establecer criterios de seguridad y métricas de aceptación.  
● Asignar revisores y herramientas de apoyo.  

2. Revisión automatizada  
● Ejecutar herramientas SAST y DAST (SonarQube, Semgrep, OWASP ZAP).  
● Analizar resultados automáticos y clasificar los hallazgos según criticidad.  
● Corregir falsos positivos antes de la revisión manual.  

3. Revisión manual  
● Evaluar la lógica de negocio, el manejo de errores, los controles de acceso y la validación de datos.  
● Detectar contraseñas hardcodeadas, llaves API, configuraciones inseguras o exposición de información sensible.  

4. Ejecución y verificación práctica
● Reproducir hallazgos críticos para confirmar su impacto real.  
● Ejecutar pruebas de explotación controladas sobre los componentes afectados.  
● Validar que las correcciones sean efectivas y no generen vulnerabilidades secundarias.  

### Ejemplo práctico
Supón que durante la revisión manual se detecta una posible inyección SQL en un endpoint de autenticación:  

```python title="Python"
# Código inseguro
def login_user(username, password):
 query = f"SELECT * FROM users WHERE
 username='{username}' AND password='{password}'"
 result = db.execute(query)
 return result
```
### Prueba de ejecución controlada
<code>username:  ' OR 1=1 --</code><br></br>
<code>password: cualquier_valor</code>

Esta entrada devuelve todos los registros del sistema, confirmando la vulnerabilidad.  

### Corección segura
```python title="Python" {3,4}
# Código corregido con parámetros seguros
def login_user(username, password):
 query = "SELECT * FROM users WHERE username=%s AND password=%s"
 result = db.execute(query, (username, password))
 return result
```

**Este cambio evita la inyección SQL al utilizar consultas parametrizadas.**  

5. Consolidación y cierre  
● Registrar vulnerabilidades, nivel de severidad y estado de corrección.  
● Emitir un informe final de cumplimiento con los estándares definidos (OWASP ASVS, ISO 27001 o internos de la organización).  

### Objetivo final
Garantizar que el software cumpla con los controles de seguridad establecidos, minimizando el riesgo de vulnerabilidades explotables en producción.  

## Buscar funciones inseguras
Durante una revisión de código, uno de los pasos más efectivos es identificar funciones, métodos o patrones de programación inseguros.  
Estas funciones pueden facilitar ataques como inyección de código, corrupción de memoria o ejecución arbitraria.  

### Funciones riesgosas y alternativas seguras
![Descripción](/img/m2/ssdlc_m2_riskfunc.png)


| Lenguaje | Funciones o métodos riesgosos | Riesgo principal | Alternativa segura / Mitigación | 
|---|---|---|---|
| C / C++ | strcpy(), sprintf(), scanf() | Buffer overflow por falta de validación de límites | Usar strncpy(), snprintf() y verificar tamaños de búfer antes de copiar datos. | 
| PHP | eval(), exec(), shell_exec() | Command Injection — permite ejecutar comandos del sistema | Evitar ejecución dinámica; usar escapeshellarg() o funciones específicas con validación previa. |
| Python | pickle.load() sin validación, os.system() | Remote Code Execution o Command Injection | Utilizar json para serialización segura y subprocess.run() con shell=False. |
| JavaScript | innerHTML, eval() con datos del usuario | Cross-Site Scripting (XSS) | Usar textContent, plantillas seguras o frameworks con escape automático (React, Angular, etc.).|
| Java | Runtime.getRuntime().exec() | Command Injection | Emplear ProcessBuilder con parámetros controlados y validar entradas antes de ejecutar. |
| SQL (genérico) | Concatenación directa de variables en consultas SQL | SQL Injection | Usar prepared statements o consultas parametrizadas. | 

### Buenas prácticas
● Sustituir por funciones seguras o validadas (strncpy, prepared statements, safe_eval).  
● Documentar las razones de uso cuando no sea posible reemplazarlas.  
● Crear listas internas de funciones prohibidas y reglas personalizadas en linters.  
El uso de checklists de funciones inseguras ayuda a estandarizar la revisión y evita depender exclusivamente de la experiencia del revisor.  

### **Checklists de revisión de código seguro**
El uso de checklists estandariza la revisión de código y garantiza que los aspectos críticos de seguridad no se pasen por alto.  
Estas listas funcionan como una guía rápida para detectar vulnerabilidades recurrentes y verificar que el código cumpla con las políticas internas del equipo.  

### Ejemplo de checklist de revisión segura
| Categoría | Verificación |
|---|---|
|Validación de entradas| Se sanitizan los datos antes del procesamiento. |
|Autenticación y sesiones| Las contraseñas no se almacenan en texto plano. |
|Manejo de errores| No se exponen mensajes de error con información sensible. |
|Uso de dependencias| Se emplean versiones firmadas y actualizadas. |
|Logging y monitoreo| Los eventos críticos se registran sin exponer datos personales. |
|Configuraciones| Las variables sensibles se almacenan en entornos seguros. |

<!-- Monday, 16/03/2026 22:18 -->
<!-- Cód. Seguro 20/35 -->
## Análisis de contexto de funciones
Una función por sí sola no siempre es riesgosa; su peligrosidad depende del contexto en que se usa.  
Por ello, es esencial comprender cómo fluye la información dentro del código y cómo interactúan las funciones entre sí.  

### Aspectos que deben analizarse en contexto:
● Entrada: ¿El dato proviene de una fuente confiable? ¿Se valida antes de procesarse?  
● Procesamiento: ¿Se manejan los errores de forma segura? ¿Hay manejo de excepciones o logging adecuado?  
● Salida: ¿Los resultados se codifican o filtran antes de ser enviados a un cliente o base de datos?  
● Dependencias: ¿La función invoca librerías externas o APIs que puedan ser explotadas?  
● Flujo de ejecución: ¿Se respetan los niveles de autenticación y autorización en cada paso?  

Ejemplo práctico: Una función que concatena texto para construir una consulta SQL puede parecer
inofensiva, pero si los parámetros provienen de un formulario web sin validación, representa un riesgo de inyección SQL. Analizar el contexto permite identificar vulnerabilidades que el código por sí solo no revela.  

## Limitaciones de la revisión manual
La revisión manual aporta gran valor, pero debe reconocerse que no es un proceso infalible. Su eficacia depende en gran medida de la madurez del equipo y de la planificación del proceso.  

### Principales limitaciones
● Escalabilidad: difícil de aplicar en repositorios extensos o con múltiples ramas activas.  
● Subjetividad: distintos revisores pueden tener interpretaciones diferentes del riesgo.  
● Cobertura parcial: no siempre se revisa todo el código, priorizando archivos críticos.  
● Dependencia del conocimiento: requiere revisores experimentados y familiarizados con la arquitectura del sistema.  

:::tip Recomendación
Integrar la revisión manual dentro de un marco más amplio de seguridad, combinando automatización (SAST/DAST), políticas de code ownership y revisiones cruzadas para asegurar consistencia y trazabilidad.  
:::

### Herramientas de apoyo a la revisión manual
Si bien la revisión manual es insustituible para analizar la lógica del negocio, su alcance puede
potenciarse mediante herramientas que automatizan validaciones repetitivas y mejoran la eficiencia del proceso.  

### Herramientas de análisis local
● **Linters de seguridad**: detectan patrones inseguros o malas prácticas. Ejemplos: Bandit (Python), ESLint Security Plugin (JavaScript), Brakeman (Ruby on Rails).  
● **Pre-commit hooks**: ejecutan análisis automáticos antes de cada commit para prevenir código inseguro o credenciales expuestas.  
● **Formatters automáticos**: garantizan consistencia y legibilidad (Black, Prettier).  

### Herramientas colaborativas
● **GitHub Code Review / GitLab Merge Requests / Gerrit**: permiten realizar revisiones formales con asignación de revisores, comentarios en línea y registro de aprobaciones.  
● **Extensiones de IDE**: Visual Studio Code, IntelliJ y PyCharm incluyen plugins de análisis estático y linters de seguridad.  

## Falsos positivos
Los falsos positivos son hallazgos de seguridad que parecen vulnerabilidades, pero no lo son. Son comunes tanto en revisiones manuales como automáticas y, si no se gestionan correctamente, pueden generar desconfianza o fatiga en el equipo.  

:::info Ejemplo
Un analizador SAST puede reportar una posible inyección SQL incluso cuando la consulta está parametrizada correctamente.
:::

### Estrategias para gestionarlos
● Verificar el flujo completo del código antes de descartar un hallazgo.  
● Clasificar cada caso (falso positivo, confirmado, requiere revisión).  
● Ajustar las reglas o configuraciones del analizador para reducir recurrencia.  
● Documentar los falsos positivos para futuras auditorías.  
● Mantener comunicación activa entre desarrolladores y equipos de seguridad.  

| Predicho \ Real | Positivo (Real) | Negativo (Real) |
|---|---|---|
| Positivo (Predicho) | Verdadero positivo: Regla detectada y ataque presente.| Falso positivo: Regla detectada y no hay ataque presente.|
| Negativo (Predicho) | Falso negativo: No se detectó ninguna regla y ataque presente. | Verdadero negativo: No se detectó ninguna regla y no hay ataque presente.|

## Almacenamiento del código fuente
El código fuente es uno de los activos más críticos de una organización y debe protegerse adecuadamente.  
Un almacenamiento seguro evita accesos no autorizados, fugas de información o pérdida de 
integridad del código.  

### Buenas prácticas para el almacenamiento
● Utilizar repositorios centralizados y privados (GitHub Enterprise, GitLab, Bitbucket).  
● Implementar autenticación multifactor (MFA) y políticas de acceso basadas en roles.  
● Habilitar cifrado en reposo y en tránsito para proteger los datos del código.  
● Configurar backups automáticos y redundancia geográfica.  
● Registrar logs de auditoría y notificaciones ante cambios o accesos inusuales.  


:::tip
El almacenamiento seguro del código también debe incluir políticas de rotación de credenciales, eliminación de claves en texto plano y revisión de archivos sensibles antes de cada commit.
:::

## Control de versiones
El control de versiones permite registrar, auditar y revertir cambios en el código fuente, lo que resulta vital tanto para la trazabilidad como para la seguridad.  
Su correcta implementación contribuye a la gestión de incidentes, facilitando la detección del punto exacto en que se introdujo una vulnerabilidad.  

### Buenas prácticas de control de versiones seguras
● Configurar repositorios privados y gestionar accesos según funciones.  
● Usar branches bien definidas (main, develop, feature, hotfix) con flujos de aprobación.  
● Firmar los commits y validar la identidad de los contribuidores.  
● Revisar pull requests mediante flujos de aprobación múltiple.  
● Integrar escaneos de seguridad en los pipelines (SAST y análisis de dependencias).  
● Monitorear commits que incluyan credenciales, tokens o configuraciones sensibles.  

Un sistema de control de versiones bien administrado no solo garantiza integridad y trazabilidad, sino que **se convierte en una línea de defensa activa frente a alteraciones o accesos no autorizados.**  

![Descripción](/img/m2/ssdlc_m2_branches.png)

## Cultura de seguridad en el desarrollo
La seguridad del código no depende únicamente de las herramientas o metodologías, sino de una cultura de trabajo que prioriza la calidad y la prevención.  

:::tip
Fomentar una mentalidad de Security by Design implica incorporar la seguridad desde el primer commit y sostenerla en cada revisión, refactorización o despliegue.
:::

### Claves para consolidar esa cultura
● Promover capacitaciones periódicas sobre vulnerabilidades comunes.  
● Reconocer las contribuciones de los desarrolladores que identifican y corrigen riesgos.  
● Establecer métricas de madurez del equipo:  
cumplimiento de revisiones, reducción de defectos críticos, tiempo medio de remediación.  
● Integrar la seguridad como un criterio de éxito del proyecto, al mismo nivel que el rendimiento o la funcionalidad.  

---
## Laboratorios
### Laboratorio 1
#### Ejercicio

<div className="mi-contenedor-verde">
  <h2>Objetivo</h2>
  SAST con OWASP NodeGoat en Sonarqube Web.  
  Ejecutar un análisis SAST sobre un repo público de OWASP NodeGoat en SonarCloud, revisar hallazgos y demostrar una corrección mínima con reanálisis.<br></br>
</div>

### Consignas
1. Importar el repositorio a tu GitHub  
a. En GitHub: New : Import a repository  
b. Source URL: https://github.com/OWASP/NodeGoat.git  
c. Repository name: owasp-nodegoat (o el que elijas)  
d. Begin import.  

2. Vincular tu GitHub con SonarQube Web (SonarCloud)  
a. Ingresa en https://sonarcloud.io  
b. Sign in with GitHub: autoriza el acceso a tus repositorios.  

3. Crear la organización
a. En SonarCloud: Create organization (puedes usar tu usuario o el nombre del curso).  

4. Analizar el proyecto  
a. En SonarCloud: Analyze new project - selecciona tu repo importado.
b. Activa Automatic Analysis (o acepta elworkflow de GitHub Actions sugerido). Espera a que finalice el análisis inicial.  

5. Explicar brevemente el dashboard y su detalle  
a. Describe los indicadores principales que ves (Security, Reliability, Maintainability, Security Hotspots Reviewed, Duplications, Lines of Code) y qué significan a nivel general del proyecto.  


A continuación, encontrarás la resolución al ejercicio para que puedas verificar cómo te fue.  

## Solución
### Laboratorio 1

### Paso 1
Importar el repositorio a tu GitHub  
a. GitHub - New - Import a repository  
b. Old repository’s clone URL: https://github.com/OWASP/NodeGoat.git  
c. Repository name: owasp-nodegoat (o el que elijas)  
d. Begin import.  

![Descripcióntexto_alternativo](/img/m2/ssdlc_m2_repo1.png)

### Paso 2
Vincular tu GitHub con SonarQube Web (SonarCloud)  
a. Ingresa a https://www.sonarsource.com/products/sonarcloud/signup  
b. Haz clic en Sign in with GitHub.  
c. Importa una organización o crea una. Luego, bríndale acceso a los repositorios.  
d. Analyze new project: selecciona tu repo (< tu-usuario >/owasp-nodegoat).  

![Descripción](/img/m2/ssdlc_m2.sonarserver.png)
![Descripción](/img/m2/ssdlc_m2_sonarserver2.png)
![Descripción](/img/m2/ssdlc_m2_sonarserver3.png)

### Paso 3. Crear la organización
a. Con el repositorio seleccionado, crea la organización en sonarcloud. Ingresar como nombre y Key la información que prefieran para identificar a acceso en Sonar.   
b. Para el siguiente paso, deberás elegir y optar por el plan gratuito. Por último, crear la organización.  


### Paso 4. Analizar el proyecto
a. A continuación, realiza el análisis de proyecto que se ha importado en el paso 1.  
b. Luego, avanza con los detalles de configuración para el proyecto. En este apartado deberás indicar que las bases de actualización del código van a estar basadas en su anterior versión.  
c. Finalizada esta configuración, selecciona Create Project.  
d. A continuación, el analizador de código comenzará a operar sobre el proyecto creado y el repositorio seleccionado. Como resultado, brindará un resumen de estado de código. 

El resultado...  
![Descripción](/img/m2/ssdlc_m2_sonarserver4.png)

### Paso 5. Explicar brevemente el dashboard y su detalle
| Métrica | Estado / Valor | Qué significa / Riesgo | Acción recomendada |
| --- | --- | --- | --- |
| Quality Gate | Not computed (Sonar way) | Aún no se calculó el gate del proyecto. | Ejecutar otro escaneo (commit mínimo o rerun del workflow) para que se compute en el próximo análisis. |
| Security | 16 open issues | (rating E) | Vulnerabilidades (varias Blocker). Riesgo de inyecciones y ejecución peligrosa. | Priorizar y remediar estos 16 issues. | 
| Reliability | 31 open issues | (rating C) | Bugs que pueden causar fallas en runtime. | Revisar primero los de mayor severidad para evitar errores funcionales. | 
| Maintainability | 138 open issues | (rating A) | Code smells (estilo, complejidad, deuda). La ratio de deuda mantiene A. | Abordar los de mayor impacto (complejidad/duplicación local). | 
| Security Hotspots |  18 | No son vulnerabilidades confirmadas; requieren revisión manual (APIs sensibles, cripto, etc.). | Revisar y marcar como Safe o To Review/Fixed. |
| Coverage | Not set | No hay cobertura de tests reportada. | Ejecutar tests con cobertura (p. ej., Jest --coverage) y reportar LCOV: sonar.javascript.lcov.reportPaths=coverage/lcov.info.|
| Duplications | 1.3% | Bajo impacto actual. | No prioritario por ahora. |


### Laboratorio 2
#### Ejercicio
Objetivo:  
Análisis y priorización de hallazgos (NodeGoat + SonarCloud)
A partir del proyecto ya analizado en SonarCloud, revisar, explicar, priorizar y proponer fixes para los hallazgos de Security.  

### Consignas
1. ¿Qué valor de security muestra en Software Quality? ¿Por qué se filtra este valor?  
2. Explicar el apartado Type y su orden de priorización a la hora de remediar los issues.  
3. Identifica las cantidades de hallazgos según su severidad en el apartado “Severit” (Blocker/High/Medium/Low/Info).  
4. Clean Code Attribute (Consistency/Intentionality/Adaptability/Responsibility): copias totales. Explica qué implica cada atributo y qué implica para el triage.  
5. Identificar tipos de vulnerabilidades halladas en “Security Category” y cuáles priorizar en este hallazgo.  

A continuación, encontrarás la resolución al ejercicio para que puedas verificar cómo te fue.  

## Solución
### Laboratorio 2
1. ¿Qué valor de security muestra en Software Quality? ¿Por qué se filtra este valor? Se enfoca primero el riesgo de seguridad (exposición, impacto regulatorio) antes que fallas o deuda técnica.
2. Explicar el apartado Type y su orden de priorización a la hora de remediar los issues.
a. Security = 18 (Reliability = 31, Maintainability = 138).  

![D](/img/m2/ssdlc_m2_softquality.png)

b. Dentro del filtro type tenemos  
- Bug: Problemas de fiabilidad que pueden romper la ejecución del código.  
- Vulnerability: Estos son hallazgos de seguridad confirmados.
- Code Smell: Mantenimiento complejo.

c. La prioridad de atención es:
<div class="mi-contenedor-verde">
    - Vulnerabilidad.
    - Bug.
    - Code Smell.
</div>

![D](/img/m2/ssdlc_m2_issuestype.png)

d. Severidad:  
- Blocker = 12  
- High = 50  
- Medium = 75  
- Low = 40  
- Info = 6  
<div class="mi-contenedor-verde">
    Prioridad: Blocker > High > Medium.
</div>

![D](/img/m2/ssdlc_m2_severityissues.png)

Dentro de cada nivel, atacar primero los de menor Effort (quick wins).  

4. Clean Code Attribute  
(Consistency/Intentionality/Adaptability/Responsibility): copias totales. Explica qué implica cada atributo y qué implica para el triage.  

![D](/img/m2/ssdlc_m2_codeattr.png)

a. Totales:
- Consistency 45
- Intentionality 112
- Adaptability 5
- Responsibility 6

b. Explicación filtros de atributos de código:  
- Consistency (45): uniformidad de patrones/controles. Alto: hay inconsistencias; tras cerrar  críticos, homogeneizar validaciones, manejo de errores y acceso a BD.  
- Intentionality (112): uso deliberado de construcciones riesgosas (queries dinámicas, eval/exec, operadores Mongo no controlados). Muy alto: foco inmediato en eliminar esos patrones.  
- Adaptability (5): facilidad de cambio seguro. Bajo: planear refactors ligeros para centralizar validaciones/DAOs.  
- Responsibility (6): responsabilidades claras (errores, logging, límites). Bajo hoy; definir checklist al estabilizar.  

5. Identificar tipos de vulnerabilidades halladas en “Security Category” y cuáles priorizar en este hallazgo.  
a. En este apartado se encontraron varias vulnerabilidades identificadas:  
- Otros (CWE y sin categorizar por Sonar)
- Autenthentication
- RCE (Code Injection)
- SQL Injection
- SSRF (Server Side Request Forgery)
- Insecure Configuration
- Open Redirect
También están mapeadas por categorías de frameworks conocidos como OWASP y CWE. 

![D](/img/m2/ssdlc_m2_seccateg.png)  

b. SonarSource:  

- Code Injection (RCE) 4 Crítico: ejecución de código/control del proceso. Acción: eliminar ejecución dinámica/$where/evaluaciones; usar whitelists y APIs seguras.  
- SQL Injection: 3 Crítico: lectura/modificación de datos. Acción: parametrizar/validar tipos y rangos en todas las consultas.  
- SSRF: 1 Alto: acceso a redes internas/metadata. Acción: bloquear destinos internos, resolver por allow-list/proxy, validar URLs.  
- Authentication: 1 Alto: riesgo de bypass/gestión de sesión. Acción: revisar flujos, MFA,expiración, errores consistentes.  
- Open Redirect: 1 Medio: phishing/cadena de ataques. Acción: validar destinos o usar IDs internos en vez de URLs libres.  

c. Cómo se prioriza con “Security Category”: dentro de Security + Severity, resolver primero RCE / SQLi / SSRF, luego Authentication, y por último Open Redirect (suele ser quick win).  

d. Completamos vectores uno a uno

[OWASP Top Ten 2025][ref1] ![icono]


| Categoría | Conteo | Relación con SonarSource |
| --- | --- | --- |
| A5 - Injection | 9 | Cubre SQLi, inyección de comandos SO, XSS, inyección en ORM |
| A1 - Broken Access Control | 2 | Abarca el recorrido de ruta, exposición de información sensible y CSFR |
| A10 - Mishandling of Exceptional Conditions | 1 | Cubre la gestión errónea de excepciones |
| A2 - Security Misconfiguration | 1 | Para malas configuraciones de seguridad | 
| A6 - Insecure Design | 1 | Diseño inseguro |


OWASP Top Ten 2021

| Categoría | Conteo | Relación con SonarSource |
| --- | --- | --- |
| A3 – Injection | 7 | Cubre RCE/SQLi y NoSQL injection. |
| A1 – Broken Access Control | 1 | Puede cruzarse con “Authentication”. |
| A10 – SSRF | 1 | Igual a SSRF arriba. |
| A7 – Identification & Authentication Failures | 1 | Refuerza “Authentication”. |

e. OWASP Top 10 2017 (histórico):
| Categoría | Conteo | Nota |
| --- | --- | --- |
| A1 – Injection | 7 | Coherente con los RCE/SQLi detectados. |
| A5 – Broken Access Control | 2 | Precursor de A1 2021 (control de acceso).|
| A3 – Sensitive Data Exposure | 1 | Revisar cifrado en tránsito/rep.|



f. CWE: Aquí se ve a los Common Weakness (CWE) asociados a los hallazgos anteriores: CWE-95 (RCE por ejecución dinámica), CWE-943/89 (inyecciones NoSQL/SQL), CWE-20 (validación de entrada deficiente, causa raíz), CWE-918 (SSRF), CWE-259/798 (secretos hardcodeados) y CWE-601 (open redirect).  
Esto confirma el patrón visto: priorizar RCE e Injections, aplicar validación/casteo  transversal, y luego atender SSRF, secretos y redirects.  

![D](/img/m2/ssdlc_m2_cwe.png)


## Proyecto Integrador
### Etapa 2
#### SAST con Sonarqube
Aplicar el ciclo completo de análisis estático de código usando SonarQube en un entorno controlado (Kali Linux) y priorizar los hallazgos mediante inteligencia artificial para generar un plan de remediación.  

### Consignas
1. Instalación de Docker en Kali Linux:  
a. Actualizar el sistema (```sudo apt update && sudo apt upgrade```).  
b. Instalar Docker (```sudo apt install docker.io```).  
c. Habilitar el servicio para que inicie automáticamente (sudo systemctl enable docker && sudo systemctl start docker).  
d. Verificar la instalación con ```docker --version```.
2. Crear Docker con SonarQube:
a. Ejecutar un contenedor SonarQube Community con:  
```bash title="Bash"
docker run -d --name
sonarqube -p 9000:9000
sonarqube:lts-community
```
b. Esperar unos segundos y validar acceso en el navegador en http://localhost:9000.  
Instalación completa, notar la última línea indicando el mensaje de fin.  
![D](/img/m2/ssdlc_m2_sqint.png)

3. Descarga del Repositorio NodeGoat (OWASP):  
a. Clonar el repositorio oficial: git clone https://github.com/OWASP/NodeGoat.git  
b. Confirmar que la carpeta NodeGoat contiene el código fuente.  
c. Descarga de Sonar Scanner y Exportación de Binarios a ZSH  

4. [**Descargar el Sonar Scanner CLI desde sonarsource.com**][ref2] ![icono]  
a. Descomprimir en /opt/sonar-scanner.  
b. Agregar la ruta al PATH en ~/.zshrc:  
```bash title="Bash" export PATH=$PATH:/opt/sonar-scanner/bin```  
c. Recargar la shell (source ~/.zshrc) y validar con ```sonar-scanner -v```.  


5. Creación de Proyecto y Token en SonarQube  
a. Iniciar sesión en SonarQube (usuario: admin / contraseña: admin).  
b. Crear un proyecto nuevo llamado NodeGoat-Security.  
c. Generar un token de análisis y copiarlo.  

6. Ejecución de Análisis en NodeGoat  
a. Posicionarse en la carpeta del repositorio (cd NodeGoat).  
b. Ejecutar el escaneo:  
```bash title="Bash"
sonar-scanner \
 -Dsonar.projectKey=NodeGoat-Security \
 -Dsonar.sources=. \
 -Dsonar.host.url=http://localhost:9000 \
 -Dsonar.login=<TOKEN_GENERADO>
```

7. Revisión de resultados con AI  
a. Acceder a la interfaz de SonarQube y revisar los hallazgos.  
b. Clasificar las vulnerabilidades por criticidad.  
c. Usar una herramienta de inteligencia artificial (por ejemplo, ChatGPT o Copilot) para generar un resumen priorizado de issues y recomendaciones de remediación, usando prompts como:  
```bash title="prompt"
Actúa como un experto en AppSec. Explica las
siguientes vulnerabilidades detectadas en
SonarQube de mayor a menor riesgo y sugiere las
mejores prácticas para remediarlas.
```

A continuación, encontrarás la resolución a esta etapa para que puedas verificar cómo te fue.

## Resolución de etapa 2
### Paso 1: Instalación de Docker en Kali Linux
Primero se actualiza el sistema para evitar dependencias rotas. 
Se instala [Docker][ref3] ![icono], se habilita para que inicie al arrancar el sistema y se valida la versión para confirmar la instalación. Docker será el motor que permita correr SonarQube sin instalarlo manualmente.  
Como alternativa recomiendo la experiencia con [Podman][ref4] ![icono].

[¿Por qué la recomendación?][ref5] ![icono]

### Paso 2: Crear Docker con SonarQube
Se levanta un contenedor en segundo plano (-d) que expone el puerto 9000. lts-community es la versión estable gratuita de SonarQube.  
Luego se valida en el navegador accediendo a **http://localhost:9000**.  
Este paso pone en marcha la herramienta de análisis estático sin instalar software adicional en el host.  

### Paso 3: Descarga del Repositorio NodeGoat (OWASP)
Se clona el repositorio oficial de NodeGoat, que contiene intencionalmente vulnerabilidades comunes (SQLi, XSS, etc.). Es un proyecto ideal para pruebas de SAST porque permite ver hallazgos reales y no solo código seguro.  

### Paso 4: Descargar el Sonar Scanner CLI desde sonarsource.com
El Sonar Scanner es el cliente que envía el código a SonarQube. Se descarga, descomprime en
/opt, se agrega al PATH para poder ejecutarlo desde cualquier carpeta, se recarga la configuración de la shell y se prueba la instalación con -v.  

### Paso 5: Creación de Proyecto y Token en SonarQube
a. Ingresar a http://localhost:9000.  
b. Loguearse con admin/admin y cambiar la contraseña si lo pide.  
c. Crear un proyecto manual llamado NodeGoat-Security.  
d. Generar un token para ese proyecto y copiarlo en un lugar seguro.   
e. Como camino alternativo puedes crear el token previo a la creación del proyecto.  
Creado el Token se avanzaría con la creación del proyecto y en vez de crear un token nuevo seleccionamos uno existente.  
f. El token es la credencial de autenticación que el Scanner usará para comunicarse con el servidor SonarQube. Crear el proyecto permite agrupar los hallazgos y hacer seguimiento de su evolución.  

Al finalizar la creación del proyecto se brindan indicaciones de como analizar nuestro código.  

![D](/img/m2/ssdlc_m2_sqnewproj.png)

### Paso 6: Ejecución de Análisis en NodeGoat
a. El projectKey debe coincidir con el del proyecto creado. sonar.sources=.indica que analice todos los archivos desde la carpeta actual. _**sonar.host.url**_ apunta al SonarQube local y _**sonar.login**_ utiliza el token. Si todo funciona, el scanner enviará resultados al dashboard de SonarQube.  
b. Desde la carpeta donde está el código:  
```bash title="bash"
cd NodeGoat
sonar-scanner \
 -Dsonar.projectKey=NodeGoat-Security \
 -Dsonar.sources=. \
 -Dsonar.host.url=http://localhost:9000 \
 -Dsonar.login=<TOKEN_GENERADO>
``` 
Al finalizar la ejecución del análisis en nuestro proyecto de sonarqube obtendrás este resultado:  

(Puede variar por la versión de Sonar)  
![D](/img/m2/ssdlc_m2_sqpassed.png)

### Paso 7: Revisión de resultados con AI
Este paso no solo revisa los hallazgos, sino que usa AI para generar un análisis más completo, ordenando los findings por criticidad y proponiendo acciones concretas para su resolución, lo  que simula el flujo real de trabajo de un equipo de seguridad.  

Comenzamos el análisis con el promt indicado:  
```bash title="prompt"
Eres un experto en AppSec. Prioriza las siguientes vulnerabilidades detectadas en SonarQube por riesgo, explica el impacto de cada una y sugiere remediaciones:
<bloque_de_texto>
```

Resultado:  
Se puede ver que la LLM identificó si los hallazgos se repiten y los agrupo por tipo de vulnerabilidad. Luego, la priorización debe tomar su respuesta de manera parcial, ya que el riesgo debe considerar contextos que la AI desconoce, tales como el entorno de despliegue (dev, test, producción) y el impacto potencial si fuera explotado.  

![D](/img/m2/ssdlc_m2_llmout.png)


## Desafíos

### Ejercicio 1

#### Objetivo
Identificar y explicar al menos 3 vulnerabilidades Blocker usando una IA como apoyo (explicación no técnica + fix breve).  

#### Recursos
Para este desafío es preciso utilizar el proyecto creado en los laboratorios (OWASP-NodeGoat).  

#### Consignas
1. Filtrado en SonarCloud:
Issues - Filters - Software Quality = Security - Type = Vulnerabilities - Severity = Blocker.  Deberás tomar una captura del panel de Filters.  
2. Selección: Elige 3 issues Blocker (si puedes, de categorías distintas: RCE/Injection, SQL/NoSQL Injection, SSRF/Auth/Redirect).
3. Recolectar datos del issue:  
● Abre cada issue y copia: Regla/Título, Archivo:Línea (SINK), Execution flow (SOURCE-SINK), Categorías (Security Category / OWASP / CWE), Severidad.  
● Snippet de código que muestra SonarCloud (las líneas resaltadas).  
4. Pegar el prompt en la IA. Usa exactamente el prompt que se muestra a continuación, reemplazando los campos con lo que copiaste de SonarCloud.  

```bash title="prompt"
    Actúa como analista AppSec y explica esto para alguien NO técnico, en español, claro y breve.
    [Contexto del issue — copiado de SonarCloud]
    - Regla/Título: "<pegar>"
    - Archivo: Línea (SINK): <pegar>
    - Execution flow:
    - SOURCE: <archivo/función + variable de entrada (req.query/req.body/req.params/etc.)>
    - SINK: <archivo/función + llamada peligrosa (query/eval/exec/redirect/etc.)>
    - Categorías: Security Category=<pegar> · OWASP Top 10=<pegar> · CWE=<pegar>
    - Severidad: <Blocker>
    [Código relevante — pegar aquí EXACTO lo que muestra SonarCloud (las líneas resaltadas de    SOURCE y SINK)]
    <<< PEGA AQUÍ EL SNIPPET COPIADO DEL PANEL >>>
    [Qué necesito]
    1. Resumen no técnico (2–3 frases): qué está mal y por qué es peligroso.
    2. Ejemplo de explotación realista (1 caso).
    3. Impacto (máx. 3 bullets).
    4. Causa raíz (1 frase).
    5. Remediación concreta para esta tech (1–2 frases) + mini-snippet correcto.
    6. Checklist de verificación del fix (3–4 puntos).
    7. Mapeo: OWASP (código y nombre) y CWE (código y nombre) únicamente.
    Evita jerga innecesaria y sé directo.
```

A continuación, encontrarás la resolución al ejercicio para que puedas verificar cómo te fue.  

### Resolución
1. Filtrado en SonarCloud:  
a. Abre SonarCloud > Issues.    
Filters:  
- Software Quality: Security.  
- Type: Vulnerabilities.  
- Severity: Blocker.  

2. Selección:  
a. De los nueve issues, selecciona a los primeros 3 de la lista.   

3. Recolectar datos del issue:  
**Issue número 1**   
a. Ubicación:  
 - apps/server-render/app/data/allocations-dao.js:L86  
b. Regla: 
 - Change this code to not dynamically execute code influenced by user-controlled data (jssecurity:S5334)  
c. Flow:  
 - SOURCE en allocations.js (req.params.userId, req.query.threshold)
 - SINK en DAO (find(searchCriteria()).toArray(...))
d. Analizar porque es un issue:  
Es un issue porque la aplicación está ejecutando dinámicamente código a partir de datos controlados por el usuario, lo que permite a un atacante manipular su comportamiento y ejecutar código arbitrario.  
Esto puede derivar en fuga o alteración de datos, interrupción de servicios y, en el peor de los casos, en una escalada de privilegios que comprometa toda la infraestructura si existen configuraciones débiles o defensas insuficientes.  
e. ¿Cómo se arregla?  
Se arregla evitando construir consultas dinámicas con datos del usuario. En lugar de usar $where o eval, hay que:  
- Usar operadores nativos de MongoDB ($eq, $in, etc.).  
- Validar y sanitizar entradas (ej. express-mongo-sanitize).  
- Definir whitelist de campos permitidos.  
- Usar usuarios de DB con mínimos privilegios.  

**Issue número 2**  
a. Ubicación:  
 - apps/server-render/app/data/memos-dao.js:L23
b. Regla:  
 - Change this code to not construct database queries directly from user-controlled data.
c. Flow: SOURCE:  
 - apps/server-render/app/routes/memos.js - el usuario envía contenido (req.body.memo) en una petición HTTP.
d. SINK:  
 - apps/server-render/app/data/memos-dao.js - la operación de BD usa ese valor como argumento  sin control (inserción/criterio construido con entrada no confiable).  
e. Analizar por qué es un issue:  
Es un issue porque la aplicación toma datos no confiables del usuario y los usa directamente para construir una operación NoSQL. Así, el motor de base interpreta ese input como operadores (p. ej., $ne, $gt, $where) en lugar de simples valores. Con eso, un atacante puede cambiar la lógica de la consulta sin permisos.  
f. ¿Cómo se arregla?  
- No utilices find(req.query) ni insert(req.body).  
- Valida/castea cada campo y permití solo claves conocidas (allow-list).  
- Bloquea operadores que empiecen con $ y no uses $where/eval.  
- Construye el query campo a campo con forma fija.  

**Issue número 3**  
a. Ubicación:  
 - apps/server-render/app/data/user-dao.js :
b. Regla:   
 - Change this code to not construct database queries directly from user-controlled data.
 - (jssecurity:S5147)
c. Flow:  
 - SOURCE: petición HTTP con datos del usuario (login) — userName / password recibidos en la ruta/controlador.  
d. SINK:  
 - user-dao.js construye el criterio/consulta de base usando esos valores directamente (p. ej., find/findOne/insert con objeto armado desde la entrada), lo que habilita NoSQL Injection.  
e. Analizar por qué es un issue.  
Se construye una consulta NoSQL con entrada del usuario (query/body) sin sanear. En express, los parámetros pueden llegar como objetos/arrays (ej. user[$ne]=x) y Mongo los interpreta como operadores ($ne, $gt, $where).  
Con eso un atacante altera la lógica de la consulta: puede leer datos de otros, borrar/modificar registros o encadenar con otras fallas. Por eso Sonar lo marca Vulnerability · Blocker (A03: Injection, CWE-943/20).  

f. ¿Cómo se arregla?  
No pases req.query/req.body directo a find/insert. Sanitiza las entradas previamente.  

3. Pegar el prompt en la IA  
a. Issue 1: avanza con la creción del prompt para cada issue. Observa el análisis resumido por  IA.  


¡Terminaste el módulo!  
Ahora puedes continuar al siguiente módulo.  


  





<!-- Referencias -->
[ref1]:https://owasp.org/Top10/2025/
[ref2]:https://docs.sonarsource.com/sonarqube-server/10.8/analyzing-source-code/scanners/sonarscanner
[ref3]:https://www.docker.com/
[ref4]:https://podman.io/
[ref5]:https://www.datacamp.com/blog/docker-vs-podman?utm_cid=21057859163&utm_aid=157296745417&utm_campaign=230119_1-ps-other~dsa-tofu~all_2-b2c_3-latam-en_4-prc_5-na_6-na_7-le_8-pdsh-go_9-nb-e_10-na_11-na&utm_loc=9041026-&utm_mtd=-c&utm_kw=&utm_source=google&utm_medium=paid_search&utm_content=ps-other~latam-en~dsa~tofu~blog~data-engineering&gad_source=1&gad_campaignid=21057859163&gbraid=0AAAAADQ9WsH5Fsh-PKr1GotqUtPZ6Ti4n&gclid=Cj0KCQjw4PPNBhD8ARIsAMo-icyqSlBSTOoH0WXSStdpgSsAj6F0MmJS4TxvWyEEC-OhQrk7cUyH3GgaApVzEALw_wcB


[icono]:/img/external-link.svg

