# Instrucciones para la Imagen del Hero

## 📁 Ubicación de la Imagen

Coloca tu imagen de fondo en:
```
src/assets/images/hero-bg.jpg
```

## 📐 Recomendaciones

- **Formato**: JPG o PNG
- **Tamaño recomendado**: 1920x1080px o superior
- **Peso**: Máximo 500KB (optimizar para web)
- **Tipo**: Imagen de tienda, productos, o relacionada con tu negocio

## 🎨 Ajustes Opcionales

Si quieres cambiar la opacidad de la imagen, edita en `home.component.html`:

```html
<!-- Cambiar opacity-20 por otro valor (0-100) -->
<div class="absolute inset-0 opacity-20 bg-cover bg-center" 
     style="background-image: url('/assets/images/hero-bg.jpg')"></div>
```

**Valores de opacidad:**
- `opacity-10` = 10% (muy transparente)
- `opacity-20` = 20% (actual)
- `opacity-30` = 30% (más visible)
- `opacity-50` = 50% (muy visible)

## 🔄 Cambiar el Gradiente

Para cambiar los colores del gradiente, edita:

```html
<div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
```

**Ejemplos de colores:**
- Azul: `from-blue-600 via-blue-700 to-cyan-800`
- Verde: `from-green-600 via-emerald-700 to-teal-800`
- Rojo: `from-red-600 via-rose-700 to-pink-800`
