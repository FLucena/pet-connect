/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_EMAIL_PASSWORD: string
  readonly VITE_EMAIL_USER: string
  readonly VITE_FRONTEND_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_CLIENT_SECRET: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_MERCADOPAGO_ACCESS_TOKEN: string
  readonly VITE_MERCADOPAGO_PUBLIC_KEY: string
  readonly VITE_MIXPANEL_TOKEN: string
  readonly VITE_MONGODB_URI: string
  readonly VITE_NETLIFY_SITE_ID: string
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
