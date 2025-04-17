import React from 'react';

const Privacidad: React.FC = () => {
  return (
    <div className="min-h-screen bg-light p-4">
      <div className="container py-5">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <section className="mb-5">
            <h2 className="h4 mb-3">1. Información que Recopilamos</h2>
            <p className="text-muted mb-3">
              Recopilamos información personal como nombre, correo electrónico y número de teléfono cuando te registras en nuestra plataforma. También podemos recopilar información sobre tu interacción con nuestro sitio.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">2. Uso de la Información</h2>
            <p className="text-muted mb-3">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc pl-5 text-muted">
              <li className="mb-2">Facilitar el proceso de adopción</li>
              <li className="mb-2">Mejorar nuestros servicios</li>
              <li className="mb-2">Comunicarnos contigo sobre actualizaciones</li>
              <li className="mb-2">Enviar información relevante sobre mascotas en adopción</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">3. Protección de Datos</h2>
            <p className="text-muted mb-3">
              Implementamos medidas de seguridad para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">4. Compartir Información</h2>
            <p className="text-muted mb-3">
              No vendemos ni compartimos tu información personal con terceros, excepto cuando es necesario para facilitar el proceso de adopción con los refugios.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">5. Cookies</h2>
            <p className="text-muted mb-3">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Puedes configurar tu navegador para rechazar todas las cookies, aunque esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 mb-3">6. Tus Derechos</h2>
            <p className="text-muted mb-3">
              Tienes derecho a acceder, corregir o eliminar tu información personal. También puedes optar por no recibir comunicaciones promocionales.
            </p>
          </section>

          <div className="mt-5 pt-3 border-top">
            <p className="text-muted">
              Para cualquier consulta sobre privacidad, contáctanos en: privacy@petconnect.com
            </p>
            <p className="text-muted mt-2">
              Última actualización: Abril 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacidad; 