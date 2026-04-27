# DTE E-Commerce El Salvador

Sistema de gestión de pedidos y facturación electrónica (DTE) bajo la normativa de El Salvador.

## 🎯 Descripción del Proyecto

Aplicación de e-commerce que simula el flujo completo de venta, culminando en la generación de documentos tributarios electrónicos (DTE) según la normativa salvadoreña.

### Tipos de Documentos Soportados

- **FCF** (Factura de Consumidor Final): Precio incluye IVA (13%)
- **CCF** (Comprobante de Crédito Fiscal): Precio sin IVA + 13% separado

## 🛠️ Stack Tecnológico

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

## 📁 Estructura del Proyecto

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

## 🚀 Instalación y Configuración

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

## 🧑‍💻 Comandos Disponibles

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

## 📋 Funcionalidades

### ✅ Implementadas en Configuración Base

- [x] Proyecto inicializado con Vite + React + TypeScript
- [x] Tailwind CSS configurado
- [x] ESLint + Prettier configurados
- [x] Vitest configurado
- [x] Path aliases (@/) configurados
- [x] Tipos TypeScript base creados
- [x] Estructura de carpetas creada
- [x] Variables de entorno configuradas

### 🔨 Por Implementar

#### Módulo de Productos
- [ ] Catálogo con mínimo 4 productos
- [ ] Imágenes de productos (Unsplash)
- [ ] Formato de precios

#### Módulo de Carrito
- [ ] Añadir/eliminar productos
- [ ] Actualizar cantidades
- [ ] Cálculo dinámico
- [ ] Persistencia en localStorage

#### Módulo de Facturación
- [ ] Selector de tipo de documento (FCF/CCF)
- [ ] Formulario FCF con validaciones
- [ ] Formulario CCF con validaciones (NRC, NIT obligatorios)
- [ ] Cálculo correcto de IVA (13%)
- [ ] Generación de JSON DTE
- [ ] Generación de PDF imprimible

#### Módulo de Historial
- [ ] Lista de facturas generadas
- [ ] Detalle de cada factura
- [ ] Persistencia en localStorage
- [ ] Re-imprimir PDF

#### Testing
- [ ] Tests de cálculos de IVA
- [ ] Tests de validaciones
- [ ] Tests de generación de DTE
- [ ] Tests de flujo de checkout

## 📝 Estándares de Código

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

## 🧪 Testing

Los tests se ejecutan con Vitest y están organizados en:

```
tests/
├── unit/               # Tests unitarios
├── integration/        # Tests de integración
└── setup.ts           # Configuración global de tests
```

## 📦 Dependencias Principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| react | ^18.3.1 | Framework UI |
| typescript | ^5.9.3 | Tipado estático |
| tailwindcss | ^4.2.4 | Estilos |
| react-hook-form | ^7.74.0 | Formularios |
| zod | ^4.3.6 | Validación |
| jspdf | ^4.2.1 | Generación PDF |
| vitest | ^4.1.5 | Testing |

## 📖 Documentación Adicional

- [Guía de Facturación Electrónica SV](../FE-TAIIA-v2-28-03-2023-con-videos.pdf)
- [Guía de Integración DTE](../FESVDGIIMH_GuiaIntegracionFacturaElectronicasSV.pdf)
- [Especificaciones de la Prueba Técnica](../Prueba%20Técnica%20Mid-Junior_%20E-Commerce%20y%20Facturación%20Electrónica%20SV.pdf)

## 👨‍💻 Desarrollo

El proyecto está configurado con:
- Hot Module Replacement (HMR) para desarrollo rápido
- TypeScript strict mode
- Path aliases para imports limpios: `@/components/...`
- Linting en tiempo real
- Tests en modo watch

## 🚧 Estado del Proyecto

**Configuración Inicial:** ✅ Completada
**Desarrollo de Funcionalidades:** 🔨 Listo para comenzar
**Testing:** ⏳ Configurado y listo
**Documentación:** ✅ Completada

---

Desarrollado como prueba técnica para puesto de Desarrollador Frontend Mid-Junior
