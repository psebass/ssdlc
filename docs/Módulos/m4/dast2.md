---
sidebar_position: 10
title: Inteligencia, priorización y mejora continua con DAST
slug: /modulo/modulo4/dast2
description: DAST
keywords: [DAST]
tags: [DAST, reporte]
---


[Volver](/docs/modulo/modulo4/)
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
