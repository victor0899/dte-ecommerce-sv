# DTE E-Commerce El Salvador

Sistema de gestión de pedidos y facturación electrónica (DTE) bajo la normativa de El Salvador.

## Descripción del Proyecto

Aplicación de e-commerce que simula el flujo completo de venta, culminando en la generación de documentos tributarios electrónicos (DTE) según la normativa salvadoreña.

### Tipos de Documentos Soportados

- **FCF** (Factura de Consumidor Final): Precio incluye IVA (13%)
- **CCF** (Comprobante de Crédito Fiscal): Precio sin IVA + 13% separado

## Stack Tecnológico

### Core
- **React 18.3+** con Hooks funcionales
- **TypeScript 5.x**
- **Vite 8.x**
- **Node.js 20.x LTS**
- **pnpm** como package manager

### UI & Estilos
- **Tailwind CSS 4.x**
- **Lucide React** (iconos)

### Gestión de Estado
- **Context API + useReducer**

### Formularios & Validación
- **React Hook Form**
- **Zod** (validación con tipos)

### Navegación
- **React Router DOM 7.x**

### Generación de Documentos
- **jsPDF** (generación de PDF)
- **html2canvas** (captura HTML)
- **uuid** (generación de IDs únicos)

### Testing
- **Vitest** (framework de tests)
- **React Testing Library**
- **@testing-library/jest-dom**

### Code Quality
- **ESLint** (linting)
- **Prettier** (formateo)
- **TypeScript** (tipado estático)

## Estructura del Proyecto

```
src/
├── @types/              # Definiciones de tipos TypeScript
├── components/
│   ├── cart/           # Componentes del carrito
│   ├── checkout/       # Componentes del proceso de pago
│   ├── common/         # Componentes reutilizables
│   ├── invoice/        # Componentes de facturación
│   ├── layout/         # Componentes de layout
│   └── products/       # Componentes de productos
├── context/            # Context API providers
├── hooks/              # Custom hooks
├── lib/
│   ├── validations/    # Esquemas de validación Zod
│   └── constants.ts    # Constantes de la aplicación
├── pages/              # Páginas principales
├── services/           # Servicios (generación DTE, etc.)
└── utils/              # Utilidades (cálculos, formateo, etc.)
```

## Instalación y Configuración

### Prerequisitos

- Node.js 20.x LTS
- pnpm (recomendado) o npm

### Instalación

```bash
# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env
```

### Variables de Entorno

```env
VITE_APP_NAME=DTE E-Commerce SV
VITE_TAX_RATE=0.13
VITE_DTE_PREFIX=DTE-01
```

## Comandos Disponibles

```bash
# Desarrollo
pnpm dev                 # Iniciar servidor de desarrollo

# Build
pnpm build               # Compilar para producción

# Linting & Formateo
pnpm lint                # Ejecutar ESLint
pnpm lint:fix            # Corregir errores de ESLint automáticamente
pnpm format              # Formatear código con Prettier
pnpm format:check        # Verificar formato sin modificar archivos

# Testing
pnpm test                # Ejecutar tests en modo watch
pnpm test:ui             # Ejecutar tests con interfaz visual
pnpm test:coverage       # Ejecutar tests con cobertura

# Preview
pnpm preview             # Preview del build de producción
```

## Funcionalidades

### Implementadas

#### Módulo de Productos
- [x] Catálogo con 6 productos variados (laptops, periféricos, monitores)
- [x] Imágenes de productos desde Unsplash
- [x] Formato de precios con IVA incluido
- [x] Controles de cantidad integrados en las cards
  - Incrementar/decrementar cantidad
  - Eliminar del carrito

#### Módulo de Carrito
- [x] Añadir/eliminar productos
- [x] Actualizar cantidades desde las product cards
- [x] Controles +/- en tiempo real
- [x] Cálculo dinámico de totales
- [x] Persistencia en localStorage
- [x] Contador de items en header
- [x] Resumen de pedido con subtotales

#### Módulo de Facturación
- [x] Selector de tipo de documento (FCF/CCF)
- [x] Formulario FCF con validaciones
  - Nombre completo
  - DUI o NIT (opcional)
  - Correo electrónico
- [x] Formulario CCF con validaciones completas
  - Tipo de persona (jurídica/natural)
  - Razón social
  - NRC con máscara automática (XXXXXX-X)
  - NIT con máscara automática (XXXX-XXXXXX-XXX-X)
  - Actividad económica
  - Dirección completa con departamentos y municipios
  - Validación de todos los campos obligatorios
