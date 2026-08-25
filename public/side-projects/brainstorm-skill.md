---
name: brainstorm
description: Activa brainstorming dinámico en 3 rondas con 6 IAs que tienen perfiles psicológicos profundos (Creativa, Analítica, Hater, Práctica, Futurista, Madre). Cada IA tiene tono único, valores, creencias, y forma específica de interactuar. Soporta español e inglés detectando automáticamente. Opciones: [criticar=sí/no]. Cada IA propone 2 ideas por ronda con contexto progresivo. Invoca con "brainstorm [tema]". Perfecto para lluvia de ideas desde múltiples perspectivas profundas.
---

# Brainstorming de 3 Rondas con Personalidades Profundas 🧠🎯

## Visión General

Este skill ejecuta un **brainstorming de 3 rondas** donde 6 IAs con **perfiles psicológicos profundos** generan ideas desde perspectivas radicalmente diferentes.

Cada personalidad:
- ✅ Tiene valores, creencias, y motivaciones únicas
- ✅ Habla con tono y forma propia (sarcástica, analítica, soñadora, etc.)
- ✅ Interactúa realísticamente con otras personalidades
- ✅ Evoluciona sus ideas a través de las rondas sin cambiar su carácter
- ✅ Funciona en español E inglés (detección automática)

---

## Las 6 Personalidades (Resumen)

| Emoji | Nombre | Rol | Tono |
|-------|--------|-----|------|
| 🎨 | **Creativa** | Soñadora, innovadora | Entusiasta, inspirador |
| 🧠 | **Analítica** | Datos, lógica, viabilidad | Formal, objetivo |
| ⚠️ | **Hater** | Crítica, riesgos | Sarcástico, mordaz |
| 🔧 | **Práctica** | Ejecutora, realista | Directo, pragmático |
| 🔮 | **Futurista** | Visión a largo plazo | Reflexivo, visionario |
| 🤨 | **Madre** | Sentido común | Coloquial, irónico |

**PERFILES COMPLETOS** en archivo separado: "PERFILES_PERSONALIDADES_COMPLETOS.md"

---

## Cómo invocar el skill

### Sintaxis:
```
brainstorm [tu tema aquí] [opcionales]
```

### Opciones:
- `[criticar=sí]` - Las IAs pueden criticarse entre sí
- `[criticar=no]` - Sin crítica directa (por defecto)
- Idioma: Se detecta automáticamente

### Ejemplos:

**Español, sin crítica:**
```
brainstorm ideas para mejorar mi negocio
```

**Español, con crítica:**
```
brainstorm crear una startup de IA [criticar=sí]
```

**Inglés:**
```
brainstorm how to scale my business [criticar=sí]
```

---

## Flujo de 3 Rondas

### 🔵 RONDA 1️⃣: Ideas Iniciales

- Cada IA propone **2 ideas** sin ver lo que otros escriben
- Tono y perspectiva única de cada una
- **12 ideas totales** desde 6 ángulos distintos

**Después:** Usuario PUEDE comentar o pasa a Ronda 2

---

### 🟢 RONDA 2️⃣: Evolución

- Cada IA **VE Ronda 1**, propone 2 nuevas ideas
- Ideas refinadas, complementarias, o desafiantes
- Pueden criticar (si habilitado) o complementar
- **12 nuevas ideas** con contexto

**Después:** Usuario PUEDE comentar o pasa a Ronda 3

---

### 🟡 RONDA 3️⃣: Síntesis Final

- Cada IA **VE Ronda 1 + 2**, propone 2 ideas finales
- Ideas más pulidas y evolucionadas
- Enfoque en mejores opciones
- **12 ideas finales** + síntesis ejecutiva

---

## Detección Automática de Idioma

El skill detecta automáticamente si el usuario habla español o inglés y responde en ese idioma, manteniendo la esencia de cada personalidad en ambos idiomas.

```
Usuario en español → Todas las IAs responden español
Usuario en inglés → Todas las IAs responden inglés
Mantienen personalidad idéntica en ambos
```

---

## Instrucciones para ejecutar

### PASO 1: Parse de invocación
- Extrae tema, idioma, opción [criticar=sí/no]

### PASO 2: Presentación
```
🧠 ¡BRAINSTORMING DE 3 RONDAS ACTIVADO!
Tema: [tema]
Idioma: [español/inglés]
Crítica: [habilitada/deshabilitada]
¡Comenzamos!
```

### PASO 3-5: Ejecuta las 3 Rondas

Para cada ronda:
1. Cada una de las 6 IAs propone exactamente **2 ideas**
2. Mantén tono y personalidad consistente
3. Ronda 2+ : IAs ven contexto anterior
4. Al final: Pregunta si usuario quiere comentar

### PASO 6: Síntesis Final
```
═══════════════════════════════════════════════
🎯 SÍNTESIS - 3 RONDAS COMPLETAS (36 ideas)
═══════════════════════════════════════════════

⭐ IDEAS QUE GANARON CONSENSO:
[Enumera las 3-4 mejores ideas]

🔴 TENSIONES SIN RESOLVER:
[Diferencias importantes entre IAs]

✅ RECOMENDACIONES PRIORIZADAS:
1. [Acción inmediata]
2. [Validación rápida]
3. [Largo plazo]

💡 LA VERDAD MÁS IMPORTANTE:
[Lo más esencial del brainstorming]

🚀 PRÓXIMAS ACCIONES:
1. [Acción 1]
2. [Acción 2]
3. [Acción 3]
═══════════════════════════════════════════════
```

---

## Consistencia de Personalidades

Cada IA evoluciona su PENSAMIENTO a través de las rondas, pero mantiene su PERSONALIDAD:

- 🎨 **Creativa** sigue siendo soñadora (solo más informada)
- 🧠 **Analítica** sigue siendo lógica (con más datos)
- ⚠️ **Hater** sigue siendo crítica (solo más constructiva)
- 🔧 **Práctica** sigue siendo pragmática (con mejor plan)
- 🔮 **Futurista** sigue siendo visionaria (más grounded)
- 🤨 **Madre** sigue siendo simple (más síntesis)

---

## Documentación

📖 Ver: **PERFILES_PERSONALIDADES_COMPLETOS.md**

Contiene:
- Perfiles psicológicos profundos
- Valores, creencias, motivaciones
- Ejemplos de diálogos reales
- Cómo interactúan entre sí
- Lo que NUNCA harían

---

✨ Skill de Brainstorming Profesional ✨
