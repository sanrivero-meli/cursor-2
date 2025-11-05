# LANA - Aplicación Financiera Inteligente

Prototipo funcional de una aplicación de financiación inteligente y proactiva con interfaz conversacional.

## 🚀 Características Principales

### 🎯 Flujo de Onboarding
- **5 pasos interactivos** con barra de progreso visual
- **Validaciones en tiempo real** para todos los campos
- **Estilo Material 3** con tokens de diseño
- **Formato automático de moneda** (ARS)
- **Cálculo de ahorro potencial** en tiempo real
- **Persistencia en localStorage**
- Accesible en `/onboarding` o automáticamente en primera visita

### 💬 Interfaz Conversacional
- Chat inteligente con burbujas de diálogo
- Soporte de entrada por voz (simulado)
- Sugerencias contextuales rápidas
- Respuestas del asistente en tiempo real

### 📊 Simulador de Crédito
- Sliders interactivos para monto y plazo
- Cálculo dinámico de cuotas y tasas
- Tasas personalizadas según score crediticio
- Vista previa del plan de pagos
- Visualización clara de escenarios

### 📈 Dashboard Inteligente
- Resumen de situación financiera en tiempo real
- Visualización de ingresos, gastos y ahorros
- Insights y recomendaciones personalizadas
- Seguimiento de uso de crédito
- Transacciones recientes

### 🎯 Gestión de Objetivos
- Crear y gestionar metas financieras
- Barras de progreso visuales
- Seguimiento de aportes mensuales
- Fechas límite y contadores
- Badges de logros

### 🎮 Gamificación
- Sistema de niveles y experiencia
- Logros desbloqueables
- Insignias de progreso
- Recompensas por buenos hábitos

## 🎨 Diseño

- **Tema**: Dark mode
- **Tipografía**: Roboto
- **Estilo**: Simple, elegante y contemporáneo
- **Componentes**: Bordes redondeados, tarjetas limpias con efecto glass
- **Animaciones**: Transiciones suaves y naturales

## 🛠️ Tecnologías

- **React 18**: Framework principal
- **React Router**: Navegación entre pantallas
- **Tailwind CSS**: Estilos y diseño responsivo
- **Lucide React**: Iconografía moderna
- **Vite**: Build tool y dev server

## 📦 Instalación

1. **Instalar dependencias**:
```bash
cd prototype
npm install
```

2. **Iniciar servidor de desarrollo**:
```bash
npm run dev
```

3. **Abrir en el navegador**:
```
http://localhost:5173
```

## 🗂️ Estructura del Proyecto

```
prototype/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Layout principal con navegación
│   ├── screens/
│   │   ├── ChatScreen.jsx      # Pantalla de chat conversacional
│   │   ├── SimulatorScreen.jsx # Simulador de crédito
│   │   ├── DashboardScreen.jsx # Dashboard financiero
│   │   └── GoalsScreen.jsx     # Gestión de objetivos
│   ├── App.jsx                 # Componente raíz
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── index.html                  # HTML principal
├── package.json                # Dependencias
├── tailwind.config.js          # Configuración Tailwind
└── vite.config.js              # Configuración Vite
```

## 📱 Pantallas Principales

### 1. Chat Conversacional
- Interacción natural mediante texto y voz
- Sugerencias de acciones rápidas
- Historial de conversación
- Respuestas inteligentes del asistente

### 2. Simulador de Crédito
- Control de monto con slider (hasta $100,000)
- Selección de plazo (3-36 meses)
- Cálculo automático de:
  - Cuota mensual
  - Tasa de interés personalizada
  - Total a pagar
  - Intereses totales
- Plan de pagos detallado

### 3. Dashboard
- Balance actual y tendencias
- Ingresos y gastos del período
- Tasa de ahorro
- Uso de crédito disponible
- Transacciones recientes
- Insights personalizados
- Logros y gamificación

### 4. Objetivos Financieros
- Crear objetivos personalizados
- Seguimiento visual de progreso
- Aportes mensuales configurables
- Tiempo restante para alcanzar metas
- Múltiples objetivos simultáneos

## 🎯 Navegación

La aplicación incluye una barra de navegación inferior fija con acceso rápido a:
- 💬 Chat
- 🔢 Simulador
- 📊 Dashboard
- 🎯 Objetivos

## 🎨 Paleta de Colores

### Colores Principales
- **Primary**: Azul (#0ea5e9 y variantes)
- **Dark Background**: Slate oscuro (#020617, #0f172a)
- **Accents**: Gradientes de primary con opacidad

### Estados
- **Éxito**: Verde (#10b981)
- **Advertencia**: Amarillo (#f59e0b)
- **Error**: Rojo (#ef4444)
- **Info**: Azul primary

## ✨ Características de UX

### Diseño Responsivo
- Optimizado para móvil y desktop
- Grid adaptativo
- Touch-friendly en mobile
- Hover states en desktop

### Microinteracciones
- Animaciones suaves en transiciones
- Feedback visual inmediato
- Loading states
- Hover effects

### Accesibilidad
- Contraste adecuado en dark mode
- Iconos descriptivos
- Estados de focus visibles
- Tipografía legible

## 🔮 Funcionalidades Futuras

- [ ] Integración con APIs reales
- [ ] Autenticación de usuarios
- [ ] Notificaciones push
- [ ] Exportación de reportes
- [ ] Modo claro/oscuro toggle
- [ ] Multi-idioma
- [ ] Gráficas interactivas
- [ ] Integración con bancos
- [ ] Chat con IA real
- [ ] Reconocimiento de voz real

## 📝 Notas de Implementación

Este es un **prototipo funcional navegable** diseñado para:
- Validar el flujo de usuario
- Probar interacciones clave
- Visualizar el diseño final
- Demostrar las capacidades de la app

Los datos mostrados son **simulados** y las acciones no se conectan a servicios reales.

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 🌐 Despliegue en GitHub Pages

La aplicación está configurada para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

### URL de la aplicación desplegada:
```
https://sanrivero-meli.github.io/adelanto-dinero-prototipos/
```

### URL directa del onboarding:
```
https://sanrivero-meli.github.io/adelanto-dinero-prototipos/onboarding
```

### Configuración automática:
- El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente en cada push a `main`
- Se construye la aplicación y se despliega en GitHub Pages
- No requiere configuración manual adicional

### Habilitar GitHub Pages:
1. Ve a **Settings** → **Pages** en tu repositorio
2. En **Source**, selecciona **GitHub Actions**
3. El despliegue se hará automáticamente en cada push

## 👥 Créditos

Desarrollado por un experto en UX con más de 20 años de experiencia, especializado en aplicaciones financieras y experiencias conversacionales.

---

**¡Disfruta explorando LANA!** 🎉