- [x] Cálculo correcto de IVA (13%)
- [x] Generación de JSON DTE según normativa
- [x] Generación de PDF imprimible con html2canvas
- [x] Descarga automática de JSON y PDF
- [x] Templates profesionales de factura

#### Módulo de Historial
- [x] Lista de facturas generadas
- [x] Detalle completo de cada factura
- [x] Persistencia en localStorage
- [x] Re-generar PDF desde historial
- [x] Visualización de todos los datos DTE
- [x] Información de emisor y receptor
- [x] Desglose de items y totales

#### UI/UX
- [x] Diseño completamente responsive
  - Mobile (< 768px)
  - Tablet (768px - 1024px)
  - Desktop (> 1024px)
- [x] Menú hamburguesa en móvil
- [x] Navegación sticky
- [x] Footer informativo
- [x] Estados de carga (loading states)
- [x] Mensajes de error claros
- [x] Validaciones en tiempo real
- [x] Layout limpio y profesional

#### Características Técnicas
- [x] TypeScript en todo el proyecto
- [x] Context API para estado global
- [x] Custom hooks reutilizables
- [x] Componentes modulares
- [x] Validación con Zod schemas
- [x] React Hook Form para formularios
- [x] Manejo robusto de errores

## Estándares de Código

### Conventional Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
test: añadir o modificar tests
refactor: refactorización de código
docs: cambios en documentación
style: cambios de formato (no afectan lógica)
```

### Formateo

El código se formatea automáticamente con Prettier. Configuración:
- Punto y coma: `true`
- Comillas simples: `true`
- Ancho máximo: `80`
- Tab width: `2 espacios`

## Testing

Los tests se ejecutan con Vitest y están organizados en:

```
tests/
├── unit/               # Tests unitarios
├── integration/        # Tests de integración
└── setup.ts           # Configuración global de tests
```

## Dependencias Principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| react | ^18.3.1 | Framework UI |
| typescript | ^5.9.3 | Tipado estático |
| tailwindcss | ^4.2.4 | Estilos |
| react-hook-form | ^7.74.0 | Formularios |
| zod | ^4.3.6 | Validación |
| jspdf | ^4.2.1 | Generación PDF |
| vitest | ^4.1.5 | Testing |

## Documentación Adicional

- [Guía de Facturación Electrónica SV](../FE-TAIIA-v2-28-03-2023-con-videos.pdf)
- [Guía de Integración DTE](../FESVDGIIMH_GuiaIntegracionFacturaElectronicasSV.pdf)
- [Especificaciones de la Prueba Técnica](../Prueba%20Técnica%20Mid-Junior_%20E-Commerce%20y%20Facturación%20Electrónica%20SV.pdf)

## Desarrollo

El proyecto está configurado con:
- Hot Module Replacement (HMR) para desarrollo rápido
- TypeScript strict mode
- Path aliases para imports limpios: `@/components/...`
- Linting en tiempo real
- Tests en modo watch

## Cómo Usar

### 1. Navegar por el Catálogo
- Explora los productos disponibles en la página principal
- Cada producto muestra: imagen, nombre, descripción, precio y stock

### 2. Agregar al Carrito
- Haz clic en "Agregar al carrito" en cualquier producto
- Una vez agregado, verás controles +/- para ajustar la cantidad
- Usa el botón de eliminar para quitar el producto del carrito
- El contador en el header muestra el total de items

### 3. Generar Factura
- Haz clic en el ícono del carrito para ir a checkout
- Revisa tu pedido en el resumen
- Selecciona el tipo de documento:
  - **FCF**: Para consumidor final (solo nombre y correo)
  - **CCF**: Para crédito fiscal (requiere NRC, NIT, dirección completa)
- Completa el formulario (las máscaras de NRC y NIT se aplican automáticamente)
- Haz clic en "Generar Factura"

### 4. Resultado
- Se generará y descargará automáticamente:
  - JSON con los datos DTE
  - PDF de la factura imprimible
- La factura se guardará en el historial
- Serás redirigido a la página de detalle de la factura

### 5. Ver Historial
- Accede a "Historial" desde el menú
- Consulta todas las facturas generadas
- Haz clic en cualquier factura para ver detalles completos
- Re-genera el PDF si es necesario

## Estado del Proyecto

- **Configuración Inicial:** Completada
- **Desarrollo de Funcionalidades:** Completado
- **UI/UX Responsive:** Completado
- **Generación de DTE:** Completado
- **Testing:** Completado
- **Documentación:** Completada

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Versión:** 2.0.0
**Última actualización:** Abril 2026
Desarrollado con React + TypeScript + Vite
