# Guía de Deploy - Prototipos Material 3

## ✅ Código ya está en GitHub

El código ha sido subido exitosamente a:
**https://github.com/sanrivero-meli/adelanto-dinero-prototipos**

---

## Opción 1: GitHub Pages (Recomendado para Demo Público)

### Configuración Automática (Ya configurado)

Se ha creado un workflow de GitHub Actions que despliega automáticamente cada vez que haces push a `main`.

### Pasos para Activar:

1. **Ve a tu repositorio en GitHub**:
   ```
   https://github.com/sanrivero-meli/adelanto-dinero-prototipos
   ```

2. **Configura GitHub Pages**:
   - Ve a **Settings** → **Pages**
   - En **Source**, selecciona **GitHub Actions**
   - Guarda los cambios

3. **Espera el primer deploy**:
   - El workflow se ejecutará automáticamente
   - Puedes ver el progreso en la pestaña **Actions**
   - Una vez completado, tu app estará disponible en:
     ```
     https://sanrivero-meli.github.io/adelanto-dinero-prototipos/
     ```

### Rutas Disponibles:
- `/simulator-m3` - Prototipo Híbrido Material 3
- `/simulator-m3-simple` - Prototipo Simple Material 3
- `/simulator` - Prototipo original

---

## Opción 2: Vercel (Más Rápido y Fácil)

### Ventajas:
- ✅ Deploy en menos de 2 minutos
- ✅ Preview automático en cada PR
- ✅ HTTPS automático
- ✅ Mejor performance

### Pasos:

1. **Ve a [vercel.com](https://vercel.com)** y conecta tu cuenta de GitHub

2. **Importa el proyecto**:
   - Selecciona el repositorio `adelanto-dinero-prototipos`
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configuración**:
   - **Root Directory**: `prototype`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click en **Deploy**
   - Tu app estará lista en menos de 2 minutos
   - URL tipo: `https://adelanto-dinero-prototipos.vercel.app`

---

## Opción 3: Netlify

### Pasos:

1. **Ve a [netlify.com](https://netlify.com)** y conecta GitHub

2. **Importa el proyecto**:
   - Selecciona `adelanto-dinero-prototipos`

3. **Configuración**:
   - **Base directory**: `prototype`
   - **Build command**: `npm run build`
   - **Publish directory**: `prototype/dist`

4. **Deploy**:
   - Click en **Deploy site**

---

## Desarrollo Local

Para probar localmente antes de hacer deploy:

```bash
cd prototype
npm install
npm run dev
```

Luego abre: `http://localhost:5173/adelanto-dinero-prototipos/`

### Rutas para probar:
- `http://localhost:5173/adelanto-dinero-prototipos/simulator-m3`
- `http://localhost:5173/adelanto-dinero-prototipos/simulator-m3-simple`

---

## Verificar que el Deploy Funciona

Una vez desplegado, verifica:

1. ✅ La página carga correctamente
2. ✅ Los estilos Material 3 se ven bien
3. ✅ Las animaciones funcionan
4. ✅ Los sliders responden
5. ✅ Las rutas funcionan

---

## Troubleshooting

### GitHub Pages muestra página en blanco:
- Verifica que el `base` en `vite.config.js` coincida con el nombre del repo
- Revisa la consola del navegador para errores

### Los assets no cargan:
- Asegúrate de que el path base esté configurado correctamente
- Verifica que `dist` esté en el root del repo (si usas GitHub Pages)

### Build falla:
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs en GitHub Actions / Vercel / Netlify

---

## Próximos Deploys

Después del setup inicial, cada vez que hagas:
```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

El deploy se hará automáticamente si usas GitHub Actions o Vercel/Netlify con auto-deploy.

---

## Recomendación

**Para demo rápido**: Usa **Vercel** (más fácil y rápido)  
**Para producción**: Usa **GitHub Pages** (ya está configurado)

