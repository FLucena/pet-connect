# Pet Connect 🐾

Una aplicación web moderna construida con React, TypeScript y Vite que conecta refugios de animales con potenciales adoptantes, facilitando el proceso de adopción responsable.

## Características

- 🚀 Construido con React 19 y TypeScript
- ⚡ Impulsado por Vite para desarrollo y construcción rápidos
- 🎨 Estilizado con Bootstrap 5 para una interfaz de usuario moderna y responsive
- 📱 Diseño completamente responsive
- 🔍 Desarrollo con seguridad de tipos usando TypeScript
- 🧹 Código limpio con configuración ESLint
- 🔐 Sistema de autenticación y autorización
- 🗺️ Integración de mapas para ubicación de refugios
- 📝 Formularios avanzados con validación
- 💰 Sistema de donaciones integrado
- 🏠 Gestión de refugios y mascotas
- 🐾 Proceso de adopción completo
- 📊 Dashboard de donaciones
- 🔄 Carga perezosa (lazy loading) de componentes
- 🎯 Optimización de rendimiento con preload de rutas críticas

## Tecnologías

- **Framework Frontend:** React 19
- **Lenguaje:** TypeScript
- **Herramienta de Construcción:** Vite
- **Estilos:** Bootstrap 5
- **Calidad de Código:** ESLint
- **Gestor de Paquetes:** npm
- **Formularios:** React Hook Form con Zod
- **Mapas:** Google Maps API
- **Iconos:** Lucide React
- **Estado Global:** React Context API

## Colaboradores

| Nombre | Email | LinkedIn |
|:------:|:-----:|:--------:|
| Francisco Lucena | franciscolucena90@gmail.com | [LinkedIn](https://www.linkedin.com/in/franciscoivanlucena/) |
| Gabriela Deza Arévalo | gabriela@gmail.com | - |
| Lautaro Valdenegro | lautarokmn@gmail.com | [LinkedIn](https://www.linkedin.com/in/lautaro-valdenegro-5bb8ab2b5/) |

## Comenzando

### Prerrequisitos

- Node.js (se recomienda la última versión LTS)
- npm (incluido con Node.js)

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/yourusername/pet-connect.git
cd pet-connect
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta ESLint para verificar la calidad del código
- `npm run preview` - Previsualiza la construcción de producción localmente

## Estructura del Proyecto

```
pet-connect/
├── src/
│   ├── assets/         # Recursos estáticos
│   ├── components/     # Componentes reutilizables
│   │   ├── features/   # Componentes específicos por funcionalidad
│   │   ├── layout/     # Componentes de estructura
│   │   └── ui/         # Componentes de interfaz
│   ├── contexts/       # Contextos de React
│   ├── hooks/          # Hooks personalizados
│   ├── pages/          # Páginas de la aplicación
│   ├── styles/         # Estilos globales y específicos
│   ├── types/          # Definiciones de tipos TypeScript
│   ├── utils/          # Utilidades y helpers
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Punto de entrada
│   └── vite-env.d.ts   # Tipos de Vite
├── public/             # Recursos públicos
├── vite.config.ts      # Configuración de Vite
└── package.json        # Dependencias y scripts
```

## Contribución

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios (`git commit -m 'Añade alguna característica increíble'`)
4. Sube los cambios a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Agradecimientos

- Equipo de React por el increíble framework
- Equipo de Vite por la herramienta de construcción rápida
- Equipo de Bootstrap por el framework de UI
- Talento Tech por enseñarnos estas tecnologías
