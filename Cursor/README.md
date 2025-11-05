# Prototipos Material 3 - Simulador de Crédito

Repositorio con prototipos de simulación de crédito diseñados con Material Design 3, incluyendo microinteracciones elegantes y diseño minimalista enfocado en transmitir seguridad al usuario.

## 🎯 Contenido

Este repositorio contiene:

- ✅ **6 variantes de UX** documentadas con análisis de tradeoffs
- ✅ **2 prototipos funcionales** listos para probar
- ✅ **Sistema Material 3 completo** implementado
- ✅ **Microinteracciones elegantes** en todos los componentes
- ✅ **Workflow de deploy** configurado para GitHub Pages

## 🚀 Ver los Prototipos

### Desarrollo Local

```bash
cd prototype
npm install
npm run dev
```

Luego navega a:
- `http://localhost:5173/simulator-m3` - Prototipo Híbrido
- `http://localhost:5173/simulator-m3-simple` - Prototipo Simple

### Deploy en Vivo

Una vez configurado GitHub Pages o Vercel:
- GitHub Pages: `https://sanrivero-meli.github.io/cursor-2/`
- Rutas: `/simulator-m3` y `/simulator-m3-simple`

## 📁 Estructura

```
├── prototype/                    # Aplicación React principal
│   ├── src/
│   │   ├── screens/
│   │   │   ├── SimulatorScreenM3.jsx
│   │   │   └── SimulatorScreenM3Simple.jsx
│   │   └── App.jsx
│   ├── UX_IDEATION_CREDIT_SIMULATOR.md
│   ├── PROTOTIPOS_MATERIAL3.md
│   └── DEPLOY.md
└── .github/workflows/
    └── deploy.yml                # Workflow para GitHub Pages
```

## 📚 Documentación

- **[UX Ideación Completa](./prototype/UX_IDEATION_CREDIT_SIMULATOR.md)** - 6 variantes con análisis detallado
- **[Guía de Prototipos](./prototype/PROTOTIPOS_MATERIAL3.md)** - Cómo usar y probar los prototipos
- **[Deploy](./prototype/DEPLOY.md)** - Instrucciones para desplegar en producción

## 🎨 Características

### Material Design 3
- Sistema de colores completo (Surface, Primary, On-surface)
- Tipografía escala Material 3
- Sistema de elevación (5 niveles)
- Componentes con estados hover/focus

### Microinteracciones
- Contadores animados
- Transiciones suaves (300ms)
- Elevación dinámica en hover
- Ripple effect en botones
- Paneles expandibles animados

### Seguridad y Confianza
- Transparencia total de costos
- Badges de confianza
- Información contextual
- Validación visual inmediata

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Material Design 3 Tokens
- Lucide React (iconos)

## 📝 Notas

- Los prototipos requieren un objeto `user` con propiedad `score` para funcionar
- Formato de moneda: ARS (Pesos Argentinos)
- Cálculo de interés: Tasa anual convertida a mensual

## 🔗 Enlaces

- [Repositorio Principal](https://github.com/sanrivero-meli/adelanto-dinero-prototipos)
- [Documentación Completa](./prototype/)

---

Creado con ❤️ usando Material Design 3
