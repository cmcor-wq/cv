# Carlos Miguel Corada — Portfolio

Portfolio de Carlos Miguel Corada, Senior Product Manager en Valencia. Construido con Next.js (App Router) + Tailwind CSS.

## Estructura

- `/` — Home (hero + credibility strip + CTAs)
- `/work` y `/work/[slug]` — Case studies
- `/community` — Valencia Product Beers
- `/side-projects` — Remsoul, artículos, experimentos
- `/ask` — Chat interactivo con IA ("Carlos" o "modo mamá")
- `/about` — Bio, skills, contacto

El contenido editable vive en `src/lib/content.ts` (case studies, community, side projects, about) y `src/lib/prompts.ts` (system prompts del chat).

## Desarrollo

```bash
npm install
npm run dev
```

## Configurar el chat (`/ask`)

El chat llama a la API de Google Gemini desde un route handler del servidor (`src/app/api/chat/route.ts`), nunca desde el cliente — la API key nunca se expone al navegador.

1. Consigue una API key gratis en [Google AI Studio](https://aistudio.google.com/apikey)
2. Copia `.env.example` a `.env.local`
3. Añade tu `GEMINI_API_KEY`
4. (Opcional) `GEMINI_MODEL` para sobrescribir el modelo por defecto (`gemini-flash-latest`)

Sin la key configurada, `/ask` sigue siendo funcional visualmente pero responde con un error controlado.

## Datos pendientes

Varias secciones muestran un aviso "Pendiente" donde falta contenido real de Carlos (métricas de Valencia Product Beers, testimonios, fotos, artículos publicados, LinkedIn, CV en PDF). Rellena esos campos en `src/lib/content.ts` según vayan estando disponibles.

## Build de producción

```bash
npm run build
npm start
```
