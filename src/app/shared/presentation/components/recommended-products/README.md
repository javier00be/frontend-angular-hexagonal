# Componente de Productos Recomendados

Componente standalone reutilizable para mostrar productos recomendados en un carrusel horizontal.

## 📍 Ubicación

`src/app/shared/presentation/components/recommended-products/`

## 🎯 Uso

### Importación

```typescript
import { RecommendedProductsComponent } from './shared/presentation/components/recommended-products/recommended-products.component';

@Component({
  imports: [
    // ... otros imports
    RecommendedProductsComponent
  ]
})
```

### Uso Básico

```html
<app-recommended-products 
  [products]="recommendedProducts">
</app-recommended-products>
```

### Uso Avanzado con Todas las Opciones

```html
<app-recommended-products 
  [products]="recommendedProducts"
  [title]="'Productos Relacionados'"
  [subtitle]="'Productos similares que te pueden interesar'"
  [maxProducts]="8"
  [showViewAllButton]="false">
</app-recommended-products>
```

## 📥 Inputs

| Input | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `products` | `Product[]` | `[]` | Array de productos a mostrar |
| `title` | `string` | `'Productos Recomendados'` | Título de la sección |
| `subtitle` | `string` | `'Descubre productos que podrían interesarte'` | Subtítulo descriptivo |
| `showViewAllButton` | `boolean` | `true` | Mostrar/ocultar botón "Ver todos" |
| `maxProducts` | `number` | `6` | Número máximo de productos a mostrar |

## 🎨 Características

- ✅ Carrusel horizontal con scroll suave
- ✅ Scrollbar oculta para diseño limpio
- ✅ Hover effects con elevación
- ✅ Responsive design
- ✅ Tarjetas compactas de 280px
- ✅ Badge de stock dinámico
- ✅ Estado vacío incluido

## 💡 Ejemplos de Uso

### En la Lista de Productos

```typescript
// product-list.component.ts
export class ProductListComponent {
  recommendedProducts: Product[] = [];
  
  async loadProducts() {
    const products = await this.getAllProducts.execute();
    // Seleccionar productos aleatorios
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    this.recommendedProducts = shuffled.slice(0, 6);
  }
}
```

```html
<!-- product-list.component.html -->
<app-recommended-products [products]="recommendedProducts"></app-recommended-products>
```

### En la Página de Inicio

```html
<app-recommended-products 
  [products]="featuredProducts"
  [title]="'Productos Destacados'"
  [subtitle]="'Los más vendidos de la semana'"
  [maxProducts]="8">
</app-recommended-products>
```

### En Detalles de Producto

```html
<app-recommended-products 
  [products]="relatedProducts"
  [title]="'Productos Relacionados'"
  [subtitle]="'Productos similares que te pueden interesar'"
  [showViewAllButton]="false">
</app-recommended-products>
```

## 🔧 Métodos Disponibles

El componente incluye métodos útiles que puedes extender:

- `getStockSeverity(cantidad: number)` - Determina el color del badge de stock
- `getStockLabel(cantidad: number)` - Obtiene el texto del badge de stock
- `formatCurrency(value: number)` - Formatea el precio como moneda
- `onViewAllClick()` - Maneja el click en "Ver todos" (TODO: implementar navegación)
- `onAddToCart(product: Product)` - Maneja el click en "Agregar al carrito" (TODO: implementar)

## 📝 Notas

- El componente es **standalone**, no requiere módulo
- Usa **PrimeNG Tag** para los badges de stock
- Los estilos están encapsulados en el componente
- Compatible con todos los navegadores modernos
