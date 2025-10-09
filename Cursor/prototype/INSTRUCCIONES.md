# 📋 Instrucciones de Instalación y Uso

## ⚠️ Prerrequisitos

Para ejecutar este prototipo necesitas tener instalado **Node.js** (versión 16 o superior).

### Instalar Node.js en macOS

Opción 1 - Usando Homebrew (recomendado):
```bash
# Si no tienes Homebrew instalado:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Luego instala Node.js:
brew install node
```

Opción 2 - Descarga directa:
1. Ve a https://nodejs.org/
2. Descarga la versión LTS
3. Ejecuta el instalador
4. Reinicia tu terminal

### Verificar instalación
```bash
node --version
npm --version
```

## 🚀 Pasos para ejecutar el prototipo

### 1. Abrir terminal en la carpeta del proyecto
```bash
cd /Users/sanrivero/Desktop/Cursor/prototype
```

### 2. Instalar dependencias
```bash
npm install
```
Este proceso puede tomar 1-2 minutos la primera vez.

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

### 4. Abrir en el navegador
El servidor te mostrará una URL como:
```
  ➜  Local:   http://localhost:5173/
```

Abre esa URL en tu navegador favorito (Chrome, Safari, Firefox, etc.)

## 🎯 Uso del Prototipo

### Navegación
Usa la barra inferior para navegar entre las 4 pantallas principales:
- **Chat**: Interfaz conversacional con el asistente
- **Simulador**: Calcula tu crédito ideal
- **Dashboard**: Ve tu situación financiera
- **Objetivos**: Gestiona tus metas de ahorro

### Interacciones disponibles
- ✅ Enviar mensajes en el chat
- ✅ Activar/desactivar micrófono (simulado)
- ✅ Ajustar sliders de monto y plazo
- ✅ Ver cálculos en tiempo real
- ✅ Crear nuevos objetivos
- ✅ Ver progreso de metas

## 🛑 Detener el servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 en uso
```bash
# Detén cualquier proceso en el puerto 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Cambios no se reflejan
- Refresca el navegador con `Cmd + R`
- Si persiste, haz hard refresh con `Cmd + Shift + R`

## 📦 Build para producción

Cuando quieras generar los archivos optimizados:
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` y podrás desplegarlos en cualquier servidor web.

## 🎨 Personalización

### Cambiar colores
Edita `/Users/sanrivero/Desktop/Cursor/prototype/tailwind.config.js`

### Modificar contenido
Los archivos principales están en:
- `src/screens/` - Pantallas individuales
- `src/components/` - Componentes reutilizables

### Hot reload
Los cambios se reflejan automáticamente en el navegador mientras el servidor está corriendo.

## 📧 Soporte

Si encuentras algún problema:
1. Verifica que Node.js esté instalado correctamente
2. Asegúrate de estar en la carpeta correcta
3. Revisa que todas las dependencias se instalaron
4. Consulta los logs en la terminal

---

¡Disfruta tu prototipo! 🎉

